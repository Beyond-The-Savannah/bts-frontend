"use client";
import {  SingleRemoteJob } from "@/types/remoteJobsListing";
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

//   async function fetchSingleRemoteListingDetails2(): Promise<ListingRemoteJobs> {
//     const result =
//       fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByCompany?jobCategoryId=2
// `).then((res) => res.json());
//     return result;
//   }

//   const resultDetails2=fetchSingleRemoteListingDetails2()
//   const filteredJob=resultDetails2.find(())
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
        <div className="space-y-12 grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-4">
          {singleJob && (
            <>
              {singleJob.map((listing) => (
                <article
                  key={listing.id}
                  className=" border rounded-lg py-4  px-8"
                >
                  <p className="text-xl font-semibold">{listing.sectionName}</p>
                  <h3>
                    {`<${listing.sectionDescription}`}
                  </h3>
                </article>
              ))}
            </>
          )}
        </div>
        {!singleJob && <p>We cannot find that particular job listing</p>}
      </section>
    </>
  );
}
