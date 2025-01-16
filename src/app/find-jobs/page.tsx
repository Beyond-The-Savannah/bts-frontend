import FindJobs from "@/components/findJobsPage/FindJobs";
import { Params, SearchParams } from "@/types/remoteJobsListing";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

const url = getCldImageUrl({
  src:"find_jobs_-_beyond_the_savannah_fr5eli"
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

export default function JobsPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  return (
    <>
      <FindJobs params={props.params} searchParams={props.searchParams} />
    </>
  );
}
