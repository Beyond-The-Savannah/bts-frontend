import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import { subscriptionResult } from "@/app/dal/subscriptions";
import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import { FindJobs } from "@/components/findJobsPage/FindJobs";
import { redirect } from "next/navigation";

export async function JobListings() {
  // const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const userSubscriptionInformation: subscriptionDetailsProps[] | null =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  const user = await currentUser();

  const subscriptionData = await subscriptionResult(
    user?.primaryEmailAddress?.emailAddress as string,
  );
  const validSubscription = subscriptionData.find(
    (subscription) =>
      parseInt(subscription.planCost as string) != 6000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.planStatus?.toLowerCase() as string,
      ),
  );

  const jobsListingSubscriptionDetails = userSubscriptionInformation?.find(
    (subscription) =>
      subscription.amount != 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase(),
      ),
  );

  if (
    jobsListingSubscriptionDetails == undefined &&
    validSubscription == undefined &&
    !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string,
    )
  ) {
    redirect("/Customer");
  }
  if (user == null) return null;

  // console.log("USER INFO", jobsListingSubscriptionDetails);
  return <FindJobs />;
}
