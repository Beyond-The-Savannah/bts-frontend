import { currentUser } from "@clerk/nextjs/server";
import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "../../app/dal/UserSubscriptionInformation";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import PackageOptionSection from "./PackageOptionSection";
import SubscriptionDetailsUI1 from "./SubscriptionDetailsUI1";
import SubscriptionDetailsUI2 from "./SubscriptionDetailsUII2";

import { Suspense } from "react";
import PackagesLoader from "../Loaders/PackagesLoader";

import { byPassEmailAddresses } from "@/staticData/Customer/byPassSubscriptionCheck";
import {
  selectedCareerResult,
  subscriptionResult,
  uploadedResumeResult,
} from "@/app/dal/subscriptions";
import CustomerSubscriptionLoader from "../Loaders/CustomerSubscriptionLoader";

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
  const subscriptionData = await subscriptionResult(
    user?.primaryEmailAddress?.emailAddress as string,
  );
  const subscriptionDataDetails2 = subscriptionData.find(
    (details) => details.planStatus === "active",
  );

  const selectedCareerEmailData = await selectedCareerResult(
    user?.primaryEmailAddress?.emailAddress as string,
  );
  const uploadedResumeData = await uploadedResumeResult(
    user?.primaryEmailAddress?.emailAddress as string,
  );

  return (
    <>
      {jobsListingSubscriptionDetails1 !== undefined ? (
        <Suspense fallback={<CustomerSubscriptionLoader />}>
          <SubscriptionDetailsUI1
            jobViewSubscriptionData={jobsListingSubscriptionDetails1}
            whatsAppSubscribtionData={whatsAppSubscriptionDetails1}
          />
        </Suspense>
      ) : subscriptionDataDetails2 !== undefined || allowByPassUser == true ? (
        <Suspense fallback={<CustomerSubscriptionLoader />}>
          <SubscriptionDetailsUI2
            jobViewSubscriptionData={subscriptionDataDetails2}
            whatsAppSubscribtionData={whatsAppSubscriptionDetails1}
            careerEmailNotification={
              selectedCareerEmailData[0]?.careerEmailNotification
            }
            emailNotification={
              selectedCareerEmailData[0]?.acceptEmailNotification
            }
            resumeUploaded={uploadedResumeData[0]}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<PackagesLoader />}>
          <PackageOptionSection />
        </Suspense>
      )}
    </>
  );
}
