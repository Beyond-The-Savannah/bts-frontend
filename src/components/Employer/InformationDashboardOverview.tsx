import { auth, clerkClient } from "@clerk/nextjs/server";
import PostJobs from "./HomeSection/PostJobs";
// import Interviews from "./HomeSection/Interviews";
import InfoCards from "./HomeSection/InfoCards";

export default async function InformationDashboardOverview() {
  const { orgId } = await auth();
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId!,
  });
  return (
    <>
      <div className="c">
        <h2 className="text-3xl font-semibold mb-10">
          {organization.name} Dashboard
        </h2>
        <InfoCards/>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-8">
        <div className="w-full  lg:w-10/12 mx-auto bg-slate-100/50 rounded-md my-10 px-4">
          <h3 className="text-lg font-semibold my-8">Recently Posted Jobs</h3>
          <PostJobs />
        </div>
        {/* <div className="w-full mx-auto bg-slate-100/60 rounded-md my-10 px-4 lg:w-6/12">
          <h3 className="text-lg font-semibold my-8">Interviews Schedule</h3>
          <Interviews />
        </div> */}
      </div>
    </>
  );
}
