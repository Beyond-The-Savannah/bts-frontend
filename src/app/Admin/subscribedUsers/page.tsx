import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { UserMinus2Icon, UserPlus2, Users } from "lucide-react";


export const dynamic = "force-dynamic";

const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;


export default async function Page() {
  
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const users: SubscribedUserProp[] = await response.data;

  const activeSubscriptionsCount = users.filter((user) => user.status === "active").length;
  const canceledSubscriptionsCount = users.filter((user) => user.status === "cancelled").length;
 

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


