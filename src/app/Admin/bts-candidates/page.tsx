import CandidatesProfile from "@/components/Customer/CandidatesProfile";
import AllBTSCandidatesSection from "@/components/Employer/CandidatesPage/AllBTSCandidatesSection";
import UploadCandidatesForm from "@/components/Employer/CandidatesPage/UploadCandidatesForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            {/* <TabsTrigger value="Company Profile"> Company</TabsTrigger> */}
          </TabsList>
          <TabsContent value="Candidates">
            <div className="c">
              <h2 className="text-3xl font-semibold mb-10">All Candidates</h2>
            </div>
            <AllBTSCandidatesSection/>
          </TabsContent>
          <TabsContent value="Candidates Profile">
            <CandidatesProfile />
          </TabsContent>
          <TabsContent value="Upload Candidates">
            <UploadCandidatesForm />
          </TabsContent>
          {/* <TabsContent value="Company Profile">
            <CompanyProfile/>
          </TabsContent> */}
        </Tabs>
      </section>
    </>
  );
}
