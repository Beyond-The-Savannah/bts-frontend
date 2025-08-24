export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  const isValidSubscription = userSubscriptionInformation?.status
    ? ["active", "attention", "non-renewing", "completed"].includes(
        userSubscriptionInformation?.status.toLocaleLowerCase()
      )
    : false;


  return (
    <>
      {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />}
    </>
  );
}
