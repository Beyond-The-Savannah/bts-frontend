import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { axiosInstance } from "@/remoteData/mutateData";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
// import { EmailBatchProp, SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

const noNewJobsNotifications = [
  "githukum65@gmail.com",
  "olgamulama@gmail.com",
  "wangui.c.njeri@gmail.com",
  "a.wanjirunina@gmail.com",
  "carolynmnjeri@gmail.com",
  "hassenga54@gmail.com",
  "mosesmwangi007@gmail.com",
  "riinyacynthia@gmail.com",
  "jeanjesang@gmail.com",
  "slyburd@gmail.com",
  "keterlaureen@gmail.com",
  "wairimunjoroge132@gmail.com",
  "yasmin.osman222@gmail.com",
  "bakhita.awuorba@gmail.com",
  "louise.mutua@gmail.com",
];
export const { POST } = serve(async (context) => {
  // 1. Fetch users (Runs once per trigger)
  const usersEmailList = await context.run("Fetch subscribed users", async () => {
    const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
    const userList: Pick<SubscribedUserProp, "firstName" | "email" | "career" | "status" | "subscriptionPlan">[] = response.data;

    return userList
      .filter(
        (user) =>
          user.status !== "cancelled" &&
          user.subscriptionPlan !== "whatsapp community Annually" &&
          !noNewJobsNotifications.includes(user.email),
      )
      .map((user) => ({
        firstName: user.firstName,
        email: user.email,
        career: user.career,
      }));
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
            ? latestJobListing.filter((l) => l.jobSubCategoryId === user.career)
            : latestJobListing;

          // Only send if there are jobs matching the user's career
          if (userJobsList.length === 0) return null;

          return {
            from: "info@beyondthesavannah.co.ke",
            to: [user.email],
            subject: "Beyond The Savannah New Jobs Alert",
            react: AllJobsAlertEmailTemplate({
              firstName: "There",
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

  // Logic ends here. The workflow terminates, and the Upstash CRON 
  // will restart it at the next 8-hour interval.
});



// export const { POST } = serve(async (context) => {
//   while (true) {
//     // Step 1: Fetch users
//     const usersEmailList = await context.run("Fetch subscribed users", async () => {
//       const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
//       const userList: Pick <SubscribedUserProp,"firstName" | "email" | "career" | "status" | "subscriptionPlan">[] = response.data;

//       return userList
//         .filter(
//           (user) =>
//             user.status !== "cancelled" &&
//             user.subscriptionPlan !== "whatsapp community Annually" &&
//             !noNewJobsNotifications.includes(user.email),
//         )
//         .map((user) => ({
//           firstName: user.firstName,
//           email: user.email,
//           career: user.career,
//         }));
//     });

//     // Step 2: Fetch latest jobs
//     const latestJobListing = await context.run("Fetch latest jobs", async () => {
//       const jobListingResponse = await axiosInstance.get("/api/Jobs/getAllJobsByCompany");
//       const jobListing: Pick<ListingRemoteJobs,"jobsId" | "jobName" | "jobUrl" | "imageUrl" | "jobSubCategoryId" | "companyName" | "dateCreated"
//       >[] = jobListingResponse.data;

//       const now = new Date();
//       const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);

//       return jobListing
//         .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
//         .filter((job) => new Date(job.dateCreated) > eightHoursAgo).map((job)=>({
//           jobsId:job.jobsId,
//           jobName:job.jobName,
//           jobUrl:job.jobUrl,
//           jobSubCategoryId:job.jobSubCategoryId,
//           imageUrl:job.imageUrl,
//           companyName:job.companyName,
//           dateCreated:job.dateCreated
//         }));
//     });

//     if (latestJobListing.length > 0) {
//       // FIX: Don't "Prepare" batches in a step. 
//       // Just calculate how many batches you need based on the usersEmailList length.
//       const batchSize = 50; // Smaller batches are safer for Resend & QStash

//       for (let i = 0; i < usersEmailList.length; i += batchSize) {
//         const batchIndex = Math.floor(i / batchSize);

//         await context.run(`Send batch ${batchIndex}`, async () => {
//           const resend = new Resend(process.env.RESEND_API_KEY);
//           const currentUsers = usersEmailList.slice(i, i + batchSize);
          
//           // MAP THE DATA HERE, inside the step, so it's not stored in the global state
//           const emailPayloads = currentUsers.map((user) => {
//             const userJobsList = user.career
//               ? latestJobListing.filter((l) => l.jobSubCategoryId === user.career)
//               : latestJobListing;

//             return {
//               from: "info@beyondthesavannah.co.ke",
//               to: [user.email],
//               subject: "Beyond The Savannah New Jobs Alert",
//               react: AllJobsAlertEmailTemplate({
//                 firstName: "There",
//                 jobs: userJobsList,
//               }),
//             };
//           }).filter(p => p !== null);

//           if (emailPayloads.length > 0) {
//             await resend.batch.send(emailPayloads);
//           }
//         });

//         if (i + batchSize < usersEmailList.length) {
//           await context.sleep(`Pause-batch-${batchIndex}`, 1);
//         }
//       }
//     }

//     // if (latestJobListing.length > 0) {
//     //   // Step 3: Prepare email batch list (pure CPU work, no I/O — safe in context.run)
//     //   const batchEmails = await context.run("Prepare email batches", async () => {
//     //     const emails: EmailBatchProp[] = [];

//     //     usersEmailList.forEach((user) => {
//     //       const userJobsList = user.career
//     //         ? latestJobListing.filter((listing) => listing.jobSubCategoryId === user.career)
//     //         : latestJobListing;

//     //       if (userJobsList.length > 0) {
//     //         emails.push({
//     //           from: "info@beyondthesavannah.co.ke",
//     //           to: [user.email],
//     //           subject: "Beyond The Savannah New Jobs Alert",
//     //           react: AllJobsAlertEmailTemplate({
//     //             firstName: user.firstName ?? "There",
//     //             jobs: userJobsList,
//     //           }),
//     //         });
//     //       }
//     //     });

//     //     return emails;
//     //   });

//     //   // Step 4: Send each batch as its own step, with sleep between them
//     //   const batchSize = 100;
//     //   for (let i = 0; i < batchEmails.length; i += batchSize) {
//     //     const batchIndex = Math.floor(i / batchSize);

//     //     await context.run(`Send email batch ${batchIndex}`, async () => {
//     //       const resend = new Resend(process.env.RESEND_API_KEY);
//     //       const batch = batchEmails.slice(i, i + batchSize);
//     //       await resend.batch.send(batch);
//     //       console.log(`Sent batch ${batchIndex} of ${batch.length} emails`);
//     //     });

//     //     // Sleep between batches (outside context.run — correct placement)
//     //     if (i + batchSize < batchEmails.length) {
//     //       await context.sleep(`Rate limit pause after batch ${batchIndex}`, 1);
//     //     }
//     //   }

//     //   console.log(`Successfully sent ${batchEmails.length} personalized job alert emails`);
//     // } else {
//     //   console.log("No new jobs in the last 8 hours");
//     // }

//     await context.sleep("Wait 8 hours", 8 * 60 * 60);
//   }
// });




// import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
// import { axiosInstance } from "@/remoteData/mutateData";
// import { ListingRemoteJobs } from "@/types/remoteJobsListing";
// import { EmailBatchProp, SubscribedUserProp } from "@/types/subscribedUser";
// import { serve } from "@upstash/workflow/nextjs";
// import { Resend } from "resend";

// export const { POST } = serve(async (context) => {
//   while(true){
//     await context.run("Send Email Alert", async () => {
//       await sendNewJobAddedAlertEmail();
//     });

//     // await context.sleep("Run every 8hrs a day", 8 * 60 * 60 * 1000);
//     await context.sleep("Run every 8hrs a day", 8 * 60 * 60);

//   }
// });

// //array of emails of users who don't what to be get email notifications
// const noNewJobsNotifications = [
//   "wangui.c.njeri@gmail.com",
//   "a.wanjirunina@gmail.com",
//   "carolynmnjeri@gmail.com",
//   "hassenga54@gmail.com",
//   "mosesmwangi007@gmail.com",
//   "riinyacynthia@gmail.com",
//   "jeanjesang@gmail.com",
//   "slyburd@gmail.com",
//   "keterlaureen@gmail.com",
//   "wairimunjoroge132@gmail.com",
//   "yasmin.osman222@gmail.com",
//   "bakhita.awuorba@gmail.com",
//   "louise.mutua@gmail.com",
// ];

// async function sendNewJobAddedAlertEmail() {
//   // get list of subscribed users from db and filter out the cancelled out users
//   const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
//   const userList: Pick<SubscribedUserProp, 'firstName'|'email'|'career'|'status'|'subscriptionPlan'>[] = await response.data;
//   const usersEmailList = userList
//     .filter(
//       (user) =>
//         user.status != "cancelled" &&
//         user.subscriptionPlan != "whatsapp community Annually" &&
//         !noNewJobsNotifications.includes(user.email),
//     )
//     .map((user) => ({
//       firstName: user.firstName,
//       email: user.email,
//       career: user.career,
//     }));

//   // get jobs listing and determine recently new added ones
//   const jobListingResponse = await axiosInstance.get(
//     "/api/Jobs/getAllJobsByCompany",
//   );
//   const jobListing: Pick<ListingRemoteJobs, 'jobsId'|'jobName'|'jobUrl'|'imageUrl'|'jobSubCategoryId'|'companyName'|'dateCreated'>[] = await jobListingResponse.data;
//   const sortedJobListingByDate = jobListing
//     ?.sort((a, b) => {
//       return (
//         new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
//       );
//     })
//     .map((sortedJobs) => ({
//       jobsId: sortedJobs.jobsId,
//       jobName: sortedJobs.jobName,
//       imageUrl:sortedJobs.imageUrl,
//       jobUrl: sortedJobs.jobUrl,
//       companyName:sortedJobs.companyName,
//       jobSubCategoryId: sortedJobs.jobSubCategoryId,
//       dateCreated: sortedJobs.dateCreated,
//     }));

//   const now = new Date();
//   const eightHoursAgo = new Date(now.getTime() - 8 * 60 * 60 * 1000);
//   const latestJobListing = sortedJobListingByDate.filter((job) => {
//     const createdTime = new Date(job.dateCreated);
//     return createdTime > eightHoursAgo;
//   });

//   if (latestJobListing.length === 0) {
//     console.log("No latest Jobs added within the latest 8 hours");
//     return;
//   }

//   const resend = new Resend(process.env.RESEND_API_KEY);
//   const batchEmails: EmailBatchProp[] = [];

//   // Process each user and prepare personalized emails
//   usersEmailList.forEach((user) => {
//     // let userJobsList: ListingRemoteJobs[];
//     let userJobsList: Pick<ListingRemoteJobs, 'jobsId'|'jobName'|'jobUrl'|'imageUrl'|'jobSubCategoryId'|'companyName'|'dateCreated'>[]

//     // Filter jobs based on user's career preference
//     if (user.career) {
//       userJobsList = latestJobListing.filter(
//         (listing) => listing.jobSubCategoryId === user.career,
//       )
//       console.log(
//         `Filtered jobs for ${user.email} (career: ${user.career}):`,
//         userJobsList.length,
//       );
//     } else {
//       // If no career preference, send all latest jobs
//       userJobsList = latestJobListing;
//       console.log(
//         `All jobs for ${user.email} (no career preference):`,
//         userJobsList.length,
//       );
//     }

//     // Only send email if there are jobs to send
//     if (userJobsList.length > 0) {
//       batchEmails.push({
//         from: "info@beyondthesavannah.co.ke",
//         to: [user.email],
//         subject: "Beyond The Savannah New Jobs Alert",
//         react: AllJobsAlertEmailTemplate({
//           firstName: user.firstName ?? "There",
//           jobs: userJobsList,
//         }),
//       });
//     } else {
//       console.log(`No matching jobs found for ${user.email}`);
//     }
//   });

//   // Send emails in batches if there are any to send
//   if (batchEmails.length > 0) {
//     try {
//       const batchSize = 100;
//       for (let i = 0; i < batchEmails.length; i += batchSize) {
//         const batch = batchEmails.slice(i, i + batchSize);
//         await resend.batch.send(batch);
//         console.log(`Sent batch of ${batch.length} emails`);

//         // Add delay between batches to avoid rate limiting
//         if (i + batchSize < batchEmails.length) {
//           await new Promise((res) => setTimeout(res, 500));
//         }
//       }
//       console.log(
//         `Successfully sent ${batchEmails.length} personalized job alert emails`,
//       );
//     } catch (error) {
//       console.log("Error sending batch emails:", error);
//     }
//   } else {
//     console.log("No emails to send - no users have matching job preferences");
//   }
// }
