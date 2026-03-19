
import AccessDenied from "@/components/Employer/AccessDenied";
import AllCandidatesSection from "@/components/Employer/CandidatesPage/AllCandidatesSection";

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
      <section className="container mx-auto px-4">
        <div className="mt-10">
            <h2 className="text-3xl font-semibold mb-10">All Candidates</h2>
        </div>
        <div className="mt-10">
            <AllCandidatesSection/>
        </div>
        
      </section>
     
    </>
  );
}
