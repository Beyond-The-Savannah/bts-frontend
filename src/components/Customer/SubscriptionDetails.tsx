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
  // console.log("SUB DETAILS:", userSubscriptionInformation);

  const whatsAppSubscriptionDetails = userSubscriptionInformation?.filter(
    (subscription) =>
      subscription.amount == 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      )
  )[0];
  // console.log("WHATSAPP SUB", whatsAppSubscriptionDetails)

  const jobsListingSubscriptionDetails = userSubscriptionInformation?.filter(
    (subscription) =>
      subscription.amount != 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      )
  )[0];
  // console.log("JOBSLISTING SUB", jobsListingSubscriptionDetails)

  let dateValue;
  if (
    jobsListingSubscriptionDetails?.next_payment_date != null ||
    jobsListingSubscriptionDetails?.next_payment_date != undefined
  ) {
    dateValue = new Date(jobsListingSubscriptionDetails.next_payment_date);
  }

  let convertedNextSubscriptionDate2;
  if (dateValue instanceof Date) {
    const dateFormat = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });
    convertedNextSubscriptionDate2 = dateFormat.format(dateValue);
  } else {
    convertedNextSubscriptionDate2 = "No information available";
  }

  // const date = new Date(jobsListingSubscriptionDetails?.next_payment_date ?? "");
  // const dateFormat = new Intl.DateTimeFormat("en-US", {dateStyle: "full",timeStyle: "short",});
  // const convertedNextSubscriptionDate = dateFormat.format(date);

  async function handleManageSubscription(formData: FormData) {
    "use server";
    const subscriptionCode = formData.get("subscriptionCode");
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
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2"></p>
          <div className="min-h-[70vh] mt-10 md:mt-20">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
            <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
              {/* jobs listings subscription details */}
              {/* {jobsListingSubscriptionDetails != undefined ? ( */}
              <div className="flex flex-wrap justify-between space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1 ">
                <div className="space-y-4">
                  <p className="font-semibold text-xl">
                    Jobs Listings Subscription details
                  </p>
                  <p className="flex  flex-col">
                    <span className="text-xs">
                      Subscription Email Address:{" "}
                    </span>
                    <span className="text-sm lg:text-base font-semibold ml-1">
                      {jobsListingSubscriptionDetails?.customer.email ??
                        user?.emailAddresses[0].emailAddress}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Current Subscription Plan: </span>
                    <span className="font-semibold ml-1">
                      {jobsListingSubscriptionDetails?.plan.name ??
                        "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Current Subscription Status:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {jobsListingSubscriptionDetails?.status ??
                        "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Next Subscription Payment Date:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {/* {convertedNextSubscriptionDate} */}
                      {convertedNextSubscriptionDate2}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Subscription Card Number: </span>
                    <span className="font-semibold ml-1">
                      XXXX XXXX{" "}
                      {jobsListingSubscriptionDetails?.authorization.last4 ??
                        "No information available"}
                    </span>
                  </p>
                </div>
                {jobsListingSubscriptionDetails != undefined ? (
                  <div className="px-1 md:px-8 py-4 rounded-lg bg-bts-BrownFour/5 border space-y-4">
                    {jobsListingSubscriptionDetails?.status ==
                    "non-renewing" ? (
                      <>
                        <div className="border-l-[1.5rem] border-yellow-400 rounded-l bg-yellow-100 px-4 py-2 max-w-4xl mr-auto  flex gap-2 items-center">
                          <CircleAlert />
                          <p className="text-xs">
                            Your subscription status means that can your enjoy
                            the stated subscription plan services up to the Next
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
                      <form action={handleManageSubscription}>
                        <input
                          type="hidden"
                          name="subscriptionCode"
                          value={
                            jobsListingSubscriptionDetails?.subscription_code
                          }
                        />
                        <Button variant="outline" size="sm" type="submit">
                          Manage your Jobs listings Subscription
                        </Button>
                      </form>
                    </div>
                  </div>
                ) : null}
              </div>
              {/* ) : null} */}

              {/* whatsapp subscription details  */}
              {whatsAppSubscriptionDetails != undefined ? (
                <div className="flex flex-wrap justify-between space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1">
                  <div className="space-y-4">
                    <p className="font-semibold text-xl">
                      Whatsapp Subscription details
                    </p>
                    <p className="flex  flex-col">
                      <span className="text-xs">
                        Subscription Email Address:{" "}
                      </span>
                      <span className="text-sm lg:text-base font-semibold ml-1">
                        {whatsAppSubscriptionDetails?.customer.email ??
                          user?.emailAddresses[0].emailAddress}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Plan:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscriptionDetails?.plan.name ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Status:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscriptionDetails?.status ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Next Subscription Payment Date:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {/* {convertedNextSubscriptionDate} */}
                        {convertedNextSubscriptionDate2}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Subscription Card Number:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        XXXX XXXX{" "}
                        {whatsAppSubscriptionDetails?.authorization.last4 ??
                          "No information available"}
                      </span>
                    </p>
                  </div>
                  {whatsAppSubscriptionDetails != undefined ? (
                    <div className="px-8 py-4 rounded-lg bg-bts-BrownFour/5 border space-y-4">
                      {/* <p className="font-semibold text-xl px-9">Subscription guide</p> */}
                      {whatsAppSubscriptionDetails?.status == "non-renewing" ? (
                        <>
                          <div className="border-l-[1.5rem] border-yellow-400 rounded-l bg-yellow-100 px-4 py-2 max-w-4xl mr-auto  flex gap-2 items-center">
                            <CircleAlert />
                            <p className="text-xs">
                              Your subscription status means that can your enjoy
                              the stated subscription plan services up to the
                              Next Subscription Payment Date timeline.
                            </p>
                          </div>
                        </>
                      ) : null}

                      <div className="border-l-[1.5rem] border-blue-400 bg-blue-100 px-4 py-2 rounded-l text-xs">
                        <p>
                          To change your card details you can use the Manage
                          your Subscription button
                        </p>
                      </div>
                      <div className="border-l-[1.5rem] border-red-400 bg-red-100 px-4 py-2 rounded-l text-xs">
                        <p>
                          To cancel your subscription can use the Manage your
                          Subscription button
                        </p>
                      </div>
                      <div className="">
                        <form action={handleManageSubscription}>
                          <input
                            type="hidden"
                            name="subscriptionCode"
                            value={
                              whatsAppSubscriptionDetails?.subscription_code
                            }
                          />
                          <Button variant="outline" size="sm" type="submit">
                            Manage your whatsapp Subscription
                          </Button>
                        </form>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {jobsListingSubscriptionDetails?.plan.amount !== 600000 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <CareerSelection
                  emailAddress={
                    jobsListingSubscriptionDetails?.customer.email as string
                  }
                />
                <ResumeUpload />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
