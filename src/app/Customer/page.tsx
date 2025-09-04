// export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

// console.log("USER SUB INFO", userSubscriptionInformation)


  const isValidSubscription=userSubscriptionInformation?.some((subscription)=>{
    return ["active","attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase())
  })
 

  return (
    <>
      {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />}
    </>
  );
}
