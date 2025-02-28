import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";

export default async function CustomerDefaultPage() {
  const response = await fetch(`http://localhost:3000/api/subscriptions`);
  const subscriptionData = await response.json();
  // console.log("CHECKSUB", subscriptionData);
  // console.log("CHECK CUSTOMER SUB", subscriptionData.data[0].customer.customer_code);

  return (
    <>
      {subscriptionData.status == false ? (
        <PackageOptionSection />
      ) : (
        <SubscriptionDetails />
      )}
    </>
  );
}
