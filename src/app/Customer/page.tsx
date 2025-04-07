export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  // console.log("Page", userSubscriptionInformation);

  // const isValidSubscription=["active", "attenttion", "non-renewing"].includes(userSubscriptionInformation?.status as string)
  const isValidSubscription = userSubscriptionInformation?.status
    ? ["active", "attention", "non-renewing", "completed"].includes(
        userSubscriptionInformation?.status.toLocaleLowerCase()
      )
    : false;

  // console.log("isValid", isValidSubscription);

  return (
    <>
      {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />}
    </>
  );
}
