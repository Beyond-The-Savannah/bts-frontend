import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  // console.log("Page", userSubscriptionInformation);

  // const isValidSubscription=["active", "attenttion", "non-renewing"].includes(userSubscriptionInformation?.status as string)
  const isValidSubscription = userSubscriptionInformation?.status
    ? ["active", "attenttion", "non-renewing", "completed"].includes(
        userSubscriptionInformation?.status
      )
    : false;

  // console.log("isValid", isValidSubscription);

  return (
    <>
      {/* {userSubscriptionInformation == null ||
      userSubscriptionInformation?.status == "cancelled" ||
      userSubscriptionInformation?.plan.amount == 600000 ? (
        <PackageOptionSection />
      ) : (
        <SubscriptionDetails />
      )} */}
      {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />}
    </>
  );
}
