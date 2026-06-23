import { subscriptionDetailsProps } from "@/types/subscriptions";
import { CircleAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import CareerSelection from "./CareerSelection";
import ResumeUpload2 from "./ResumeUpload";


const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

export default function SubscriptionDetailsUI1({jobViewSubscriptionData,whatsAppSubscribtionData}:{   jobViewSubscriptionData?:subscriptionDetailsProps
 whatsAppSubscribtionData?:subscriptionDetailsProps
}) {

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
          <h2 className="text-xl">Hi {jobViewSubscriptionData?.customer.first_name?? "There"}</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2"></p>
          <div className="min-h-[70vh] mt-10 md:mt-20">
            
            {/* <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8"> */}
            <div className="flex-col gap-8">
              
              <div className="flex flex-wrap justify-between space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1 ">
              {/* {jobsListingSubscriptionDetails1 != undefined ? ( */}
                     <div className="space-y-4">
                  <p className="font-semibold text-xl">
                    Jobs Listings Subscription details
                  </p>
                  <p className="flex  flex-col">
                    <span className="text-xs">
                      Subscription Email Address:{" "}
                    </span>
                    <span className="text-sm lg:text-base font-semibold ml-1">
                      {jobViewSubscriptionData?.customer.email ??"No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Current Subscription Plan: </span>
                    <span className="font-semibold ml-1">
                      {jobViewSubscriptionData?.plan.name ?? "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Current Subscription Status:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {jobViewSubscriptionData?.status ?? "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Next Subscription Payment Date:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {jobViewSubscriptionData?.next_payment_date ?? "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Subscription Source Number: </span>
                    
                <span className="font-semibold ml-1">
                      XXXX XXXX{" "}
                      {jobViewSubscriptionData?.authorization.last4 ??""}
                    </span>
                    
                   
                  </p>
                </div>
                {/* </>):(<><PackageOptionSection/></>)} */}
         
                {jobViewSubscriptionData != undefined ? (
                  <div className="px-1 md:px-8 py-4 rounded-lg bg-bts-BrownFour/5 border space-y-4">
                    {jobViewSubscriptionData?.status ==
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
                            jobViewSubscriptionData?.subscription_code
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
              

              {/* whatsapp subscription details  */}
              {whatsAppSubscribtionData != undefined ? (
                <div className="flex flex-wrap justify-between space-y-4 mt-10 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1">
                  <div className="space-y-4">
                    <p className="font-semibold text-xl">
                      Whatsapp Subscription details
                    </p>
                    <p className="flex  flex-col">
                      <span className="text-xs">
                        Subscription Email Address:{" "}
                      </span>
                      <span className="text-sm lg:text-base font-semibold ml-1">
                        {whatsAppSubscribtionData?.customer.email ??"No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Plan:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscribtionData?.plan.name ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Status:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscribtionData?.status ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Next Subscription Payment Date:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        
                        {whatsAppSubscribtionData?.next_payment_date ??"No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Subscription Source Number:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        XXXX XXXX{" "}
                        {whatsAppSubscribtionData?.authorization.last4 ??
                          ""}
                      </span>
                    </p>
                  </div>
                  {whatsAppSubscribtionData != undefined ? (
                    <div className="px-8 py-4 rounded-lg bg-bts-BrownFour/5 border space-y-4">
                      
                      {whatsAppSubscribtionData?.status == "non-renewing" ? (
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
                              whatsAppSubscribtionData?.subscription_code
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
            {jobViewSubscriptionData?.plan.amount !== 600000 && jobViewSubscriptionData!==undefined ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <CareerSelection
                  emailAddress={
                    jobViewSubscriptionData?.customer.email as string
                  }
                />
                <ResumeUpload2 />
              </div>
            ) : null}
          </div>
        </div>
        
      </section>
    </>
  )
}
