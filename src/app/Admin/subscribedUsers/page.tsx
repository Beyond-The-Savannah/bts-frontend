import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { CombinedSubscribedUsersProp, SubscribedUserProp } from "@/types/subscribedUser";
import { UserMinus2Icon, UserPlus2, Users } from "lucide-react";
import { usersSubscriptionInformation } from "@/app/dal/subscriptions";

// import { SubscribedUser } from "@/types/globals";


export const dynamic = "force-dynamic";

const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;


export default async function Page() {
  
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const users: SubscribedUserProp[] = await response.data;

  // const activeSubscriptionsCount = users.filter((user) => user.status === "active").length;
  // const canceledSubscriptionsCount = users.filter((user) => user.status === "cancelled").length;
  
  const newSubscriptionData=await usersSubscriptionInformation()
  // console.log("New Subscription Data", newSubscriptionData)

  const combinedUsersSubscriptions:CombinedSubscribedUsersProp[]=[
    ...users.map((user)=>({
      ...user,
      password:user.password??"",
      phoneNumber:user.phoneNumber??"",
      file:user.file??"",
      firstName:user.firstName===null?"":user.firstName,
      lastName:user.lastName===null?"":user.lastName,
    })),
    ...newSubscriptionData.map((userData)=>{
      const plan=userData.subcriptionTierName && userData.subcriptionTierType ?`${userData.subcriptionTierName} ${userData.subcriptionTierType}`:""
      return{
        id:userData.id,
        status:userData.subscriptionStatus??"",
        subscriptionPlan:plan,
        career:userData.career===null? "":userData.career,
        email:userData.emailAddress??"",
        password:"",
        firstName:userData.firstName===null ?"":userData.firstName,
        lastName:userData.lastName===null ?"":userData.lastName,
        phoneNumber:userData.phoneNumber===null ?"":userData.phoneNumber,
        attachmentName:userData.resumeName??"",
        file:"",
        imageUrl:userData.resumeUrl??"",
        isActive: userData.subscriptionStatus === 'active',
      isDeleted: false
      }
    })
  ]

  const allSubscriptionsCount=combinedUsersSubscriptions.length;
  const activeSubscriptionsCount = combinedUsersSubscriptions.filter((user) => user.status === "active").length;
  const canceledSubscriptionsCount = combinedUsersSubscriptions.filter((user) => user.status === "cancelled").length;

 
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
              <p className="text-lg font-bold">{allSubscriptionsCount}</p>
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
          {/* <DataTable data={users} columns={columns} /> */}
          <DataTable data={combinedUsersSubscriptions} columns={columns} />
        </div>
      </section>
    </>
  );
}


