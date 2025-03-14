import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  return (
    <>
      {userSubscriptionInformation == null ||
      userSubscriptionInformation?.status == "cancelled" ? (
        <PackageOptionSection />
      ) : (
        <SubscriptionDetails />
      )}
    </>
  );
}
