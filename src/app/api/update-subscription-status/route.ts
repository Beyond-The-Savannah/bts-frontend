// import { axiosInstance } from "@/remoteData/mutateData";
import { SubscribedUser } from "@/types/globals";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import axios from "axios";

export const { POST } = serve(async (context) => {
  // // Step 1a: Fetch DB users (separate, checkpointed step)
  // const databaseUsers = await context.run("Fetch DB Users", async () => {
  //   // const dbResponse = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
  //   const dbResponse = await axiosInstance.get(`/api/BydUsers/getAllUsers`,
  //     { timeout: 15000 } // explicit timeout
  //   );
  //   return Array.isArray(dbResponse.data)
  //     ? (dbResponse.data as SubscribedUserProp[]).map((u) => ({
  //         id: u.id,
  //         email: u.email,
  //         status: u.status,
  //         subscriptionPlan: u.subscriptionPlan,
  //         career: u.career,
  //         password: u.password,
  //         firstName: u.firstName,
  //         lastName: u.lastName,
  //         phoneNumber: u.phoneNumber,
  //         attachmentName: u.attachmentName,
  //         imageUrl: u.imageUrl,
  //         file:u.file,
  //         isActive: u.isActive,
  //         isDeleted: u.isDeleted,
  //       }))
  //     : [];
  // });

  // // Step 1b: Fetch Paystack users (separate, checkpointed step)
  // const paystackUsers = await context.run("Fetch Paystack Users", async () => {
  //   const paystackResponse = await axios.get(`${process.env.PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`,
  //     { timeout: 15000 }
  //   );
  //   const paystackData = paystackResponse.data?.data;
  //   return Array.isArray(paystackData)
  //     ? (paystackData as SubscribedUser[]).map((u) => ({
  //         email: u.customer.email,
  //         status: u.status,
  //       }))
  //     : [];
  // });

  // // Step 1c: Match in memory (fast, no I/O — fine in one step)
  // const usersToUpdate = await context.run("Match Users", async () => {
  //   const dbByEmail = new Map(databaseUsers.map((u) => [u.email, u]));

  //   return paystackUsers.map((paystackUser) => {
  //     const dbUser = dbByEmail.get(paystackUser.email);
  //       // Merge Paystack status into the DB user record
  //       return dbUser ? { ...dbUser, status: paystackUser.status } : null;
  //     })
  //     .filter((u): u is NonNullable<typeof u> => u !== null); // ✅ drop nulls
  // });

  // // Step 2: Batch process updates
  // if (usersToUpdate.length > 0) {
  //   const batchSize = 50;

  //   for (let i = 0; i < usersToUpdate.length; i += batchSize) {
  //     const batchIndex = Math.floor(i / batchSize);
  //     const batch = usersToUpdate.slice(i, i + batchSize);

  //     await context.run(`Process update batch ${batchIndex}`, async () => {
  //       await Promise.all(
  //         batch.map(async (userToUpdate) => {
  //           try {
  //               const newUserData= {
  //                 "id": userToUpdate.id,
  //                 "status": userToUpdate.status,
  //                 "subscriptionPlan": userToUpdate.subscriptionPlan,
  //                 "career": userToUpdate.career,
  //                 "email": userToUpdate.email,
  //                 "password": userToUpdate.password,
  //                 "firstName": userToUpdate.firstName,
  //                 "lastName": userToUpdate.lastName,
  //                 "phoneNumber": userToUpdate.phoneNumber,
  //                 "attachmentName": userToUpdate.attachmentName,
  //                 "file": userToUpdate.file,
  //                 "imageUrl": userToUpdate.imageUrl,
  //                 "isActive": userToUpdate.isActive,
  //                 "isDeleted": userToUpdate.isDeleted
  //               }
  //             const response = await axiosInstance.put(`/api/BydUsers/updateUser?id=${userToUpdate.id}`,
  //               newUserData,
  //               {headers:{"Content-Type":"application/json"}}
  //             );
  //             console.log("Updated user", {
  //               email: userToUpdate.email,
  //               status: response.status,
  //             });
  //           } catch (error) {
  //             console.error(`Failed to update user - ${userToUpdate.email}`, error);
  //           }
  //         })
  //       );
  //     });

  //     if (i + batchSize < usersToUpdate.length) {
  //       await context.sleep(`Pause-batch-${batchIndex}`, 1);
  //     }
  //   }
  // }

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
      `${process.env.PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`,
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
                      ? parseInt(userToUpdate.career,10)
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
