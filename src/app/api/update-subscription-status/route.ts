// import { axiosInstance } from "@/remoteData/mutateData";
import { SubscribedUser } from "@/types/globals";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import axios from "axios";

export const { POST } = serve(async (context) => {
  // Fetch database users
  const dbResponse = await context.call(
    "Get Subscribed Users from BTS DataBase",
    {
      url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
      method: "GET",
    },
  );
  const databaseUsers = Array.isArray(dbResponse.body)
    ? (dbResponse.body as SubscribedUserProp[]).map((user) => ({
        id: user.id,
        email: user.email,
        status: user.status,
        subscriptionPlan: user.subscriptionPlan,
        career: user.career,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        attachmentName: user.attachmentName,
        imageUrl: user.imageUrl,
        file: user.file,
        isActive: user.isActive,
        isDeleted: user.isDeleted,
      }))
    : [];

  const paystackUsers = await context.run("Fetch Paystack Users", async () => {
    const paystackResponse = await axios.get(
      `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
      { timeout: 15000 },
    );
    const paystackData = paystackResponse.data?.data;
    return Array.isArray(paystackData)
      ? (paystackData as SubscribedUser[]).map((u) => ({
          email: u.customer.email,
          status: u.status,
        }))
      : [];
  });

  // Find matches
  const usersToUpdate = paystackUsers.flatMap((paystackUser) => {
    const matched = databaseUsers.find(
      (databaseUser) => databaseUser.email == paystackUser.email,
    );
    return matched ? [{ ...matched, status: paystackUser.status }] : [];
  });

  // Batch process updates
  // if(usersToUpdate.length===0) return
  if (usersToUpdate.length > 0) {
    const batchSize = 10;

    for (let i = 0; i < usersToUpdate.length; i += batchSize) {
      const batchIndex = Math.floor(i / batchSize);
      const batch = usersToUpdate.slice(i, i + batchSize);

      await context.run(`Process update batch ${batchIndex}`, async () => {
        await Promise.all(
          batch.map(async (userToUpdate) => {
            try {
              await context.call(`Updating user - ${userToUpdate.email}`, {
                url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUser?id=${userToUpdate.id}`,
                method: "PUT",
                body: {
                  ...userToUpdate,
                  career:
                    typeof userToUpdate.career === "string"
                      ? parseInt(userToUpdate.career, 10)
                      : userToUpdate.career,
                },
                headers: { "Content-Type": "application/json" },
              });
            } catch (error) {
              console.error(
                `Failed to update user record - ${userToUpdate.email}`,
                error,
              );
            }
          }),
        );
      });
      if (i + batchSize < usersToUpdate.length) {
        await context.sleep(`Pause-batch-${batchIndex}`, 1);
      }
    }
  }
});
