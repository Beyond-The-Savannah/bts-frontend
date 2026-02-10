import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import {
  AddNewSubscriberToDatabase,
  GetCustomerSubscriptionDetailsByCustomerIDFromPaystack,
} from "@/components/Customer/UserSubscriptionInformation";

import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";
import PackagesLoader from "@/components/Loaders/PackagesLoader";
import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function CustomerDefaultPage() {
  let userSubscriptionInformation: subscriptionDetailsProps[] | null = null;

  userSubscriptionInformation =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  // console.log("USER SUB INFO PAGE TSX", userSubscriptionInformation);

  const user = await currentUser();

  await AddNewSubscriberToDatabase();
  // console.log("USER SUB INFO", userSubscriptionInformation)

  // console.log("BTS USER FROM CUSTOMER PAGE",validUser)

  const allowByPassUser = byPassEmailAddresses.includes(
    user?.emailAddresses[0].emailAddress as string,
  );

  const isValidSubscription = userSubscriptionInformation
    ?.filter((subscriptionOne) => subscriptionOne.amount != 300000)
    .some((subscription) => {
      return ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase(),
      );
    });

  return (
    <>
      {isValidSubscription == true || allowByPassUser == true ? (
        <Suspense fallback={<DashboardPageLoader />}>
          <SubscriptionDetails />
        </Suspense>
      ) : (
        <Suspense fallback={<PackagesLoader />}>
          <PackageOptionSection />
        </Suspense>
      )}
    </>
  );
}
