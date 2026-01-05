// export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import {
  AddNewSubscriberToDatabase,
  GetCustomerSubscriptionDetailsByCustomerIDFromPaystack,
} from "@/components/Customer/UserSubscriptionInformation";
// import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";
import PackagesLoader from "@/components/Loaders/PackagesLoader";
import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function CustomerDefaultPage() {
  // const userSubscriptionInformation = await GetUserSubscriptionInformation();
  // const userSubscriptionInformation:subscriptionDetailsProps[] = await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();

  let userSubscriptionInformation: subscriptionDetailsProps[] | null = null;

  userSubscriptionInformation =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();

  const user = await currentUser();

  await AddNewSubscriberToDatabase();
  // console.log("USER SUB INFO", userSubscriptionInformation)

  // console.log("BTS USER FROM CUSTOMER PAGE",validUser)

  const allowByPassUser = byPassEmailAddresses.includes(
    user?.emailAddresses[0].emailAddress as string
  );

  // const isValidSubscription = userSubscriptionInformation?.some(
  //   (subscription) => {
  //     return ["active", "attention", "non-renewing", "completed"].includes(
  //       subscription.status.toLowerCase()
  //     );
  //   }
  // );
  // const isValidSubscription=userSubscriptionInformation

  return (
    <>
      {/* {isValidSubscription || allowByPassUser == true ? ( */}
      {/* {userSubscriptionInformation!=null || allowByPassUser == true ? ( */}

      {/* {isValidSubscription!=undefined || allowByPassUser == true ? (
        <Suspense fallback={<DashboardPageLoader />}>
          <SubscriptionDetails />
        </Suspense>
      ) : (
        <Suspense fallback={<PackagesLoader />}>
          <PackageOptionSection />
        </Suspense>
      )} */}

      {(userSubscriptionInformation != null || allowByPassUser === true) ? (
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
