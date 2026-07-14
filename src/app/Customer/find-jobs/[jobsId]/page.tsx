// import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import { subscriptionResult, uploadedResumeResult } from "@/app/dal/subscriptions";
import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import ViewJob from "@/components/Customer/ViewJob";
import SingleJobLoadingUI from "@/components/Loaders/SingleJobLoadingUI";
import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ jobsId: string }>;
}) {
  const jobsId = (await params).jobsId;
  
  const user = await currentUser();
  

  // const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const userSubscriptionInformation:subscriptionDetailsProps[] | null= await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack()
  
  const uploadedResumeData=await uploadedResumeResult(user?.primaryEmailAddress?.emailAddress as string)
   
  const subscriptionData=await subscriptionResult(user?.primaryEmailAddress?.emailAddress as string)
    
    const validSubscription=subscriptionData.find((subscription)=>parseInt(subscription.planCost as string)!=6000 &&
  ["active", "attention", "non-renewing", "completed"].includes(subscription.planStatus?.toLowerCase() as string))

  // const jobsListingSubscriptionDetails = userSubscriptionInformation?.filter(
  //   (subscription) =>
  //     subscription.amount != 600000 &&
  //     ["active", "attention", "non-renewing", "completed"].includes(
  //       subscription.status.toLowerCase()
  //     )
  // )[0];

  const jobsListingSubscriptionDetails=userSubscriptionInformation?.find((subscription)=>subscription.amount!=600000 &&
["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))


  

  if (jobsListingSubscriptionDetails == undefined && validSubscription==undefined && !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
  ) {
    redirect("/Customer");
  }

  return (
    <div className="container mx-auto">
      <div className="px-4">
        <h2 className="text-sm md:text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-xl md:text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunity
        </p>
      </div>
      <Suspense fallback={<SingleJobLoadingUI />}>
        <ViewJob jobsId={jobsId} userResume={uploadedResumeData[0]} />
      </Suspense>
    </div>
  );
}
