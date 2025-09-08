// export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";
import PackagesLoader from "@/components/Loaders/PackagesLoader";
import { Suspense } from "react";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

// console.log("USER SUB INFO", userSubscriptionInformation)


  const isValidSubscription=userSubscriptionInformation?.some((subscription)=>{
    return ["active","attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase())
  })
 

  return (
    <>
      {/* {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />} */}
      {isValidSubscription ?
      (
        <Suspense fallback={<DashboardPageLoader/>}>
          <SubscriptionDetails />
        </Suspense>
         ) : 
         (
          <Suspense fallback={<PackagesLoader/>}>
            <PackageOptionSection />
          </Suspense>
         )}
    </>
  );
}
