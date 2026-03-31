
import AccessDenied from "@/components/Employer/AccessDenied";
import AllCandidatesSection from "@/components/Employer/CandidatesPage/AllCandidatesSection";
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";

import { auth } from "@clerk/nextjs/server";
export default async function page() {
  
 const { orgId, userId } = await auth();
  const { isValidSubscription, isOrganisationMember } = await GetEmployerSubscriprionDetails({orgId: orgId as string,userId: userId as string,});
  
    if(!isOrganisationMember || !isValidSubscription){
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
