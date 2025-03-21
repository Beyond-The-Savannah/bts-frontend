import { UserDataProp } from "@/types/mailerLite";
import MailerLite from "@mailerlite/mailerlite-nodejs";

const MAILERLITE_KEY = process.env.MAILERLITE_KEY;

if (!MAILERLITE_KEY) {
  throw new Error("MailerLite API key is missing");
}
const mailerLite = new MailerLite({
  api_key: MAILERLITE_KEY,
});

export async function AddSubscriberEmailToMailerLite(userData: UserDataProp) {
  try {
    const response = await mailerLite.subscribers.createOrUpdate(userData);
    return response;
    // console.log("MAiler", response);
  } catch (error) {
    console.log("Error from mailerLite function ", error);
  }
}
