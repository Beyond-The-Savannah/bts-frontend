import { FindRemoteJobs } from "@/components/findJobsPage/FindRemoteJobs";
import RemoteJobListingErrorUI from "@/components/Loaders/RemoteJobListingErrorUI";
import { Suspense } from "react";

export default function page() {
  return (
    <section className="container mx-auto">
      <div className="pt-24 md:pt-44 mb-10 px-4">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>
      <Suspense fallback={<RemoteJobListingErrorUI />}>
        <FindRemoteJobs />
      </Suspense>
    </section>
  );
}
