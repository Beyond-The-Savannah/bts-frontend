// import VirtualBtsCandidatesList from "@/components/Admin/VirtualBtsCandidatesList"
// import { Button } from "@/components/ui/button"
// import { GetPaginaitedCandidates } from "@/db/queries/employerQuries"

import CandidatesWithInfinityQuery from "@/components/Admin/CandidatesWithInfinityQuery";
export const dynamic = "force-dynamic";

export default async function page() {
    // const paginatedCanidates=await GetPaginaitedCandidates()

    
    // console.log("PAGINATED CANDIDATES", paginatedCanidates)
  return (
    <>
    {/* <section className="container mx-auto px-4">
        <div className="max-h-[85dvh] py-10  overflow-y-hidden">
        <VirtualBtsCandidatesList candidates={paginatedCanidates}/>
        </div>
        <div className="flex gap-4 items-center justify-center my-10">
            <Button>Previous</Button>
            <Button>Next</Button>
        </div>
    </section> */}
    <CandidatesWithInfinityQuery/>
    </>
  )
}
