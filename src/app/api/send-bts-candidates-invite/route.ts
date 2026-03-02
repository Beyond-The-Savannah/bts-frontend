import BtsCandidateInviteEmailTemplate from "@/components/Emails/BtsCandidateInviteEmailTemplate";
import { GetCandidateBYEmail, GetCandidatesPool } from "@/db/queries/employerQuries";
// import { CandidateProp } from "@/db/schema";
import { Resend } from "resend";
import { serve } from "@upstash/workflow/nextjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const { POST } = serve(async (context) => {
  // Step 1: Fetch ONLY emails — keep payload tiny for upstash and not exceed the max size
  const allCandidatesEmails = await context.run(
    "fetch-all-candidates-and-send-email-invites",
    // async (): Promise<CandidateProp[]> => {
    async (): Promise<string[]> => {
      const candidatesData=await GetCandidatesPool()
      return candidatesData.map((candidate)=>candidate.email) //only store the emails
    }
  );

  if (allCandidatesEmails.length === 0) {
    console.log("No BTS candidates emails found, exiting.");
    return;
  }

  // Step 2: For each email, fetch fresh + send — data not stored in workflow state
  for (const email of allCandidatesEmails) {
    await context.run(`send-email-${email}`, async () => {
      const candidate=await GetCandidateBYEmail(email)
      if(!candidate)return

      const { error } = await resend.emails.send({
        from: `info@beyondthesavannah.co.ke`,
        to: [candidate[0].email],
        subject: `Action Required: Please Set Up Your Candidate's Profile`,
        react: BtsCandidateInviteEmailTemplate({
          email: candidate[0].email,
          firstName: candidate[0].firstName,
        }),
      });

      if (error) {
        // Throwing causes Upstash to retry just this step
        throw new Error(
          `Failed to send email to ${candidate[0].email}: ${JSON.stringify(error)}`
        );
      }

      console.log(`Email sent successfully to ${candidate[0].email}`);
    });

    // Step 3: Rate limiting delay between sends
    await context.sleep(`rate-limit-${email}`, 1);
  }
});



// export const { POST } = serve(async (context) => {
//   await context.run("Send All Candidates An Email Invite", async () => {
//     await sendAllCandidatesEmailInvites();
//   });
// });

// async function sendAllCandidatesEmailInvites() {
//   const allCandidates: CandidateProp[] = await GetCandidatesPool();
  
//   if (allCandidates.length > 0) {
//     try {
//       for (const candidate of allCandidates) {
//         try {
//           const { data, error } = await resend.emails.send({
//             from: `info@beyondthesavannah.co.ke`,
//             to: [candidate.email],
//             subject: `Action Required: Please Set Up Your Candidate's Profile`,
//             react: BtsCandidateInviteEmailTemplate({
//               email: candidate.email,
//               firstName: candidate.firstName,
//             }),
//           });
//           await new Promise((res) => setTimeout(res, 500));
//           if (error) {
//             return Response.json({ error }, { status: 500 });
//           }
//           return Response.json(data);
//         } catch (error) {
//           console.log("Error in send all candidates loop", error);
//         }
//       }
//     } catch (error) {
//       console.log("Error couldn't send all candidates email invites", error);
//     }
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const { email, firstName } = await request.json();
//     const { data, error } = await resend.emails.send({
//       from: `info@beyondthesavannah.co.ke`,
//       to: [email],
//       subject: `Action Required: Please Set Up Your Candidate's Profile`,
//       react: BtsCandidateInviteEmailTemplate({
//         email,
//         firstName,
//       }),
//     });
//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }
//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }