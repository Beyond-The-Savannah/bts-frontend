import EmailTemplate from "@/components/Emails/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      // from: `Acme <onboarding@resend.dev>`,
      from: `<info@info@beyondthesavannah.co.ke>`,
      to: [`gitoshmbae@gmail.com`, `gitonga1993@gmail.com`, `michaelgitonga588@gmail.com`],
      subject: `Beyond The Savannah Service Link`,
      react: EmailTemplate(
    //     {
    //     email: "test@mail.com",
    //   }
    ),
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
