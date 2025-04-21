import SubscribedUsersTable from "@/components/Admin/SubscribedUsersTable";
// import { GetAllSubscribedUsers } from "@/components/Customer/UserSubscriptionInformation";

export default async function page() {
    // const subscriptions= await GetAllSubscribedUsers()
    // console.log("All User Subscription", subscriptions)
  return (
    <>
      <section className="h-full">
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-xl">Users</h2>
          <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        </div>
        <div className="c">
          <SubscribedUsersTable/>
        </div>
      </section>
    </>
  );
}
