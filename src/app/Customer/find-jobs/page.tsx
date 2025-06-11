export const dynamic = 'force-dynamic'; 

// import JobsListingByDepartmentCareer from "@/components/Customer/JobsListingByDepartmentCareer";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import { FindJobs } from "@/components/findJobsPage/FindJobs";
import {Client} from "@upstash/workflow"

export default async function page() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  
  const client=new Client({token:process.env.QSTASH_TOKEN})
  const {workflowRunId}=await client.trigger({
    // for local developement 
    // url:'http://127.0.0.1:8080/workflow-one'
    // for production 
    url:`${process.env.PUBLIC_BASE_URL}/workflow-one`
  })
  console.log("WorkflowRunId=>",workflowRunId)

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
