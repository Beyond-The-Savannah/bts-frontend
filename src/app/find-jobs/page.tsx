"use client";
import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { Button } from "@/components/ui/button";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import Image from "next/image";

export async function fetchRemoteJobsList(): Promise<ListingRemoteJobs[]> {
  const result =
    fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByCompany?name=&jobCategoryId=0
`).then((res) => res.json());
  return result;
}
export default function JobsPage() {
  function DateFormatter(date: string) {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  }

  const {
    data: remoteJobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allJobs"],
    queryFn: fetchRemoteJobsList,
  });

  if (isLoading){ return <RemoteJobListingsLoadingUI/>};
  if (isError){ return <RemoteJobListingErrorUI/>};

  

  return (
    <>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-wrap  items-center justify-center pt-40 mb-20 gap-8">
          {remoteJobs?.map((job, index) => (
            <div
              key={index}
              className="border rounded-xl w-5/12 bg-slate-100 hover:shadow-amber-300 hover:shadow-md hover:bg-slate-200 duration-700 px-8 py-4"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={job.imageUrl}
                  height={400}
                  width={400}
                  alt={`${job.companyName} image`}
                  className="object-contain rounded-xl size-12"
                />
                <div className="flex items-center justify-between w-full">
                  <p className="">{job.companyName}</p>
                  <p className="capitalize text-sm rounded-xl bg-slate-300 w-24 text-center">
                    {DateFormatter(`${job.dateCreated}`)}
                  </p>
                </div>
              </div>
              <div className="flex -items-end justify-between mt-4 ">
                <div className="space-y-2 ml-12">
                  <p className="capitalize font-semibold">{job.jobName}</p>
                  <p className="capitalize text-sm">{job.jobSubCategory}</p>
                </div>
                <div className="c">
                  <Link href={`view-job/${job.jobsId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-amber-200 hover:border-amber-200"
                    >
                      View Position
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
