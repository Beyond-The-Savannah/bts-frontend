'use client'
import { FindRemoteJobs } from "@/components/findJobsPage/FindRemoteJobs";
import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import { Suspense } from "react";


export default function page() {
  return (
    <Suspense fallback={<RemoteJobListingErrorUI/>}>
      <FindRemoteJobs />
    </Suspense>
    
  );
}


