import AddJobs from "@/components/Employer/JobSection.tsx/AddJobsForm";
import Jobs from "@/components/Employer/JobSection.tsx/Jobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <>
      <section className="container px-4 mx-auto">
        
          <Tabs defaultValue="Jobs">
            <TabsList className="w-full">
              <TabsTrigger value="Jobs">Jobs</TabsTrigger>
              <TabsTrigger value="AddJobForm">Add Job Openning</TabsTrigger>
            </TabsList>
            <TabsContent value="Jobs"><Jobs/></TabsContent>
            <TabsContent value="AddJobForm"><AddJobs/></TabsContent>
          </Tabs>
        {/* <AddJobs /> */}
      </section>
    </>
  );
}
