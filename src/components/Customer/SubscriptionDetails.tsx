import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CareerSelection from "./CareerSelection";
import { GetUserSubscriptionInformation } from "./UserSubscriptionInformation";
import { CircleAlert } from "lucide-react";
import ResumeUpload from "./ResumeUpload";


const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

export default async function SubscriptionDetails() {
  const user = await currentUser();

  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const subscriptionCode = userSubscriptionInformation?.subscription_code;
  const date = new Date(userSubscriptionInformation?.next_payment_date ?? "");
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const convertedNextSubscriptionDate = dateFormat.format(date);

  if (!subscriptionCode) {
    console.error("Subscription code is not defined.");
    return;
  }
  // console.log("SUB DETAILS:", userSubscriptionInformation);

  async function handleManageSubscription() {
    "use server";
    let paystackManageUrl = "";
    try {
      const response = await fetch(
        `${PUBLIC_BASE_URL}/api/manage-subscriptions?code=${subscriptionCode}`,
        {
          method: "GET",
        }
      );

      const responseUrl = await response.json();
      paystackManageUrl = responseUrl;
    } catch (error) {
      console.error("Error managing subscription:", error);
    }
    if (paystackManageUrl != "") {
      redirect(paystackManageUrl);
    }
  }

  return (
    <>
      <section className="pt-4 pb-20">
        <div className="w-full mx-auto px-4">
          <h2 className="text-xl">Hi {user?.firstName ?? "There"}</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            
          </p>
          <div className="min-h-[70vh] mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full ">
                <p className="font-semibold text-xl">Subscription details</p>
                <p className="flex  flex-col">
                  <span className="text-xs">Subscription Email Address: </span>
                  <span className="text-sm lg:text-base font-semibold ml-1">
                    {userSubscriptionInformation?.customer.email}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">Current Subscription Plan: </span>
                  <span className="font-semibold ml-1">
                    {userSubscriptionInformation?.plan.name}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">Current Subscription Status: </span>
                  <span className="font-semibold ml-1">
                    {userSubscriptionInformation?.status}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">
                    Next Subscription Payment Date:{" "}
                  </span>
                  <span className="font-semibold ml-1">
                    {convertedNextSubscriptionDate}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">Subscription Card Number: </span>
                  <span className="font-semibold ml-1">
                    XXXX XXXX {userSubscriptionInformation?.authorization.last4}
                  </span>
                </p>
              </div>
              <div className="space-y-4 rounded-lg bg-bts-BrownOne/50 pr-6 py-12 w-full ">
                <p className="font-semibold text-xl px-9">Subscription guide</p>
                {userSubscriptionInformation?.status == "non-renewing" ? (
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

                <div className="border-l-[1.5rem] border-blue-400 bg-blue-100 px-4 py-2 rounded-l text-sm">
                  <p>
                    To change your card details you can use the Manage your
                    Subscription button
                  </p>
                </div>
                <div className="border-l-[1.5rem] border-red-400 bg-red-100 px-4 py-2 rounded-l text-sm">
                  <p>
                    To cancel your subscription can use the Manage your
                    Subscription button
                  </p>
                </div>
                <div className="px-8">
                  <form action={handleManageSubscription}>
                    <Button variant="outline" size="sm" type="submit">
                      Manage your Subscription
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            {userSubscriptionInformation.plan.amount !== 600000 ? (
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
              <CareerSelection  emailAddress={userSubscriptionInformation.customer.email}/>
              <ResumeUpload/>
              
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
