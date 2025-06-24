import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { axiosInstance } from "@/remoteData/mutateData";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const { POST } = serve(async (context) => {
  await context.run("Send Email Alert", async () => {
    await sendNewJobAddedAlertEmail();
  });

  await context.sleep("Run every 8hrs a day", 8 * 60 * 60 * 1000);
});

async function sendNewJobAddedAlertEmail() {
  // get list of subscribed users from db and filter out the cancelled out users
  const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
  const userList: SubscribedUserProp[] = await response.data;
  const usersEmailList = userList.filter((user) => user.status != "cancelled");

  // get jobs listing and determine recently new added ones
  const jobListingResponse = await axiosInstance.get(
    "/api/Jobs/getAllJobsByCompany"
  );
  const jobListing: ListingRemoteJobs[] = await jobListingResponse.data;
  const sortedJobListingByDate = jobListing?.sort((a, b) => {
    return (
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
  });

  const now = new Date();
  const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
  const lastestJobListing = sortedJobListingByDate.filter((job) => {
    const createdTime = new Date(job.dateCreated);
    return createdTime > eightHoursAgo;
  });

  if (lastestJobListing.length > 0) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Prepare an array of email objects for batch sending
    const batchEmails = usersEmailList.map((user) => ({
      from: "info@beyondthesavannah.co.ke",
      to: [user.email],
      subject: "Beyond The Savannah New Jobs Alert",
      react: AllJobsAlertEmailTemplate({
        firstName: user.firstName,
        jobs: lastestJobListing,
      }),
    }));

    // Send emails in batches of up to 100 per request
    try {
      const batchSize = 100;
      for (let e = 0; e < batchEmails.length; e += batchSize) {
        const batch = batchEmails.slice(e, e + batchSize);
        await resend.batch.send(batch);
        await new Promise((res) => setTimeout(res, 500));
      }
    } catch (error) {
      console.log("Error sending batch emails:", error);
    }
  } else {
    console.log("No latest Jobs added within the latest 8 hours");
  }
}
