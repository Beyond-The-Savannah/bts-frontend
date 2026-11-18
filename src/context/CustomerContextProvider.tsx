import { ReactNode, use } from "react";
import { CustomerContext } from "./CustomerContext";
import { useUser } from "@clerk/nextjs";
import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/app/dal/UserSubscriptionInformation";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { subscriptionResult } from "@/app/dal/subscriptions";

export default function CustomerContextProvider({children}: {children: ReactNode;}) {
  
    const { user } = useUser();
  
    const getUserSubscriptionInformationWorkFlowOne = async () => {
    const result = await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
    return result;
  };
  
    const getUserSubscriptionInformationWorkFlowTwo = async () => {
    const result = await subscriptionResult(user?.primaryEmailAddress?.emailAddress as string);
    return result;
  };

  const getUserSubscriptionInformationWorkFlowOnePromise = getUserSubscriptionInformationWorkFlowOne();
  const getUserSubscriptionInformationWorkFlowTwoPromise = getUserSubscriptionInformationWorkFlowTwo();

  const userSubscriptionInfo:subscriptionDetailsProps[] = use(getUserSubscriptionInformationWorkFlowOnePromise);
  const userSubscriptionData = use(getUserSubscriptionInformationWorkFlowTwoPromise);

   //get the whatsapp subscription info for the subscription workflow one
  const whatsAppSubscriptionDetails1 = userSubscriptionInfo?.find(
    (subscription) => subscription.amount == 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase(),),
  );


  //get the subscription info for the subscription workflow one
    const jobsListingSubscriptionDetails1 = userSubscriptionInfo?.find(
    (subscription) => subscription.amount != 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase(),),
  );


  //get the subscription info for the subscription workflow two

  return <CustomerContext value={{}}>{children}</CustomerContext>;
}
