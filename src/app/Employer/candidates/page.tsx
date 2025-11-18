import CandidatesProfile from "@/components/Customer/CandidatesProfile";
import CandidatesSection from "@/components/Employer/CandidatesPage/CandidatesSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <>
      {/* <section className="container mx-auto px-4">
        <div className="c">
            <h2 className="text-3xl font-semibold mb-10">All Candidates</h2>
        </div>
        <CandidatesSection/>
      </section> */}
      <section className="container mx-auto px-4">
        <Tabs defaultValue="Candidates">
          <TabsList className="w-full">
            <TabsTrigger value="Candidates">Candidates</TabsTrigger>
            <TabsTrigger value="Candidates Profile">Add Candidate</TabsTrigger>
          </TabsList>
          <TabsContent value="Candidates">
            
            <div className="c">
              <h2 className="text-3xl font-semibold mb-10">All Candidates</h2>
            </div>
            <CandidatesSection />
          </TabsContent>
          <TabsContent value="Candidates Profile">
            <CandidatesProfile />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
