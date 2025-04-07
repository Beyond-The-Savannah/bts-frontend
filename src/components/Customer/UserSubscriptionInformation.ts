import { AddSubscriberEmailToMailerLite } from "@/lib/mailerLite";
import { SubscriptionProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

export async function GetUserSubscriptionInformation() {
  try {
    const user = await currentUser();
    const response1= await axios.get(`${PUBLIC_BASE_URL}/api/subscriptions`)
    // console.log("AXOIS CALL", response1.data)
    const allSubscriptionData = response1.data
    const userEmailAddress = user?.emailAddresses[0].emailAddress.toLowerCase();

    const userSubscriptionInformation: SubscriptionProps =
      allSubscriptionData.data.find(
        (data: SubscriptionProps) =>
          data.customer.email.toLowerCase() == userEmailAddress
      );
    console.log("SUBINFO", userSubscriptionInformation);
    if (
      userSubscriptionInformation.status == "active" &&
      userEmailAddress != undefined
    ) {
      await AddSubscriberEmailToMailerLite({ email: userEmailAddress });
    }
    return userSubscriptionInformation;
  } catch (error) {
    console.log("Error Getting userSubscriptionInformation", error);
  }
}
