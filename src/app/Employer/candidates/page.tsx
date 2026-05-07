
import AccessDenied from "@/components/Employer/AccessDenied";
import AllCandidatesSection from "@/components/Employer/CandidatesPage/AllCandidatesSection";
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function page() {
  
 const { orgId, userId } = await auth();
 if (!orgId || !userId) {
     redirect("/Employer");
   }
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
        <div className="my-10">
            <h2 className="text-3xl font-semibold ">All Candidates</h2>
            <div className="border-2 rounded-md border-bts-BrownThree w-36 mt-2" />
        </div>
        <div className="mt-10">
            <AllCandidatesSection/>
        </div>
        
      </section>
     
    </>
  );
}
