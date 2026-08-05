// import FindJobs from "@/components/findJobsPage/FindJobs";
import PostHogClient from "@/lib/postHogServerPage";
// import { Params, SearchParams } from "@/types/remoteJobsListing";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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

export default async function JobsPage() {
  // console.log("find-jobs page",props)
  const posthog =PostHogClient()
    await posthog?.shutdown()
  return (
    <>
    <section className="h-screen">

      {/* <FindJobs params={props.params} searchParams={props.searchParams} /> */}
      {/* <FindJobs  /> */}
    </section>
    </>
  );
}
