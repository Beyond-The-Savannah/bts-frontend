import {
  GetSelectedCareerEmailNotification,
  GetSubscriptionDetails,
  GetSubscriptionInformation,
  GetUploadedResume,
} from "@/db/queries/viewJobsSubscriptionQuries";
import { cache } from "react";

//get the subscription info for the subscription workflow two
export const subscriptionResult = cache(async (userEmail: string) => {
  return await GetSubscriptionDetails(userEmail);
});

export const selectedCareerResult = cache(async (userEmail: string) => {
  return await GetSelectedCareerEmailNotification(userEmail);
});

export const uploadedResumeResult = cache(async (userEmail: string) => {
  return await GetUploadedResume(userEmail);
});

export const usersSubscriptionInformation = cache(async () => {
  return await GetSubscriptionInformation();
});
