import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import { Button } from "@/components/ui/button";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { CircleAlert, FileWarning } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

export default async function page() {
  const { orgId } = await auth();

  if (!orgId) {
    return (
      <>
        <div className="grid place-content-center min-h-[80dvh] ">
          <div className="px-4 py-8 max-w-xl mx-auto border rounded-md">
            <p className="text-center text-xl">
              <FileWarning className="text-orange-400 mx-auto" />
              No Organisation has be identified
            </p>
            <p className="text-center text-sm mt-4">
              please create one by clicking on the home link on the sidebar or
              the no-organisation seleted on the sidebar
            </p>
          </div>
        </div>
      </>
    );
  }
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId!,
  });

  const employerSubscriptionDetails: subscriptionDetailsProps[] =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  const recentEmployerSubscriptionDetails = employerSubscriptionDetails.find(
    (subscription) =>
      (subscription.amount == 300000 || subscription.amount == 500000) &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase(),
      ),
  );

  // console.log('RECENT EMPLOYER SUB DETAILS',recentEmployerSubscriptionDetails)

  async function handleManageEmployerSubscription(formData: FormData) {
    "use server";
    const subscriptionCode = formData.get("employerSubscriptionCode");
    let paystackManageUrl = "";
    try {
      const response = await fetch(
        `${PUBLIC_BASE_URL}/api/manage-subscriptions?code=${subscriptionCode}`,
        { method: "GET" },
      );
      const responseUrl = await response.json();
      paystackManageUrl = responseUrl.url;
    } catch (error) {
      console.log("Error fetching employermanage subscription URL:", error);
    }
    if (paystackManageUrl != "") {
      console.log("", paystackManageUrl);
      redirect(paystackManageUrl);
    }
  }
  return (
    <>
      <section className="pt-4 pb-20">
        <div className="w-full mx-auto px-4">
          <div className="flex items-center gap-1">
            <Image
              src={organization.imageUrl}
              alt={organization.name}
              width={50}
              height={50}
              className="rounded-lg"
            />
            <h2 className="text-xl">{organization.name}</h2>
          </div>
          <div className="border-2 rounded-md border-bts-BrownThree w-36 mt-2" />
          <div className="flex-col gap-8 mt-10">
            <div className="flex flex-wrap justify-between space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1 ">
              {/* display subscription details */}
              {recentEmployerSubscriptionDetails != undefined ? (
                <>
                  <div className="space-y-4">
                    <p className="font-semibold text-xl">
                      Subscription details
                    </p>
                    <p className="flex  flex-col">
                      <span className="text-xs">
                        Subscription Email Address:{" "}
                      </span>
                      <span className="text-sm lg:text-base font-semibold ml-1">
                        {recentEmployerSubscriptionDetails.customer.email}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Plan:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {recentEmployerSubscriptionDetails.plan.name}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Status:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {recentEmployerSubscriptionDetails.status}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Next Subscription Payment Date:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {recentEmployerSubscriptionDetails.next_payment_date !=
                          null && (
                          <>
                            {new Date(
                              recentEmployerSubscriptionDetails.next_payment_date,
                            ).toLocaleDateString()}
                          </>
                        )}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Subscription Card Number:{" "}
                      </span>

                      <span className="font-semibold ml-1">
                        XXXX XXXX{" "}
                        {recentEmployerSubscriptionDetails.authorization.last4}
                      </span>
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            {/* manage organization subscription  */}
            {recentEmployerSubscriptionDetails != undefined ? (
              <>
                <div className="px-1 md:px-8 py-4 mt-10 rounded-lg bg-bts-BrownFour/5 broder space-y-4">
                  {recentEmployerSubscriptionDetails.status ==
                  "non-renewing" ? (
                    <>
                      <div className="border-l-[1.5rem] border-yellow-400 rounded-l bg-yellow-100 px-4 py-2 max-w-4xl mr-auto  flex gap-2 items-center">
                        <CircleAlert />
                        <p className="text-xs">
                          Your subscription status means that can your enjoy the
                          stated subscription plan services up to the Next
                          Subscription Payment Date timeline.
                        </p>
                      </div>
                    </>
                  ) : null}
                  <div className="border-l-[1.5rem] border-blue-400 bg-blue-100 px-4 py-2 rounded-l text-xs">
                    <p>
                      To change your card details you can use the Manage your
                      Subscription button
                    </p>
                  </div>
                  <div className="border-l-[1.5rem] border-red-400 bg-red-100 px-4 py-2 rounded-l text-xs">
                    <p>
                      To cancel your subscription can use the Manage your
                      Subscription button
                    </p>
                  </div>
                  <div className="">
                    <form action={handleManageEmployerSubscription}>
                      <input
                        type="hidden"
                        name="employerSubscriptionCode"
                        value={
                          recentEmployerSubscriptionDetails.subscription_code
                        }
                      />
                      <Button variant="outline" size="sm" type="submit">
                        Manage your Jobs listings Subscription
                      </Button>
                    </form>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
