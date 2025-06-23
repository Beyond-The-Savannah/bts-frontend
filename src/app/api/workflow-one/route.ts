
import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { axiosInstance } from "@/remoteData/mutateData";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const { POST } = serve(async (context) => {
  await context.run("Send Email Alert", async () => {
    await sendNewJobAddedAlertEmail();
    // console.log("tesing email send functionality to gitosh")
  });
  while(true){
    await context.sleep("Run every 8hrs a day",8*60*60*1000)
  }
});

async function sendNewJobAddedAlertEmail() {
  // get list of subscribed users from db and filter out the cancelled out users
  const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
  const userList: SubscribedUserProp[] = await response.data;
  const usersEmailList = userList.filter((user) => user.status != "cancelled");


  // get jobs listing and determine recently new added ones 
  const jobListingResponse=await axiosInstance.get("/api/Jobs/getAllJobsByCompany")
  const jobListing:ListingRemoteJobs[]=await jobListingResponse.data
  const sortedJobListingByDate=jobListing?.sort((a,b)=>{return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()})
  // const lastTenJobsListing=sortedJobListingByDate.slice(0,10)


  const now=new Date()
  const eightHoursAgo= new Date(now.getTime()-8*60*60*1000)
  const lastestJobListing=sortedJobListingByDate.filter((job)=>{
    const createdTime= new Date(job.dateCreated)
    return createdTime>eightHoursAgo
  })
  

  

  // map the new subcribed user list and send mail
  usersEmailList.slice(0, 1).map(async (user) => {
    try {
      await resend.emails.send({
        from: `info@beyondthesavannah.co.ke`,
        // to:[`${user.email}`]
        to: ["gitoshmbae@gmail.com"],
        // subject: `New Jobs Alert`,
        subject: `Beyond The Savannah New Jobs Alert`,
        // react: AllJobsAlertEmailTemplate({ firstName: user.firstName, jobs:lastTenJobsListing }),
        react: AllJobsAlertEmailTemplate({ firstName: user.firstName, jobs:lastestJobListing }),
      });
      
    } catch (error) {
       console.log("Error in the catch session of the sendNewJobAddedAlerEmail function",error);
    }
  });

  // console.log("LISTING UNDER 8HRS",lastestJobListing);
}
