// import {
//   GetCandidatesPool,
//   GetCandidatesWithOutResume,
//   GetCandidatesWithResume,
// } from "@/db/queries/employerQuries";
// import VirtualBtsCandidatesList from "@/components/Admin/VirtualBtsCandidatesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidatesWithOutResume from "./CandidatesWithOutResume";
import CandidatesWithInfinityQuery from "@/components/Admin/CandidatesWithInfinityQuery";
import CandidatesWithResume from "./CandidatesWithResume";
import {GetAllCandidatesTotalCount, GetCanidatesWithOutResumeTotalCount, GetCanidatesWithResumeTotalCount} from "@/db/queries/employerQuries";

export default async function AllBTSCandidatesSection() {
  const candidatesWithResumeCount=await GetCanidatesWithResumeTotalCount()
  const candidatesWithOutResumeCount=await GetCanidatesWithOutResumeTotalCount()
  const allCandidatesCount=await GetAllCandidatesTotalCount();
  
  // const [candidates, candidatesWithResume, candidatesWithOutResume] =
  //   await Promise.all([
  //     GetCandidatesPool(),
  //     GetCandidatesWithResume(),
  //     GetCandidatesWithOutResume(),
  //   ]);
  // console.log("ALL BTS CANDIDATES:", candidates);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {/* {candidates.length === 0 ? (
          <div className="grid place-content-center h-96">
            <p className="text-center text-lg">No candidates available</p>
          </div>
        ) : ( */}
          <>
            <Tabs defaultValue="CandidatesWithResume" >
              <TabsList className="w-full bg-transparent">
                <TabsTrigger value="CandidatesWithResume">
                  Candidates With Resume
                </TabsTrigger>
                <TabsTrigger value="CandidatesWithOutResume">
                  Candidates With Out Resume
                </TabsTrigger>
                <TabsTrigger value="AllCandidates">All Candidates</TabsTrigger>
              </TabsList>
              <TabsContent value="CandidatesWithResume">
                {" "}
                {/* <div className="mb-10">
                  <h2 className="text-3xl font-semibold">
                    Candidates With Resume
                  </h2>
                  <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
                </div> */}
                {/* <VirtualBtsCandidatesList candidates={candidatesWithResume} /> */}
                <CandidatesWithResume allRecordsCount={candidatesWithResumeCount}/>
              </TabsContent>
              <TabsContent value="CandidatesWithOutResume">
                {" "}
                {/* <div className="mb-10">
                  <h2 className="text-3xl font-semibold">
                    Candidates With Out Resume
                  </h2>
                  <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
                </div> */}
                {/* <VirtualBtsCandidatesList
                  candidates={candidatesWithOutResume}
                /> */}
                <CandidatesWithOutResume allRecordsCount={candidatesWithOutResumeCount}/>
              </TabsContent>
              <TabsContent value="AllCandidates">
                {" "}
                <div className="mb-10">
                  <h2 className="text-3xl font-semibold">All Candidates</h2>
                  <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
                </div>
                {/* <VirtualBtsCandidatesList candidates={candidates} /> */}
                <CandidatesWithInfinityQuery allRecordsCount={allCandidatesCount}/>
              </TabsContent>
            </Tabs>
          </>
        {/* )} */}
      </div>
    </>
  );
}
