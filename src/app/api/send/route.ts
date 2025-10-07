import ServiceEmailTemplate from "@/components/Emails/ServiceEmailTemplate";
import { servicesCalendlyLinks } from "@/staticData/services";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, firstName, amount, serviceName } = await request.json();
    const specificCalendlyLink = servicesCalendlyLinks.find((service) => {
      return service.serviceName == serviceName;
    });
    const { data, error } = await resend.emails.send({
      from: `info@beyondthesavannah.co.ke`,
      to: [email],
      // subject: `Beyond The Savannah Service Link`,
      subject: `Beyond The Savannah ${specificCalendlyLink?.serviceName} Service Link`,
      react: ServiceEmailTemplate({
        firstName: firstName,
        amount: amount,
        serviceName: serviceName,
      }),
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
