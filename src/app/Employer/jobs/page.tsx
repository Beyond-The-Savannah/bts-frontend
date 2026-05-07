import AccessDenied from "@/components/Employer/AccessDenied";
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";
import AddJobs from "@/components/Employer/JobSection.tsx/AddJobsForm";
import Jobs from "@/components/Employer/JobSection.tsx/Jobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { orgId, userId } = await auth();

  if (!orgId || !userId) {
    redirect("/Employer");
  }

  const { isValidSubscription, isOrganisationMember } =
    await GetEmployerSubscriprionDetails({
      orgId: orgId as string,
      userId: userId as string,
    });

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
        <div className="my-10">
            <h2 className="text-3xl font-semibold ">Jobs Postings</h2>
            <div className="border-2 rounded-md border-bts-BrownThree w-36 mt-2" />
        </div>
        <Tabs defaultValue="Jobs">
          <TabsList className="w-full mb-10">
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
