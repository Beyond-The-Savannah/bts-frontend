
import AccessDenied from "@/components/Employer/AccessDenied";
import AddJobs from "@/components/Employer/JobSection.tsx/AddJobsForm";
import Jobs from "@/components/Employer/JobSection.tsx/Jobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth, clerkClient } from "@clerk/nextjs/server";


export default async function page() {
  const {orgId,userId}=await auth()
  const client=await clerkClient()
  const { data: organisationMemmbers } =await client.organizations.getOrganizationMembershipList({organizationId: orgId!,});
  const isOrganisationMember = organisationMemmbers.some((member) => member.publicUserData?.userId === userId,);

  if(!isOrganisationMember){
    return(
      <>
      <AccessDenied/>
      </>
    )
  }

  return (
    <>
      <section className="container px-4 mx-auto">
        
          <Tabs defaultValue="Jobs">
            <TabsList className="w-full">
              <TabsTrigger value="Jobs">Jobs</TabsTrigger>
              <TabsTrigger value="AddJobForm">Add Job Opening</TabsTrigger>
            </TabsList>
            <TabsContent value="Jobs"><Jobs/></TabsContent>
            <TabsContent value="AddJobForm"><AddJobs/></TabsContent>
          </Tabs>
      </section>
    </>
  );
}
