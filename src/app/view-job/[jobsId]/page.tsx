"use client";
import { SingleRemoteJob } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function SinglJobListingPage({
  params,
}: {
  params: Promise<{ jobsId: string }>;
}) {
  const { jobsId } = use(params);
  async function fetchSingleRemoteList(): Promise<SingleRemoteJob[]> {
    const result = fetch(
      `https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsSections?jobId=${jobsId}`
    ).then((res) => res.json());
    return result;
  }

  const {
    data: singleJob,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singeleJob"],
    queryFn: () => fetchSingleRemoteList(),
  });
  if (isLoading) {
    <p>loading</p>;
  }
  if (isError) {
    <p>error loading</p>;
  }

  return (
    <>
      <section className="container mx-auto  min-h-screen">
        <span>{jobsId}</span>
        {singleJob && (
          <>
            {singleJob.map((listing) => (
              <div key={listing.id}>
                <p className="text-xl font-semibold">{listing.sectionName}</p>
                <h3>{listing.sectionDescription}</h3>
              </div>
            ))}
          </>
        )}
        <p>We cannot find that particular job listing</p>
      </section>
    </>
  );
}
