import InfoCards from "@/components/Employer/HomeSection/InfoCards";
import Interviews from "@/components/Employer/HomeSection/Interviews";
import PostJobs from "@/components/Employer/HomeSection/PostJobs";
// import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
// import Image from "next/image";
import React from "react";

export default async function page() {
  const { orgId } = await auth();
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId!,
  });

  return (
    <>
      <section className="px-4">
        <div className="c">
          {/* <p className="c">Hi there, welcome to the</p> */}
          <h2 className="text-3xl font-semibold mb-10">
            {organization.name} Dashboard
          </h2>
          <InfoCards />
        </div>
        <div className="flex items-center gap-2">
          {/* <div className="flex items-center gap-2">
            <p className="c">Manage {organization.name} profile </p>
            <OrganizationSwitcher hidePersonal={true} />
          </div> */}
         {/* <Image src={organization.imageUrl} alt="Organization Image" width={80} height={80}  className="bg-cover bg-center bg-no-repeat rounded-lg"/>  */}
        </div>
        <div className="flex gap-8">
          <div className="w-full  md:w-6/12 mx-auto bg-slate-100/50 rounded-md my-10 px-4">
            <h3 className="text-lg font-semibold my-8">Recently Posted Jobs</h3>
            <PostJobs />
          </div>
          <div className="w-full mx-auto bg-slate-100/60 rounded-md my-10 px-4 md:w-6/12">
            <h3 className="text-lg font-semibold my-8">Interviews Schedule</h3>
            <Interviews />
          </div>
        </div>
      </section>
    </>
  );
}
