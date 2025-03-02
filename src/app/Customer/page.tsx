import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { SubscriptionProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";

export default async function CustomerDefaultPage() {
  const user = await currentUser();
  const response = await fetch(`http://localhost:3000/api/subscriptions`);
  const allSubscriptionData = await response.json();
  const userEmailAddress = user?.emailAddresses[0].emailAddress;

  const userSubscriptionInformation: SubscriptionProps =
    allSubscriptionData.data.find(
      (data: SubscriptionProps) => data.customer.email == userEmailAddress
    );

  // console.log("CUSTOMER_PAGE--", userSubscriptionInformation);

  return (
    <>
      {userSubscriptionInformation.status == "cancelled" ? (
        <PackageOptionSection />
      ) : (
        <SubscriptionDetails />
      )}
    </>
  );
}
