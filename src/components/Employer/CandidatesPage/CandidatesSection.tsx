import { GetCandidatesBasedOnJobDepartment } from "@/db/queries/employerQuries";
import VirtualizedEmployerCandidateList from "./VirtualizedEmployerCandidateList";

export default async function CandidatesSection({
  jobDepartment,
}: {
  jobDepartment: string;
}) {
  const candidates = await GetCandidatesBasedOnJobDepartment(jobDepartment);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {candidates.length === 0 ? (
          <div className="grid place-content-center h-96">
            <p className="text-center text-lg">
              No candidates have applied for this role yet
            </p>
          </div>
        ) : (
          <>
            <p className="text-xl font-semibold">
              {candidates.length} - Applicants for the role
            </p>
            <div className="my-2 py-2 ">
              <VirtualizedEmployerCandidateList candidates={candidates} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
