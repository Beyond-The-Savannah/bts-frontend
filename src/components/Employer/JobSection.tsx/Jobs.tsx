import { GetEmpolyerJobs } from "@/db/queries/employerQuries";
import { auth } from "@clerk/nextjs/server";
import { FolderX } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import VirtualisedEmployerJobsList from "./VirtualisedEmployerJobsList";

// import Link from "next/link";

export default async function Jobs() {
  const { orgId } = await auth();
  const newJobs = await GetEmpolyerJobs(orgId!);
  return (
    <>
      {newJobs.length === 0 && (
        <>
          <Empty className="border border-dotted w-6/12 mx-auto mt-40">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderX className="text-orange-400" />
              </EmptyMedia>
              <EmptyTitle>No job postings found</EmptyTitle>
              <EmptyDescription className="w-full lg:w-[28dvw]">
                Click on the tab link &quot;Add Job Opening&quot; to post a new
                job position
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent></EmptyContent>
          </Empty>
        </>
      )}
      <div className="my-2 py-2 ">
        <VirtualisedEmployerJobsList newJobs={newJobs} />
      </div>
    </>
  );
}
