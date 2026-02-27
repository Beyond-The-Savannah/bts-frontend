import BtsCandidateInviteEmailTemplate from "@/components/Emails/BtsCandidateInviteEmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();
    const { data, error } = await resend.emails.send({
      from: `info@beyondthesavannah.co.ke`,
      to: [email],
      subject: `Action Required: Please Set Up Your Candidate's Profile`,
      react: BtsCandidateInviteEmailTemplate({
        email,
        firstName,
      }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
