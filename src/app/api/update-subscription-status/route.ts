import { axiosInstance } from "@/remoteData/mutateData";

import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import axios from "axios";

export const { POST } = serve(async (context) => {
  // Fetch database users
  const dataBaseUsers = await context.run(
    "Get Subscribed Uses from BTS DataBase",
    async () => {
      const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
      //   const dataBaseUserList: Pick<SubscribedUserProp,"email" | "status" | "subscriptionPlan"> = response.data;
      const dataBaseUserList: Array<
        Pick<SubscribedUserProp, "email" | "status" | "subscriptionPlan">
      > = response.data;
      return dataBaseUserList;
    },
  );

  // Fetch Paystack users
  const paystackUsers = await context.run(
    "Get all Paystack Subscribed Users from Paystack",
    async () => {
      const response = await axios.get(
        `${process.env.PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`,
      );
      // const paystackUsersList:Pick<SubscribedUser,"status"|"customer.email">=response.data
      const paystackUsersList: Array<{
        status: string;
        customer: { email: string };
      }> = response.data;
      return paystackUsersList;
    },
  );

  // Find matches
  // const usersToUpdate=[]
  // for(const paystackUser of paystackUsers){
  //   const mactchedDatabaseUser=dataBaseUsers.find((dataBaseUser)=>{return dataBaseUser.email==paystackUser.customer.email})
  //   if(mactchedDatabaseUser){
  //     usersToUpdate.push({email:mactchedDatabaseUser.email,status:mactchedDatabaseUser.status,})
  //   }
  // }

  const usersToUpdate = paystackUsers.flatMap((paystackUser) => {
    const matched = dataBaseUsers.find(
      (dataBaseuser) => dataBaseuser.email === paystackUser.customer.email,
    );
    return matched ? [{ ...matched, status: paystackUser.status }] : [];
  });

  // Batch process updates
  const batchSize = 50;

  for (let i = 0; i <= usersToUpdate.length; i += batchSize) {
    const batchIndex = Math.floor(i / batchSize);
    const batch = usersToUpdate.slice(i, i + batchSize);

    await context.run(`Process update batch ${batchIndex}`, async () => {
      await Promise.all(
        batch.map(async (userToUpdate) => {
          try {
            const response = await axios.put(
              `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${userToUpdate.email}`,
              {status:userToUpdate.status},
              {
                headers: { "Content-Type": "application/json" },
                timeout: 10000,
              },
            );
            console.log("Updated user record", {
              email: userToUpdate.email,
              status: response.status,
              statusText: response.statusText,
            });
          } catch (error) {
            console.log(
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

  // paystackUsers.forEach(async (paystackUser) => {
  //   const matchedDataBaseUser = dataBaseUsers.find((dataBaseUser) => {
  //     return dataBaseUser.email == paystackUser.customer.email;
  //   });
  //   if (!matchedDataBaseUser)
  //     return "No matched user found between paystackSubscribedUsers and BTSDataBaseUsers";
  //   try {
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${matchedDataBaseUser.email}`,
  //       { ...matchedDataBaseUser, status: matchedDataBaseUser.status },
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //         timeout: 10000,
  //       },
  //     );
  //     console.log("Update user record", {
  //       responseStatus: response.status,
  //       responseStatusText: response.statusText,
  //     });
  //     return {
  //       responseStatus: response.status,
  //       responseStatusText: response.statusText,
  //     };
  //   } catch (error) {
  //     console.error("Failed to Update User subscription Status in DB", error);
  //   }
  // });

  // const updateSubscriptionStatusPromises = paystackUsers.map(
  //   async (paystackUser) => {
  //     const matchedDataBaseUser = dataBaseUsers.find(
  //       (dataUser) => {
  //         return dataUser.email == paystackUser.customer.email;
  //       },
  //     );

  //     if (!matchedDataBaseUser)
  //       return "No matched user found between paystackSubscribedUsers and BTSDataBaseUsers";

  //     try {
  //       const response = await axios.put(
  //         `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${matchedDataBaseUser.email}`,
  //         { ...matchedDataBaseUser, status: matchedDataBaseUser.status },
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //           timeout: 10000,
  //         },
  //       );
  //       return response;
  //     } catch (error) {
  //       console.error("Failed to Update User subscription Status in DB", error);
  //     }
  //   },
  // );

  // await Promise.all(updateSubscriptionStatusPromises);
});
