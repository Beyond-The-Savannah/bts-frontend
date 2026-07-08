"use server";

import WhatsAppsEmailTemplate from "@/components/Emails/WhatsAppsEmailTemplate";
import { Resend } from "resend";

export async function SendWhatsApplinkForPremiumUsers(
  firstName: string,
  email: string,
  
) {

    const whatsappLink="https://chat.whatsapp.com/L41Wm4vCwGTG7JqXI8HG3f"
    
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: `info@beyondthesavannah.co.ke`,
    to: [email],
    // subject: `Beyond The Savannah Whatsapp Link`,
    subject: `Beyond the Savannah Accountability Community Link`,
    react: WhatsAppsEmailTemplate({
      firstName: firstName,
      whatsAppExpiringLink: whatsappLink,
    }),
  });
  if(data) console.log("Email sent for premium user with whatsapp link ", data.id)
  if(error) console.log("Failed to send email for premium user with whatsapp link ", error)

}
