import { GetCandidatesPool } from "@/db/queries/employerQuries";

import VirtualBtsCandidatesList from "@/components/Admin/VirtualBtsCandidatesList";

export default async function AllBTSCandidatesSection() {
  const candidates = await GetCandidatesPool();
  // console.log("ALL BTS CANDIDATES:", candidates);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {candidates.length === 0 ? (
          <div className="grid place-content-center h-96">
            <p className="text-center text-lg">No candidates available</p>
          </div>
        ) : (
          <>
            <VirtualBtsCandidatesList candidates={candidates} />
          </>
        )}
      </div>
    </>
  );
}
