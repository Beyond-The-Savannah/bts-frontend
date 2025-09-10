// import { AddSubscriberEmailToMailerLite } from "@/lib/mailerLite";
import { AddSubscriberToKit } from "@/lib/kitNewsLetter";
import { SubscriptionProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";

const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

export async function GetUserSubscriptionInformation(){
  const user=await currentUser()
  if(!user){ 
    console.log("No user from clerk")
     return null}

  try {
    const response1=await fetch(`${PUBLIC_BASE_URL}/api/subscriptions`,{next:{revalidate:60}})
    const allSubscriptionData=await response1.json()  
    const userEmailAddress = user?.emailAddresses[0].emailAddress.toLowerCase();

     const userSubscriptionInformation: SubscriptionProps[] =
      allSubscriptionData.data
        .filter(
          (data: SubscriptionProps) =>
            data.customer.email.toLocaleLowerCase() == userEmailAddress
        )
        .sort(
          (a:SubscriptionProps, b:SubscriptionProps) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        // )[0];
        ).slice(0,4);
    // console.log("SUBINFO", userSubscriptionInformation);

    userSubscriptionInformation.forEach(async(subscription)=>{
      if(subscription.amount!=600000 && subscription.status=="active" && userEmailAddress!=undefined){
        // await AddSubscriberEmailToMailerLite({email:userEmailAddress})
        await AddSubscriberToKit({email:userEmailAddress})
      }
    })

    return userSubscriptionInformation;

  } catch (error) {
    console.log("Error Getting userSubscriptionInformation", error);
  }
}