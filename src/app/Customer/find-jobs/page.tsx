import { JobListings } from "@/components/Customer/JobListings";

import RemoteJobListingsLoadingUI from "@/components/Loaders/RemoteJobListingsLoadingUI";

import { Suspense } from "react";

export default function page() {
  return (
    <section className="container mx-auto">
      <div className="pt-4 md:pt-0 pl-0 md:pl-5 mb-10">
        <h2 className="text-sm md:text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-xl md:text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>

      <div className="">
        <>
          <Suspense fallback={<RemoteJobListingsLoadingUI />}>
            <JobListings />
          </Suspense>
        </>
      </div>
    </section>
  );
}
