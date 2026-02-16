import { GetEmpolyerJobs, GetRelevantCandidates } from "@/db/queries/employerQuries"
import { auth } from "@clerk/nextjs/server"
import { FileStackIcon, Users } from "lucide-react"


export default async function InfoCards() {
    const{orgId}=await auth()
    const postedJobsCount = await GetEmpolyerJobs(orgId!)
    const relavantCandidatesCount = await (await GetRelevantCandidates(orgId!)).length

  return (
    <>
    <div className="container mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-8">
            <div className=" flex items-center gap-4 border rounded-lg px-4 py-2">
                <FileStackIcon/>
                <div className="flex justify-center items-center gap-8">
                    <p className="text-2xl">{postedJobsCount.length}</p>
                    <p className="c">Posted Jobs</p>
                </div>
            </div>
            <div className="flex items-center gap-4 border rounded-lg px-4 py-2">
                <Users/>
                <div className="flex justify-center items-center gap-8">
                    <p className="text-2xl">{relavantCandidatesCount}</p>
                    <p className="c"> Applicants</p>
                </div>
            </div>
            {/* <div className="flex items-center gap-4 border rounded-lg px-4 py-2">
                <Bookmark/>
                <div className="flex justify-center items-center gap-8">
                    <p className="text-2xl">02</p>
                    <p className="c">Shortlisted Canidates</p>
                </div>
            </div> */}
        </div>
    </div>
    </>
  )
}
