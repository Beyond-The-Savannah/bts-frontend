import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { GetRelevantCandidates } from "@/db/queries/employerQuries";

import { auth } from "@clerk/nextjs/server";

import VirtualizedEmployerCandidateList from "./VirtualizedEmployerCandidateList";
import { UsersIcon } from "lucide-react";

export default async function AllCandidatesSection() {
  const { orgId } = await auth();

  const relavantCandidates = await GetRelevantCandidates(orgId!);

  // console.log("RELEVANT CANDIDATES",relavantCandidates)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {relavantCandidates.length === 0 ? (
          <>
            <Empty className="border border-dotted w-6/12 mx-auto mt-40">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UsersIcon className="text-orange-400" />
                </EmptyMedia>
                <EmptyTitle>No potential candidates found</EmptyTitle>
                <EmptyDescription className="w-full lg:w-[48dvw]">
                  Once you have job openings added in your organization,
                  candidates will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent></EmptyContent>
            </Empty>
          </>
        ) : (
          <>
            <div className="my-20 ">
              <VirtualizedEmployerCandidateList
                candidates={relavantCandidates}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
