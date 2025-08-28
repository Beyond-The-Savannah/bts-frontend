export const dynamic = "force-dynamic";

import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import WhatsappSubscriptionService from "@/components/Customer/WhatsappSubscriptionService";
import { currentUser } from "@clerk/nextjs/server";

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function page(props: { searchParams: SearchParams }) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress as string;
  const searcHParams = await props.searchParams;

  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const whatsAppSubscriptionDetails=userSubscriptionInformation?.filter((subscription)=>subscription.amount==600000 && ["active","attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))[0]

  return (
    <>
      {searcHParams.source == "whatsapp-service" ? (
        <>
          <div className=" w-full lg:w-full mx-auto overflow-y-hidden space-y-6  ">
            <div className="text-center space-y-6">
              <p className="text-2xl md:text-3xl font-semibold">
                Beyond the Savannah WhatsApp Community{" "}
              </p>
            </div>
            {whatsAppSubscriptionDetails == undefined ||
            whatsAppSubscriptionDetails.status == "cancelled" ||
            whatsAppSubscriptionDetails?.plan.amount != 600000 ? (
              <div className=" space-y-4">
                <p className=" max-w-3xl text-center mb-20 mx-auto">
                  Struggling to navigate the tough job market? You&apos;re not
                  alone. Join our exclusive paid WhatsApp community.  A safe space
                  for job seekers and professionals looking for support,
                  motivation, and expert guidance on securing remote jobs.
                </p>
                <div className="max-w-sm mx-auto">
                <WhatsappSubscriptionService email={userEmail} />
                </div>
              </div>
            ) : (
              // <div className="max-w-4xl mx-auto px-4">
              <div className="container mx-auto px-4">
                <SubscriptionDetails />
                <div className="bg-bts-BrownOne rounded-md px-4 py-8 max-w-xl mx-auto xl:-mt-20">
                  <p className=" text-center text-balance">
                    Please check your Subscription Email Address, for an email
                    containing the whatsapp community link{" "}
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
