import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import ViewJob from "@/components/Customer/ViewJob";
import SingleJobLoadingUI from "@/components/SingleJobLoadingUI";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ jobsId: string }>;
}) {
  const jobsId = (await params).jobsId;
  
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const jobsListingSubscriptionDetails=userSubscriptionInformation?.filter((subscription)=>subscription.amount!=600000 && ["active","attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))[0]
  const user = await currentUser();

  const byPassEmailAddresses = [
    `onyango.mary15@gmail.com`,
    `kimothoevalyne@gmail.com`,
    `thothocaroline@gmail.com`,
    `gitoshmbae@gmail.com`
  ];

  if(jobsListingSubscriptionDetails==undefined && !byPassEmailAddresses.includes(user?.emailAddresses[0].emailAddress as string)){
    redirect("/Customer")
  }
  
  return (
    <>
    <Suspense fallback={<SingleJobLoadingUI/>}>
      <ViewJob jobsId={jobsId} />
    </Suspense>
    </>
  );
}
