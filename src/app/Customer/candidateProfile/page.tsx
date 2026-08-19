import CandidateProfileComponent from "@/components/Customer/CandidateProfileComponent";

import CandidateProfileLoader from "@/components/Loaders/CandidateProfileLoader";

import { Suspense } from "react";



export default async function page() {
  

  return (
    <>
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-sm md:text-xl">Candidates Profile</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">Professional Details</p>

        <Suspense fallback={<CandidateProfileLoader/>}>
          <CandidateProfileComponent/>
        </Suspense>

      
      </section>§
    </>
  );
}
