export const dynamic = 'force-dynamic'; 

import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import { FindJobs } from "@/components/findJobsPage/FindJobs";
import { redirect } from "next/navigation";


export default async function page() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  
  if(userSubscriptionInformation==null || userSubscriptionInformation==undefined){
    redirect('/Customer')
  }

  console.log("USER INFO",userSubscriptionInformation)

  return (
    <section className="pt-4 pb-20">
      <div className="hidden">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>
      <div className="-mt-32">
        {userSubscriptionInformation?.status != "cancelled" ? (
          // <JobsListingByDepartmentCareer />
          <FindJobs/>
        ) : null}
      </div>
    </section>
  );
}
