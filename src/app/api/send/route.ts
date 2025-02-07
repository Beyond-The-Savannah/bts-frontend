import EmailTemplate from "@/components/Emails/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const { data, error } = await resend.emails.send({
      from: `info@beyondthesavannah.co.ke`,
      to: [email],
      subject: `Beyond The Savannah Service Link`,
      react:
        EmailTemplate(),
        //     {
        //     email: "test@mail.com",
        //   }
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    console.log(data);
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
