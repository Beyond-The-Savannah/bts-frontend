// import { useGetRemoteListingJobsUsingTanstack } from "@/remoteData/getData";
import AllJobsAlertEmailTemplate from "@/components/Emails/AllJobsAlertEmailTemplate";
import { axiosInstance } from "@/remoteData/mutateData";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const { POST } = serve(async (context) => {
  await context.run("Send Email Alert", async () => {
    await sendNewJobAddedAlertEmail();
  });
});

async function sendNewJobAddedAlertEmail() {
  // get list of subscribed users from db and filter out the cancelled out users
  const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
  const userList: SubscribedUserProp[] = await response.data;
  const usersEmailList = userList.filter((user) => user.status != "cancelled");

  //map of new subcribed user list and send mail
  usersEmailList.map(async (user) => {
    await resend.emails.send({
      from: `info@beyondthesavannah.co.ke`,
      // to:[`${user.email}`]
      to: ["gitoshmbae@gmail.com", "gitonga1993@gmail.com"],
      subject: `New Job Alert`,
      react: AllJobsAlertEmailTemplate({ firstName: user.firstName }),
    });
  });

  console.log(userList);
}
