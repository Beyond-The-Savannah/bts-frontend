import CandidatesProfile from "@/components/Customer/CandidatesProfile";
import AllBTSCandidatesSection from "@/components/Employer/CandidatesPage/AllBTSCandidatesSection";
import UploadCandidatesForm from "@/components/Employer/CandidatesPage/UploadCandidatesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <>
      <section className="container mx-auto px-4">
        {/* <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-10">All Candidates</h2>
        </div> */}




        <Tabs defaultValue="Candidates">
          <TabsList className="w-full">
            <TabsTrigger value="Candidates">Candidates</TabsTrigger>
            <TabsTrigger value="Candidates Profile">Add Candidate</TabsTrigger>
            <TabsTrigger value="Upload Candidates">
              Upload Candidates
            </TabsTrigger>
            
          </TabsList>
          <TabsContent value="Candidates">
            <div className="mb-10">
              <h2 className="text-3xl font-semibold">All Candidates</h2>
              <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
            </div>
            <AllBTSCandidatesSection/>
          </TabsContent>
          <TabsContent value="Candidates Profile">
            <CandidatesProfile />
          </TabsContent>
          <TabsContent value="Upload Candidates">
            <UploadCandidatesForm />
          </TabsContent>
          
        </Tabs>
      </section>
    </>
  );
}
