// import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
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
  

  // const jobsListingSubscriptionDetails = userSubscriptionInformation?.filter(
  //   (subscription) =>
  //     subscription.amount != 600000 &&
  //     ["active", "attention", "non-renewing", "completed"].includes(
  //       subscription.status.toLowerCase()
  //     )
  // )[0];

  const jobsListingSubscriptionDetails=userSubscriptionInformation?.find((subscription)=>subscription.amount!=600000 &&
["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))


  

  if (jobsListingSubscriptionDetails == undefined && !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
  ) {
    redirect("/Customer");
  }

  return (
    <div className="container mx-auto">
      <div className="px-4">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunity
        </p>
      </div>
      <Suspense fallback={<SingleJobLoadingUI />}>
        <ViewJob jobsId={jobsId} />
      </Suspense>
    </div>
  );
}
