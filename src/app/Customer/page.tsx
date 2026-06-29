// import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";

import {
  // AddNewSubscriberToDatabase,
  // GetCustomerSubscriptionDetailsByCustomerIDFromPaystack,
} from "@/components/Customer/UserSubscriptionInformation";

// import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";
// import PackagesLoader from "@/components/Loaders/PackagesLoader";

// import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
// import { subscriptionDetailsProps } from "@/types/subscriptions";
// import { currentUser } from "@clerk/nextjs/server";
// import { Suspense } from "react";

export default async function CustomerDefaultPage() {
  // let userSubscriptionInformation: subscriptionDetailsProps[] | null = null;

  // userSubscriptionInformation = await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  // const user = await currentUser();

  // const userSubscriptionInformation:subscriptionDetailsProps[] | null = await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();

//   const whatsAppSubscriptionDetails1=userSubscriptionInformation?.find((subscription)=> subscription.amount==600000 && 
//   ["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))

//   const jobsListingSubscriptionDetails1=userSubscriptionInformation?.find((subscription)=>subscription.amount!=600000 &&
// ["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))

// const subscriptionDataDetails2=(await GetSubscriptionDetails(user?.primaryEmailAddress?.emailAddress as string)).find((details)=>details.planStatus==='active')



// let dateValue;
// if (
//   jobsListingSubscriptionDetails1?.next_payment_date != null ||
//   jobsListingSubscriptionDetails1?.next_payment_date != undefined
// ) {
//   dateValue = new Date(jobsListingSubscriptionDetails1.next_payment_date);
// }else{dateValue=new Date(subscriptionDataDetails2?.endDate as Date)}

// let convertedNextSubscriptionDate2;
// if (dateValue instanceof Date) {
//   const dateFormat = new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "short",
//   });
//   convertedNextSubscriptionDate2 = dateFormat.format(dateValue);
// } else {
//   convertedNextSubscriptionDate2 = "No information available";
// }
// const subscriptionData2={...subscriptionDataDetails2,firstName:user?.firstName ?? "There",endDate:convertedNextSubscriptionDate2}

// console.log("SUBDATA TWO -> ",subscriptionData2)

  // await AddNewSubscriberToDatabase();
  

  // const allowByPassUser = byPassEmailAddresses.includes(
  //   user?.emailAddresses[0].emailAddress as string,
  // );

  // const isValidSubscription = userSubscriptionInformation
  //   ?.filter((subscriptionOne) => subscriptionOne.amount != 300000)
  //   .some((subscription) => {
  //     return ["active", "attention", "non-renewing", "completed"].includes(
  //       subscription.status.toLowerCase(),
  //     );
  //   });

  return (
    <>
      {/* {isValidSubscription == true || allowByPassUser == true  ? (
        <Suspense fallback={<DashboardPageLoader />}> */}
          <SubscriptionDetails />
          
        {/* </Suspense>
      ) : (
        <Suspense fallback={<PackagesLoader />}>
          <PackageOptionSection />
        </Suspense>
      )} */}
    </>
  );
}
