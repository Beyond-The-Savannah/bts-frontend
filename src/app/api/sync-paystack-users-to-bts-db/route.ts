
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUser } from "@/types/globals";
import { serve } from "@upstash/workflow/nextjs";


export const { POST } = serve(async (context) => {

  // 1. Fetch the users from db)
  const existingUsers = await context.run("Get existing users from DB", async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
      { timeout: 25000 } 
    );
    const users = Array.isArray(response.data) ? response.data : [];
    return users.map((user: SubscribedUserProp) => ({
      // userId: user.id,
      status: user.status,
      subscriptionPlan:user.subscriptionPlan,
      career:user.career,
      email: user.email.toLowerCase(), 
      password:user.password,
      firstName:user.firstName,
      lastName:user.lastName,
      // phoneNumber:user.phoneNumber,
      // attachmentName:user.attachmentName,
      // file:user.file,
      // imageUrl:user.imageUrl,
      // isActive:user.isActive,
      // isDeleted:user.isDeleted,
    }));
  });

  // 2. Fetch Paystack subscriptions
  const paystackData = await context.run("Get raw subscriptions from paystack", async () => {
    const paystackResponse = await axios.get(
      `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
      { timeout: 25000 }
    );
    const subs = (paystackResponse.data?.data as SubscribedUser[]) || [];

    return subs.map((sub) => ({
      status: sub.status || "",
      planName: sub.plan?.name || "",
      email: sub.customer?.email || "",
      firstName: sub.customer?.first_name || "",
      lastName: sub.customer?.last_name || "",
    }));
  });

  // 3. Get users from db whose status doesn't match paystack status (Replaces Step 3)
  const localUsersMap = new Map(existingUsers.map(u => [u.email, u]));

  const statusMismatches = paystackData
    .filter((sub) => {
      const email = sub.email?.toLowerCase();
      const localUser = localUsersMap.get(email);
      
      // If they exist in DB, but their DB status doesn't match Paystack's status
      return localUser && localUser.status !== sub.status;
    })
    .map((sub) => {
      // Map over the filtered data to attach the correct userId for Step 4
      const email = sub.email?.toLowerCase();
      const localUser = localUsersMap.get(email);
      
      return {
        ...sub,
        // userId: localUser!.userId,
        subscriptionPlan:localUser?.subscriptionPlan,
        career:localUser?.career,
        // password:localUser?.password,
        // phoneNumber:localUser?.phoneNumber,
        // attachmentName:localUser?.attachmentName,
        // file:localUser?.file,
        // imageUrl:localUser?.imageUrl,
        // isActive:localUser?.isActive,
        // isDeleted:localUser?.isDeleted,
      };
    });

  
  // 4. Batch process updates cleanly using PUT requests with multipart/form-data
  if (statusMismatches.length > 0) {
    const batchSize = 10; // Increased batch size slightly since QStash footprint is lower now

    for (let i = 0; i < statusMismatches.length; i += batchSize) {
      const batchIndex = Math.floor(i / batchSize);
      const batch = statusMismatches.slice(i, i + batchSize);

      // Wrap the ENTIRE batch execution inside a single context.run
      await context.run(`process-batch-${batchIndex}`, async () => {
        await Promise.all(
          batch.map(async (userToUpdate) => {
            try {
              const formData = new FormData();
              formData.append("status", userToUpdate.status);
              formData.append("subscriptionPlan", userToUpdate.subscriptionPlan as string);
              formData.append("email", userToUpdate.email);
              formData.append("firstName", userToUpdate.firstName || "");
              formData.append("lastName", userToUpdate.lastName || "");
              
              const careerVal = parseInt(userToUpdate.career as string);
              formData.append("Career", isNaN(careerVal) ? "0" : String(careerVal)); 

              const url = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${encodeURIComponent(userToUpdate.email)}`;

              await axios.put(url, formData);
              
            } catch (error) {
              console.error(`Failed to update user record - ${userToUpdate.email}`, error);
              // Handle error or throw depending on if you want to fail the entire batch
              throw error; 
            }
          })
        );
      });

      // Optional: Sleep to prevent overwhelming your own DB / API
      if (i + batchSize < statusMismatches.length) {
        await context.sleep(`pause-batch-${batchIndex}`, 1);
      }
    }
  }

  
});

