import { AddSubscriberEmailToMailerLite } from "@/lib/mailerLite";
import { SubscriptionProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";

const PUBLIC_BASE_URL=process.env.PUBLIC_BASE_URL

 export async function GetUserSubscriptionInformation(){
  try {
    const user = await currentUser();
    const response = await fetch(`${PUBLIC_BASE_URL}/api/subscriptions`);
    // const response = await fetch(`/api/subscriptions`);
    const allSubscriptionData = await response.json();
    const userEmailAddress = user?.emailAddresses[0].emailAddress;
  
    const userSubscriptionInformation: SubscriptionProps =
      allSubscriptionData.data.find(
        (data: SubscriptionProps) => data.customer.email == userEmailAddress
      );
    // console.log("SUBINFO", userSubscriptionInformation);
    if(userSubscriptionInformation.status=='active' && userEmailAddress !=undefined){
      await AddSubscriberEmailToMailerLite({email:userEmailAddress})
    }
    return userSubscriptionInformation
    
  } catch (error) {
  console.log("Error Getting userSubscriptionInformation",error)    
  }
 }