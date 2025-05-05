import { DataTable } from "./data-table";
import {columns} from "./columns"
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";

export default async function page() {
    const response= await  axios.get(`https://efmsapi-staging.azurewebsites.net/api/BydUsers/getAllUsers`)
    const users:SubscribedUserProp[]=await response.data

    // console.log("SUBUSERS", users)
  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Subscribed Users</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>

        <div className="container mx-auto px-4 py-10">
            <DataTable data={users} columns={columns}/>
        </div>
      </section>
    </>
  );
}
