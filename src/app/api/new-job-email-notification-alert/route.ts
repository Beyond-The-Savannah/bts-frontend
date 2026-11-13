import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { GetUserEmailNotificationDetails } from "@/db/queries/viewJobsSubscriptionQuries";
import { axiosInstance } from "@/app/dal/remoteData/mutateData";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
// import { EmailBatchProp, SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

const noNewJobsNotifications = [
  "nonigatura@gmail.com",
  "listaabutto@gmail.com",
  "mosesmwangi007@gmail.com",
  "hcngina@gmail.com",
  "rosenyachihindungu@gmail.com",
  "githukum65@gmail.com",
  "wangui.c.njeri@gmail.com",
  "a.wanjirunina@gmail.com",
  "carolynmnjeri@gmail.com",
  "hassenga54@gmail.com",
  "riinyacynthia@gmail.com",
  "jeanjesang@gmail.com",
  "slyburd@gmail.com",
  "keterlaureen@gmail.com",
  "wairimunjoroge132@gmail.com",
  "yasmin.osman222@gmail.com",
  "bakhita.awuorba@gmail.com",
  "louise.mutua@gmail.com",
  "cinderellanakyira@gmail.com",
  "joanna.shiko@gmail.com",
  "salemcity04@gmail.com",
  "nicolekarungari@gmail.com",
  "susanwatetek@gmail.com",
  "chnona99@gmail.com",
  "bmisozi@gmail.com",
  "sue.maina11@gmail.com",
];

export const { POST } = serve(async (context) => {
  // 1. Fetch users (Runs once per trigger)
  const usersEmailList = await context.run(
    "Fetch subscribed users",
    async () => {
      const response = await axiosInstance.get("/api/BydUsers/getAllUsers");

      // const usersWithAcceptEmailNotifcationAndNotCancelled =
      //   response.data.filter(
      //     (user: SubscribedUserProp) =>
      //       user.status !== "cancelled" && user.acceptEmailNotification == true,
      //   );

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
            email: user.emailAddress as string,
            career: parseInt(user.careerEmailNotification as string),
            status: user.subscriptionStatus as string,
            subscriptionPlan: user.subcriptionTierName as string,
          }));

      const combinedData = [
        ...response.data,
        // ...usersWithAcceptEmailNotifcationAndNotCancelled,
        ...usersFromSecondSubscriptionFlowNormalised,
      ];
      // const userList: Pick<SubscribedUserProp, "firstName" | "email" | "career" | "status" | "subscriptionPlan">[] = response.data;
      const userList: Pick<
        SubscribedUserProp,
        "firstName" | "email" | "career" | "status" | "subscriptionPlan" |"acceptEmailNotification"
      >[] = combinedData;

      return userList
        .filter(
          (user) =>
            user.status !== "cancelled" &&
            user.acceptEmailNotification==true &&
            user.subscriptionPlan !== "whatsapp community Annually" &&
            !noNewJobsNotifications.includes(user.email),
        )
        .map((user) => ({
          firstName: user.firstName ?? "There",
          email: user.email,
          career: user.career,
        }));
    },
  );

  // 2. Fetch latest jobs
  const latestJobListing = await context.run("Fetch latest jobs", async () => {
    const jobListingResponse = await axiosInstance.get(
      "/api/Jobs/getAllJobsByCompany",
    );
    const jobListing: Pick<
      ListingRemoteJobs,
      | "jobsId"
      | "jobName"
      | "jobUrl"
      | "imageUrl"
      | "jobSubCategoryId"
      | "companyName"
      | "dateCreated"
    >[] = jobListingResponse.data;

    const now = new Date();
    // Look back slightly more than 8 hours (e.g., 8h 5m) to ensure no overlap gaps
    // const lookbackPeriod = new Date(now.getTime() - (8 * 60 + 5) * 60 * 1000);

    const lookbackPeriod = new Date(now.getTime() - 8 * 60 * 60 * 1000);

    return jobListing
      .sort(
        (a, b) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
      )
      .filter((job) => new Date(job.dateCreated) > lookbackPeriod)
      .map((job) => ({
        jobsId: job.jobsId,
        jobName: job.jobName,
        jobUrl: job.jobUrl,
        jobSubCategoryId: job.jobSubCategoryId,
        imageUrl: job.imageUrl,
        companyName: job.companyName,
        dateCreated: job.dateCreated,
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

        const emailPayloads = currentUsers
          .map((user) => {
            const userJobsList = user.career
              ? latestJobListing.filter(
                  (l) => l.jobSubCategoryId === user.career,
                )
              : latestJobListing;

            // Only send if there are jobs matching the user's career
            if (userJobsList.length === 0) return null;

            return {
              from: "info@beyondthesavannah.co.ke",
              to: [user.email],
              subject: "Beyond The Savannah New Jobs Alert",
              react: AllJobsAlertEmailTemplate({
                firstName: user.firstName,
                jobs: userJobsList,
              }),
            };
          })
          .filter((p) => p !== null);

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

  // Logic ends here. The workflow terminates, and the Upstash CRON
  // will restart it at the next 8-hour interval.
});

