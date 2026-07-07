import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { UserMinus2Icon, UserPlus2, Users } from "lucide-react";
// import { SubscribedUser } from "@/types/globals";


export const dynamic = "force-dynamic";

const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;


export default async function Page() {
  
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const users: SubscribedUserProp[] = await response.data;

  const activeSubscriptionsCount = users.filter((user) => user.status === "active").length;
  const canceledSubscriptionsCount = users.filter((user) => user.status === "cancelled").length;
  
  // // filter only the emails of the existing users 
  // // const existingEmails=users.map((user)=>user.email.toLocaleLowerCase(),).filter(Boolean)
  // const existingDBUSers=users.map((user)=>({userId:user.id,emaiL:user.email.toLocaleLowerCase(),status:user.status}))
  // // const existingEmailsSet = new Set(existingEmails);
  
  // //get all subscribers from paystack
  //   const paystackResponse = await axios.get(
  //     `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
  //     { timeout: 25000 }
  //   );
  //   const subs = (paystackResponse.data?.data as SubscribedUser[]).map((sub) => ({
  //     status: sub.status || "",
  //     planName: sub.plan?.name || "",
  //     email: sub.customer?.email || "",
  //     firstName: sub.customer?.first_name || "",
  //     lastName: sub.customer?.last_name || "",
  //   })) || [];



  //   //get users from db who's status doesn't match paystack status
  //   const localUsersMap = new Map(users.map(u => [u.email.toLowerCase(), u]));

  //   const statusMismatches = subs.filter((sub) => {
  //     const email = sub.email?.toLowerCase();
  //     const localUser = localUsersMap.get(email);
      
  //     // If they exist in DB, but their DB status doesn't match Paystack's status
  //     // return localUser && localUser.status !== sub.status;
  //     return localUser && localUser.status !== sub.status;
  //   });

  //   console.log("Users needing status updates:", statusMismatches);

    
  //   console.log("LOCAL MAP USERS=>",localUsersMap)
  //   console.log("DB USERS =>",existingDBUSers)
  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-3xl font-semibold">Subscribed Users</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        <div className="flex flex-wrap justify-end gap-2">
          <div className="flex items-center gap-2 border rounded-md px-4 py-2">
              <Users className="mr-2 text-blue-400" />
            <div className="flex flex-col">
              <p className="text-xs">All Subscriptions:</p>
              <p className="text-lg font-bold">{users.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border rounded-md px-4 py-2">
              <UserPlus2 className="mr-2 text-lime-400" />
            <div className="flex flex-col">
              <p className="text-xs">Active Subscriptions:</p>
              <p className="font-bold">{activeSubscriptionsCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border rounded-md px-4 py-2">
              <UserMinus2Icon className="mr-2 text-rose-400" />
            <div className="flex flex-col">
              <p className="text-xs">Cancelled Subscriptions:</p>
              <p className="font-bold">{canceledSubscriptionsCount}</p>
            </div>
          </div>
          
        </div>
        <div className="container mx-auto px-4 py-10">
          <DataTable data={users} columns={columns} />
        </div>
      </section>
    </>
  );
}


