"use client";
import SingleJobLoadingErrorUI from "@/components/SingleJobLoadingErrorUI";
import SingleJobLoadingUI from "@/components/SingleJobLoadingUI";
import { Button } from "@/components/ui/button";
import { DateFormatter } from "@/lib/utils";
import { fetchRemoteJobsList } from "@/remoteData/getData";
import { SingleRemoteJob } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, CalendarPlus, CalendarX } from "lucide-react";
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
  const fixedHTML = (htmlString: string) => {
    return (
      htmlString
        // .replace(</\/g,"")
        .replace(/ul>/g, "<ul>")
        .replace(/li>/g, "<li>") // Fix list item tags
        .replace(/<b>/g, "<strong>") // Replace <b> with <strong>
        .replace(/<\/b>/g, "</strong>") // Replace closing <b>
        .replace(/<i>/g, "<em>") // Replace <i> with <em>
        .replace(/<\/i>/g, "</em>") // Replace closing <i>
        .replace(/<h1>/g, "<h1>") // Ensure <h1> tags are correct
        .replace(/<\/h1>/g, "</h1>") // Ensure closing <h1>
        .replace(/<h2>/g, "<h2>") // Ensure <h2> tags are correct
        .replace(/<\/h2>/g, "</h2>") // Ensure closing <h2>
        .replace(/p>/g, "<p>") // Ensure <p> tags are correct
        .replace(/<\/p>/g, "</p>") // Ensure closing <p>
        .replace(/<\/?ul>/g, "<ul>") // Ensure <ul> tags are correct
        .replace(/<\/?ol>/g, "<ol>") // Ensure <ol> tags are correct
        .replace(/<\/?br>/g, "<br>")
    ); 
  };

  return (
    <>
      <section className="container mx-auto  min-h-screen pt-40 px-4">
        <div className="">
          <h2 className="text-xl">Global Open Roles</h2>
          <div className="border-2 rounded-md border-stone-500 w-36"></div>
          <p className="capitalize text-3xl font-bold mt-2">
            Remote Opportunity
          </p>
        </div>

        {isLoading && <SingleJobLoadingUI />}
        {isError && <SingleJobLoadingErrorUI />}

        <div className="py-10 flex flex-row-reverse flex-wrap lg:flex-nowrap gap-4">
          {filteredRemoteJob && (
            // <div className="    flex items-center justify-between gap-4 border rounded-lg py-4  px-8 mb-12">
            <div className="bg  gap-4 rounded-lg py-4 px-8 mb-12">
              <div className="w-[60vw] lg:w-[30vw]">
                <div className="flex items-center gap-4">
                  <Image
                    src={filteredRemoteJob?.imageUrl}
                    height={400}
                    width={400}
                    alt={`${filteredRemoteJob.companyName} image`}
                    className="object-contain  size-12 md:size-32 border rounded-md"
                    // className="object-cover  h-32 w-32  border rounded-md"
                  />
                  <h3 className="text-3xl">{filteredRemoteJob?.companyName}</h3>
                </div>

                <div className="my-10 space-y-4">
                  <p className="text-xl font-medium ml-4">
                    <span className="font-bold block text-xs -ml-4 mr-1">
                      Role:
                    </span>
                    {filteredRemoteJob.jobName}
                  </p>
                  <p className="text-lg font-medium ml-4">
                    <span className="font-bold block text-xs -ml-4 mr-1">
                      Department:
                    </span>
                    {filteredRemoteJob.jobSubCategory}
                  </p>
                  <p className="text-base font-medium ml-4">
                    <span className="font-bold block text-xs -ml-4 mr-1">
                      Location:
                    </span>
                    {filteredRemoteJob.jobCategory}
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <p className="flex items-center gap-1 rounded-xl bg-green-100 text-green-400 py-1 px-4 w-72">
                  <span className="font-semibold text-sm mr-1">Posted on:</span>
                  <CalendarPlus size={24} className="" />
                  {DateFormatter(`${filteredRemoteJob.dateCreated}`)}
                </p>
                <p className="flex items-center gap-1 rounded-xl bg-red-100 text-red-400 py-1 px-4 w-72">
                  <span className="font-semibold text-sm mr-1">
                    Deadline on:
                  </span>
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
                    size="lg"
                    className="w-72 bg-slate-200 hover:shadow-amber-300 hover:shadow-md duration-700"
                  >
                    Apply for position
                    <ArrowUpRight size={4} />
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
                    <h3 className="text-xl font-semibold">
                      {listing.sectionName}
                    </h3>
                    {/* <div className="prose:"
                    dangerouslySetInnerHTML={{ __html: fixedHTML(listing.sectionName) }}
                    >
                    </div> */}
  
                    <div className="prose"
                    dangerouslySetInnerHTML={{ __html: fixedHTML(listing.sectionDescription) }}
                    >
                    </div>
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
