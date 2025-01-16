import FindJobs from "@/components/findJobsPage/FindJobs";
import PostHogClient from "@/lib/postHogServerPage";
import { Params, SearchParams } from "@/types/remoteJobsListing";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

const url = getCldImageUrl({
  src:"find-job_openGraph_hhbgtj"
})

export const metadata:Metadata={
  openGraph:{
    images:[
      {
        width:1200,
        height:627,
        url
      }
    ]
  },
  title:"Find Jobs - Beyond The Savannah",
  description:"Looking for remote work? Beyond the Savannah offers a wealth of job openings that break geographical barriers. Explore our site now to connect with opportunities that fit your lifestyle and career goals."
}

export default async function JobsPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const posthog =PostHogClient()
    await posthog?.shutdown()
  return (
    <>
      <FindJobs params={props.params} searchParams={props.searchParams} />
    </>
  );
}
