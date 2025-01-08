"use client";
import { DateFormatter, fetchRemoteJobsList } from "@/app/find-jobs/page";
import SingleJobLoadingErrorUI from "@/components/SingleJobLoadingErrorUI";
import SingleJobLoadingUI from "@/components/SingleJobLoadingUI";
import { Button } from "@/components/ui/button";
import { SingleRemoteJob } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { CalendarPlus, CalendarX } from "lucide-react";
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
  // if (isLoading) {
  //   return <SingleJobLoadingUI />;
  // }
  // if (isError) {
  //   return <SingleJobLoadingErrorUI />;
  // }

  return (
    <>
      <section className="container mx-auto  min-h-screen pt-40">
        <div className="">
          <h2 className="text-xl">Global Open Roles</h2>
          <div className="border-2 rounded-md border-stone-500 w-36"></div>
          <p className="capitalize text-3xl font-bold mt-2">
            Remote Opportunity
          </p>
        </div>

        {isLoading && <SingleJobLoadingUI />}
        {isError && <SingleJobLoadingErrorUI />}

        <div className="py-10 flex flex-row-reverse gap-4">
          {filteredRemoteJob && (
            <div className="    flex items-center justify-between gap-4 border rounded-lg py-4  px-8 mb-12">
              <div className="w-[20vw]">
                <p className="c">{filteredRemoteJob.jobName}</p>
                <p className="c">{filteredRemoteJob.jobSubCategory}</p>
                <p className="c">{filteredRemoteJob.jobCategory}</p>
                <Image
                  src={filteredRemoteJob?.imageUrl}
                  height={400}
                  width={400}
                  alt={`${filteredRemoteJob.companyName} image`}
                  className="object-cover  size-12 md:size-32 border rounded-md"
                />
                <h3>{filteredRemoteJob?.companyName}</h3>
              </div>
              <div className="space-y-4">
                <p className="flex items-center gap-1 rounded-xl bg-green-100 text-green-400 py-1 px-4 w-40">
                  <CalendarPlus size={24} className="" />
                  {DateFormatter(`${filteredRemoteJob.dateCreated}`)}
                </p>
                <p className="flex items-center gap-1 rounded-xl bg-red-100 text-red-400 py-1 px-4 w-40">
                  <CalendarX size={24} className="" />
                  {DateFormatter(`${filteredRemoteJob.endDate}`)}
                </p>
                <Link
                  href={`${filteredRemoteJob.jobUrl}`}
                  target="_blank"
                  className="block"
                >
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
          <div className="space-y-12 grid grid-cols-1 md:grid-cols-1 items-start justify-center gap-4">
            {singleJob && (
              <>
                {singleJob.map((listing) => (
                  <article
                    key={listing.id}
                    className=" border rounded-lg py-4  px-8"
                  >
                    <p className="text-xl font-semibold">
                      {listing.sectionName}
                    </p>
                    <h3>{`<${listing.sectionDescription}`}</h3>
                  </article>
                ))}
              </>
            )}
          </div>
          {!singleJob && <p>We cannot find that particular job listing</p>}
        </div>
      </section>
    </>
  );
}
