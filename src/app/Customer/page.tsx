import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { currentUser } from "@clerk/nextjs/server";

export default async function CustomerDefaultPage() {
  const user = await currentUser();
    const userEmail = user?.emailAddresses[0].emailAddress as string;
  const response = await fetch(`http://localhost:3000/api/subscriptions`);
  const subscriptionData = await response.json();
  // console.log("CHECKSUB", subscriptionData);
  // console.log("CHECKSUB", subscriptionData.data[0].customer);
  // console.log("CHECK CUSTOMER SUB", subscriptionData.data[0].customer.customer_code);
  // let checkLoggedUserHasSubscribed=false
  // if(subscriptionData.data[0].customer.email==userEmail){
  //   checkLoggedUserHasSubscribed=true
  // }

  return (
    <>
      {subscriptionData.status === true && subscriptionData.data[0].customer.email!=userEmail ? (
        <PackageOptionSection />
      ) : (
        <SubscriptionDetails />
      )}
    </>
  );
}
