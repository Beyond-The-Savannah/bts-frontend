import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { axiosInstance } from "@/remoteData/mutateData";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { EmailBatchProp, SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

export const { POST } = serve(async (context) => {
  await context.run("Send Email Alert", async () => {
    await sendNewJobAddedAlertEmail();
  });

  await context.sleep("Run every 8hrs a day", 8 * 60 * 60 * 1000);
});

//array of emails of users who don't what to be get email notifications
const noNewJobsNotifications=['riinyacynthia@gmail.com','jeanjesang@gmail.com']

async function sendNewJobAddedAlertEmail() {

  // get list of subscribed users from db and filter out the cancelled out users
  const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
  const userList: SubscribedUserProp[] = await response.data;
  const usersEmailList = userList.filter((user) => user.status != "cancelled" && user.subscriptionPlan !="whatsapp community Annually"  && !noNewJobsNotifications.includes(user.email));

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
  const latestJobListing = sortedJobListingByDate.filter((job) => {
    const createdTime = new Date(job.dateCreated);
    return createdTime > eightHoursAgo;
  });

  if (latestJobListing.length === 0) {
    console.log("No latest Jobs added within the latest 8 hours");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const batchEmails: EmailBatchProp[] = [];

  // Process each user and prepare personalized emails
  usersEmailList.forEach((user) => {
    let userJobsList: ListingRemoteJobs[];

    // Filter jobs based on user's career preference
    if (user.career) {
      userJobsList = latestJobListing.filter(
        (listing) => listing.jobSubCategoryId === user.career
      );
      console.log(`Filtered jobs for ${user.email} (career: ${user.career}):`, userJobsList.length);
    } else {
      // If no career preference, send all latest jobs
      userJobsList = latestJobListing;
      console.log(`All jobs for ${user.email} (no career preference):`, userJobsList.length);
    }

    // Only send email if there are jobs to send
    if (userJobsList.length > 0) {
      batchEmails.push({
        from: "info@beyondthesavannah.co.ke",
        to: [user.email],
        subject: "Beyond The Savannah New Jobs Alert",
        react: AllJobsAlertEmailTemplate({
          firstName: user.firstName,
          jobs: userJobsList,
        }),
      });
    } else {
      console.log(`No matching jobs found for ${user.email}`);
    }
  });

  // Send emails in batches if there are any to send
  if (batchEmails.length > 0) {
    try {
      const batchSize = 100;
      for (let i = 0; i < batchEmails.length; i += batchSize) {
        const batch = batchEmails.slice(i, i + batchSize);
        await resend.batch.send(batch);
        console.log(`Sent batch of ${batch.length} emails`);
        
        // Add delay between batches to avoid rate limiting
        if (i + batchSize < batchEmails.length) {
          await new Promise((res) => setTimeout(res, 500));
        }
      }
      console.log(`Successfully sent ${batchEmails.length} personalized job alert emails`);
    } catch (error) {
      console.log("Error sending batch emails:", error);
    }
  } else {
    console.log("No emails to send - no users have matching job preferences");
  }
}