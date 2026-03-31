import AccessDenied from "@/components/Employer/AccessDenied";
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";
import AddJobs from "@/components/Employer/JobSection.tsx/AddJobsForm";
import Jobs from "@/components/Employer/JobSection.tsx/Jobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { orgId, userId } = await auth();
  const { isValidSubscription, isOrganisationMember } = await GetEmployerSubscriprionDetails({orgId: orgId as string,userId: userId as string,});


  if (!isOrganisationMember || !isValidSubscription) {
    return (
      <>
        <AccessDenied />
      </>
    );
  }

  return (
    <>
      <section className="container px-4 mx-auto">
        <Tabs defaultValue="Jobs">
          <TabsList className="w-full">
            <TabsTrigger value="Jobs">Jobs</TabsTrigger>
            <TabsTrigger value="AddJobForm">Add Job Opening</TabsTrigger>
          </TabsList>
          <TabsContent value="Jobs">
            <Jobs />
          </TabsContent>
          <TabsContent value="AddJobForm">
            <AddJobs />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
