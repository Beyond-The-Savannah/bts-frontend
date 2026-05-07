import { GetEmpolyerJobs } from "@/db/queries/employerQuries";

import { auth } from "@clerk/nextjs/server";
import VirtualisedEmployerJobsList from "../JobSection.tsx/VirtualisedEmployerJobsList";

export default async function PostJobs() {
  const { orgId } = await auth();

  const newJobs = await GetEmpolyerJobs(orgId!);
  const dashboardView = true;
  return (
    <div className="container mt-20 mx-auto">
      {newJobs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-center ">No job postings found.</p>
          <span className="text-center text-sm text-gray-500">
            Click on the Jobs Link on the sidebar to create your first job
            posting.
          </span>
        </div>
      )}

      <VirtualisedEmployerJobsList
        newJobs={newJobs}
        dashboardView={dashboardView}
      />
    </div>
  );
}
