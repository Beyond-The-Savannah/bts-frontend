// export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation, GetUserSubscriptionInformationFromBTSDB } from "@/components/Customer/UserSubscriptionInformation";
import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";
import PackagesLoader from "@/components/Loaders/PackagesLoader";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  const validUser=await GetUserSubscriptionInformationFromBTSDB()
  
  const user = await currentUser();
  // console.log("USER SUB INFO", userSubscriptionInformation)

  // console.log("BTS USER FROM CUSTOMER PAGE",validUser)

  const byPassEmailAddresses = [
      `teddy254mutinge@gmail.com`,
      `myrakagai05@gmail.com`,
    //   `lizanaropi@gmail.com`,
    //   `starmugure@gmail.com`,
    //   `fmmusembi96@gmail.com`,
    //   `imokolabarbra@gmail.com`,
    `patienceat63@gmail.com`,
    `gitoshmbae@gmail.com`,
  ];

  const allowByPassUser = byPassEmailAddresses.includes(
    user?.emailAddresses[0].emailAddress as string
  );
  const isValidSubscription = userSubscriptionInformation?.some(
    (subscription) => {
      return ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      );
    }
  );

  return (
    <>
      {/* {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />} */}
      {isValidSubscription || allowByPassUser == true || validUser!=null ? (
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
