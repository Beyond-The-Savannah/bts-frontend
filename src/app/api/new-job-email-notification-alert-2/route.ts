import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { GetUserEmailNotificationDetails } from "@/db/queries/viewJobsSubscriptionQuries";
import { axiosInstance } from "@/remoteData/mutateData";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

export const { POST } = serve(async (context) => {
  // fetch users email notification details from the database
  const usersEmailList = await context.run("Fetch subscribed users from database 2", async () => {
  const usersFromSecondSubscriptionFlow =
    await GetUserEmailNotificationDetails();

  const usersFromSecondSubscriptionFlowNormalised =
    usersFromSecondSubscriptionFlow
      .filter(
        (user) =>
          user.subscriptionStatus !== "cancelled" &&
          user.acceptEmailNotification == true,
      )
      .map((user) => ({
        firstName: user.firstName ?? "There",
        email: user.emailAddress,
        career: user.careerEmailNotification,
        status: user.subscriptionStatus,
        subscriptionPlan: user.subcriptionTierName,
      }));

  const userList = usersFromSecondSubscriptionFlowNormalised
    .filter(
      (user) =>
        user.status !== "cancelled" &&
        user.subscriptionPlan !== "whatsapp community Annually",
    )
    .map((user) => ({
      firstName: user.firstName ?? "There",
      email: user.email,
      career: user.career,
    }));

    return userList
});

    // 2. Fetch latest jobs
  const latestJobListing = await context.run("Fetch latest jobs", async () => {
    const jobListingResponse = await axiosInstance.get("/api/Jobs/getAllJobsByCompany");
    const jobListing: Pick<ListingRemoteJobs, "jobsId" | "jobName" | "jobUrl" | "imageUrl" | "jobSubCategoryId" | "companyName" | "dateCreated">[] = jobListingResponse.data;

    const now = new Date();
    // Look back slightly more than 8 hours (e.g., 8h 5m) to ensure no overlap gaps
    // const lookbackPeriod = new Date(now.getTime() - (8 * 60 + 5) * 60 * 1000);
    
    const lookbackPeriod = new Date(now.getTime() - 8 * 60  * 60 * 1000);

    return jobListing
      .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
      .filter((job) => new Date(job.dateCreated) > lookbackPeriod)
      .map((job) => ({
        jobsId: job.jobsId,
        jobName: job.jobName,
        jobUrl: job.jobUrl,
        jobSubCategoryId: job.jobSubCategoryId,
        imageUrl: job.imageUrl,
        companyName: job.companyName,
        dateCreated: job.dateCreated
      }));
  });

  // 3. Process Batches
  if (latestJobListing.length > 0) {
    const batchSize = 50;

    for (let i = 0; i < usersEmailList.length; i += batchSize) {
      const batchIndex = Math.floor(i / batchSize);

      await context.run(`Send batch ${batchIndex}`, async () => {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const currentUsers = usersEmailList.slice(i, i + batchSize);
        
        const emailPayloads = currentUsers.map((user) => {
          const userJobsList = user.career
            ? latestJobListing.filter((l) => l.jobSubCategoryId === parseInt(user.career as string))
            : latestJobListing;

          // Only send if there are jobs matching the user's career
          if (userJobsList.length === 0) return null;

          return {
            from: "info@beyondthesavannah.co.ke",
            to: [user.email as string],
            subject: "Beyond The Savannah New Jobs Alert",
            react: AllJobsAlertEmailTemplate({
              firstName: user.firstName,
              jobs: userJobsList,
            }),
          };
        }).filter(p => p !== null);

        if (emailPayloads.length > 0) {
          await resend.batch.send(emailPayloads);
        }
      });

      // Rate limiting: sleep for 1 second between batches
      if (i + batchSize < usersEmailList.length) {
        await context.sleep(`Pause-batch-${batchIndex}`, 1);
      }
    }
  }
});
