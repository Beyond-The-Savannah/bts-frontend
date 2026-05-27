import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
// import { SubscribedUser } from "@/types/globals";

export const dynamic = "force-dynamic";

const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;
// const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
// const NEXT_PUBLIC_DB_BASE_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export default async function Page() {
  // Only fetch the users - sync happens separately
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const users: SubscribedUserProp[] = await response.data;

  // const dataBaseUsers = users;
  // const response1 = await axios.get(
  //   `${PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`,
  // );
  // const paystackUsers: SubscribedUser[] = await response1.data.data;


  // updateUserSubscriptionStatusinDataBase(dataBaseUsers, paystackUsers);

  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-3xl font-semibold">Subscribed Users</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>

        <div className="container mx-auto px-4 py-10">
          <DataTable data={users} columns={columns} />
        </div>
      </section>
    </>
  );
}

// async function updateUserSubscriptionStatusinDataBase(
//   dataBaseUsers: SubscribedUserProp[],
//   paystackUsers: SubscribedUser[],
// ) {
//   const updateSubscriptionStatusPromises = paystackUsers.map(
//     async (paystackUser) => {
//       const matchedDataBaseUser = dataBaseUsers.find((dataUser) => {
//         return dataUser.email == paystackUser.customer.email;
//       });

//       if (!matchedDataBaseUser) return "No matched user found between paystackSubscribedUsers and BTSDataBaseUsers";

//       try {
//         const response = await axios.put(
//           `${NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${matchedDataBaseUser.email}`,
//           { ...matchedDataBaseUser, status: matchedDataBaseUser.status },
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//             timeout: 10000,
//           },
//         );
//         return response;
//       } catch (error) {
//         console.error("Failed to Update User subscription Status in DB", error);
//       }
//     },
//   );

//    await Promise.all(updateSubscriptionStatusPromises);

// }
