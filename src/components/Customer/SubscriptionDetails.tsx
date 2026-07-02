import { currentUser } from "@clerk/nextjs/server";
// import { Button } from "@/components/ui/button";
// import { redirect } from "next/navigation";
// import CareerSelection from "./CareerSelection";
// import { GetUserSubscriptionInformation } from "./UserSubscriptionInformation";
// import { CircleAlert } from "lucide-react";
// import ResumeUpload from "./ResumeUpload";
import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "./UserSubscriptionInformation";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import PackageOptionSection from "./PackageOptionSection";
import SubscriptionDetailsUI1 from "./SubscriptionDetailsUI1";
import SubscriptionDetailsUI2 from "./SubscriptionDetailsUII2";
// import { GetSelectedCareerEmailNotification, GetSubscriptionDetails, GetUploadedResume } from "@/db/queries/viewJobsSubscriptionQuries";
import { Suspense } from "react";
import PackagesLoader from "../Loaders/PackagesLoader";
import DashboardPageLoader from "../Loaders/DashboardPageLoader";
import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
import { selectedCareerResult, subscriptionResult, uploadedResumeResult } from "@/app/dal/subscriptions";

// const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

export default async function SubscriptionDetails() {
  const user = await currentUser();


  const allowByPassUser = byPassEmailAddresses.includes(
    user?.emailAddresses[0].emailAddress as string,
  );

  //get the subscription info for the subscription workflow one
  const userSubscriptionInformation: subscriptionDetailsProps[] | null =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();

    //get the whatsapp subscription info for the subscription workflow one
  const whatsAppSubscriptionDetails1 = userSubscriptionInformation?.find(
    (subscription) =>
      subscription.amount == 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase(),
      ),
  );

  const jobsListingSubscriptionDetails1 = userSubscriptionInformation?.find(
    (subscription) =>
      subscription.amount != 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase(),
      ),
  );

//get the subscription info for the subscription workflow two
  const subscriptionData=await subscriptionResult(user?.primaryEmailAddress?.emailAddress as string)
  const subscriptionDataDetails2= subscriptionData.find((details)=>details.planStatus==="active")
  
  const selectedCareerEmailData=await selectedCareerResult(user?.primaryEmailAddress?.emailAddress as string)
  const uploadedResumeData=await uploadedResumeResult(user?.primaryEmailAddress?.emailAddress as string)

  // //get the career number for email notificatons for a user
  // const selectedCareerData=await GetSelectedCareerEmailNotification(user?.primaryEmailAddress?.emailAddress as string)
  
  // //get the resumeData a user
  // const resumeData=await GetUploadedResume(user?.primaryEmailAddress?.emailAddress as string)
  
  // //get the subscription info for the subscription workflow two
  // const subscriptionResult =await GetSubscriptionDetails(user?.primaryEmailAddress?.emailAddress as string)
  // const subscriptionDataDetails2=subscriptionResult.find((details) => details.planStatus === "active");

  // let dateValue;
  // if (
  //   jobsListingSubscriptionDetails1?.next_payment_date != null ||
  //   jobsListingSubscriptionDetails1?.next_payment_date != undefined
  // ) {
  //   dateValue = new Date(jobsListingSubscriptionDetails1.next_payment_date);
  // } 
  // // else if(subscriptionDataDetails2?.endDate !=null || subscriptionDataDetails2?.endDate!=undefined) {
  // //   dateValue = new Date(subscriptionDataDetails2?.endDate ?? "");
  // // }

  // let convertedNextSubscriptionDate2;
  // if (dateValue instanceof Date) {
  //   const dateFormat = new Intl.DateTimeFormat("en-US", {
  //     dateStyle: "full",
  //     timeStyle: "short",
  //   });
  //   convertedNextSubscriptionDate2 = dateFormat.format(dateValue);
  // } 
  // else {
  //   convertedNextSubscriptionDate2 = "No information available";
  // }

  // const subscriptionData2 = {
  //   ...subscriptionDataDetails2,
  //   firstName: user?.firstName ?? "There",
  //   endDate: convertedNextSubscriptionDate2,
  // };

  // console.log("SUB DATATWO -> ",subscriptionData2)
  // console.log("SUB RESULT -> ",subscriptionResult)
  // console.log("USER EMAIL -> ",user?.primaryEmailAddress?.emailAddress)

  // async function handleManageSubscription(formData: FormData) {
  //   "use server";
  //   const subscriptionCode = formData.get("subscriptionCode");
  //   let paystackManageUrl = "";
  //   try {
  //     const response = await fetch(
  //       `${PUBLIC_BASE_URL}/api/manage-subscriptions?code=${subscriptionCode}`,
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const responseUrl = await response.json();
  //     paystackManageUrl = responseUrl;
  //   } catch (error) {
  //     console.error("Error managing subscription:", error);
  //   }
  //   if (paystackManageUrl != "") {
  //     redirect(paystackManageUrl);
  //   }
  // }

  return (
    <>
      {jobsListingSubscriptionDetails1 !== undefined ? (
        <Suspense fallback={<DashboardPageLoader />}>
          <SubscriptionDetailsUI1
            jobViewSubscriptionData={jobsListingSubscriptionDetails1}
            whatsAppSubscribtionData={whatsAppSubscriptionDetails1}
            />
        </Suspense>
      ) : subscriptionDataDetails2 !== undefined || allowByPassUser == true ? (
        <Suspense fallback={<DashboardPageLoader />}>
          <SubscriptionDetailsUI2
            jobViewSubscriptionData={subscriptionDataDetails2}
            whatsAppSubscribtionData={whatsAppSubscriptionDetails1}
            careerEmailNotification={selectedCareerEmailData[0]?.careerEmailNotification }
            emailNotification={selectedCareerEmailData[0]?.acceptEmailNotification }
            resumeUploaded={uploadedResumeData[0]}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<PackagesLoader />}>
          <PackageOptionSection />
        </Suspense>
      )}

      {/* <section className="pt-4 pb-20">
        <div className="w-full mx-auto px-4">
          <h2 className="text-xl">Hi {user?.firstName ?? "There"}</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2"></p>
          <div className="min-h-[70vh] mt-10 md:mt-20">
            
            
            <div className="flex-col gap-8">
              
              <div className="flex flex-wrap justify-between space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1 ">
              {jobsListingSubscriptionDetails1 != undefined ? (<>
                     <div className="space-y-4">
                  <p className="font-semibold text-xl">
                    Jobs Listings Subscription details
                  </p>
                  <p className="flex  flex-col">
                    <span className="text-xs">
                      Subscription Email Address:{" "}
                    </span>
                    <span className="text-sm lg:text-base font-semibold ml-1">
                      {jobsListingSubscriptionDetails1.customer.email}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Current Subscription Plan: </span>
                    <span className="font-semibold ml-1">
                      {jobsListingSubscriptionDetails1.plan.name}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Current Subscription Status:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {jobsListingSubscriptionDetails1.status}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Next Subscription Payment Date:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {convertedNextSubscriptionDate2}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Subscription Card Number: </span>
                    
                <span className="font-semibold ml-1">
                      XXXX XXXX{" "}
                      {jobsListingSubscriptionDetails1.authorization.last4}
                    </span>
                    
                   
                  </p>
                </div></>):(<><PackageOptionSection/></>)}
         
                {jobsListingSubscriptionDetails1 != undefined ? (
                  <div className="px-1 md:px-8 py-4 rounded-lg bg-bts-BrownFour/5 border space-y-4">
                    {jobsListingSubscriptionDetails1?.status ==
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
                            jobsListingSubscriptionDetails1?.subscription_code
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
              

              
              {whatsAppSubscriptionDetails1 != undefined ? (
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
                        {whatsAppSubscriptionDetails1?.customer.email ??
                          user?.emailAddresses[0].emailAddress}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Plan:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscriptionDetails1?.plan.name ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Status:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscriptionDetails1?.status ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Next Subscription Payment Date:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        
                        {whatsAppSubscriptionDetails1.next_payment_date}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Subscription Card Number:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        XXXX XXXX{" "}
                        {whatsAppSubscriptionDetails1?.authorization.last4 ??
                          "No information available"}
                      </span>
                    </p>
                  </div>
                  {whatsAppSubscriptionDetails1 != undefined ? (
                    <div className="px-8 py-4 rounded-lg bg-bts-BrownFour/5 border space-y-4">
                      
                      {whatsAppSubscriptionDetails1?.status == "non-renewing" ? (
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
                              whatsAppSubscriptionDetails1?.subscription_code
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
            {jobsListingSubscriptionDetails1?.plan.amount !== 600000 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <CareerSelection
                  emailAddress={
                    jobsListingSubscriptionDetails1?.customer.email as string
                  }
                />
                <ResumeUpload />
              </div>
            ) : null}
          </div>
        </div>
      </section> */}
    </>
  );
}
