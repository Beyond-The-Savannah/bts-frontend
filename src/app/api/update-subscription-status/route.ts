
import { axiosInstance } from "@/remoteData/mutateData";

import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
import axios from "axios";



export const { POST } = serve(async (context) => {
  const dataBaseUsers = await context.run( "Get Subscribed Uses from BTS DataBase",
    async () => {
      const response = await axiosInstance.get("/api/BydUsers/getAllUsers");
    //   const dataBaseUserList: Pick<SubscribedUserProp,"email" | "status" | "subscriptionPlan"> = response.data;
    const dataBaseUserList: Array<Pick<SubscribedUserProp, "email" | "status" | "subscriptionPlan">> = response.data;
      return dataBaseUserList;
    },
  );

  const paystackUsers = await context.run("Get all Paystack Subscribed Users from Paystack",
    async () => {
      const response = await axios.get(
        `${process.env.PUBLIC_BASE_URL}/api/BydUsers/getAllUsers`,
      );
      // const paystackUsersList:Pick<SubscribedUser,"status"|"customer.email">=response.data
      const paystackUsersList: Array<{status: string;customer: { email: string };}> = response.data;
      return paystackUsersList;
    },
  );

  const updateSubscriptionStatusPromises = paystackUsers.map(
    async (paystackUser) => {
      const matchedDataBaseUser = dataBaseUsers.find(
        (dataUser) => {
          return dataUser.email == paystackUser.customer.email;
        },
      );

      if (!matchedDataBaseUser)
        return "No matched user found between paystackSubscribedUsers and BTSDataBaseUsers";

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${matchedDataBaseUser.email}`,
          { ...matchedDataBaseUser, status: matchedDataBaseUser.status },
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000,
          },
        );
        return response;
      } catch (error) {
        console.error("Failed to Update User subscription Status in DB", error);
      }
    },
  );

  await Promise.all(updateSubscriptionStatusPromises);
});
