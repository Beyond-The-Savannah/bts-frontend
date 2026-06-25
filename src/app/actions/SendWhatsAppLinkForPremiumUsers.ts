"use server";

import WhatsAppsEmailTemplate from "@/components/Emails/WhatsAppsEmailTemplate";
import { Resend } from "resend";

export async function SendWhatsApplinkForPremiumUsers(
  firstName: string,
  email: string,
  userId:string,
) {
    
    const generateLink = async () => {
      try {
        const response = await fetch("/api/generate-expiration-link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId:userId }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("expiringLink", data.expiringLink);
          return data.expiringLink;
        } else {
          console.error(data.error);
          return null;
        }
      } catch (error) {
        console.error("Error generating expiration link:", error);
        return null;
      }
    };

    const expiringLink = await generateLink();
    console.log("whatsapp Link => ", expiringLink)
    
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: `info@beyondthesavannah.co.ke`,
    to: [email],
    subject: `Beyond The Savannah Whatsapp Link`,
    react: WhatsAppsEmailTemplate({
      firstName: firstName,
      whatsAppExpiringLink: expiringLink,
    }),
  });
  if(data) console.log("Email sent for premium user with whatsapp link ", data.id)
  if(error) console.log("Failed to send email for premium user with whatsapp link ", error)

}
