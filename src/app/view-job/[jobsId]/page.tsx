"use client";
import { fetchRemoteJobsList } from "@/app/find-jobs/page";
import { Button } from "@/components/ui/button";
import {  SingleRemoteJob } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import Image from "next/image";
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

  const { data: remoteJobs } = useQuery({
    queryKey: ["allRemoteJobs"],
    queryFn: fetchRemoteJobsList,
  });
  const filteredRemoteJob = remoteJobs?.find(
    (job) => job.jobsId == parseInt(`${jobsId}`)
  );
  if (isLoading) {
    <p>loading</p>;
  }
  if (isError) {
    <p>error loading</p>;
  }

  return (
    <>
      <section className="container mx-auto  min-h-screen pt-40">
        <span>{jobsId}</span>
        {filteredRemoteJob && (

        <div className="max-w-xl mx-auto  flex items-center justify-between gap-4 border rounded-lg py-4  px-8 mb-12">
          <div className="c">
            <Image
              src={filteredRemoteJob?.imageUrl}
              height={400}
              width={400}
              alt={`${filteredRemoteJob.companyName} image`}
              className="object-contain rounded-xl size-12"
            />
            <h3>{filteredRemoteJob?.companyName}</h3>
          </div>
          <div className="c">
                  <Link href={`${filteredRemoteJob.jobUrl}`} target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-amber-200 hover:border-amber-200"
                    >
                      Apply for position
                    </Button>
                  </Link>
                </div>
        </div>
        )}
        <div className="space-y-12 grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-4">
          {singleJob && (
            <>
              {singleJob.map((listing) => (
                <article
                  key={listing.id}
                  className=" border rounded-lg py-4  px-8"
                >
                  <p className="text-xl font-semibold">{listing.sectionName}</p>
                  <h3>{`<${listing.sectionDescription}`}</h3>
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
