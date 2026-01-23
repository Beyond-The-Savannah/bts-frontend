// 



// app/page.tsx
import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";

const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export default async function Page() {
  // Only fetch the users - sync happens separately
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const users: SubscribedUserProp[] = await response.data;

  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Subscribed Users</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>

        <div className="container mx-auto px-4 py-10">
          <DataTable data={users} columns={columns} />
        </div>
      </section>
    </>
  );
}