"use client";
import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { Button } from "@/components/ui/button";
import { DateFormatter } from "@/lib/utils";
import { useGetRemoteListingJobsUsingTanstack } from "@/remoteData/getData";
import { Params, SearchParams } from "@/types/remoteJobsListing";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useTransitionRouter } from "next-view-transitions";

import { use } from "react";
import clsx from "clsx";

export default function FindJobs(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const router = useTransitionRouter();
  const searchParams = use(props.searchParams);

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const lastRemoteJobListingIndex = Number(page) * Number(per_page);
  const firstRemoteJobListingIndex =
    lastRemoteJobListingIndex - Number(per_page);

  const {
    data: remoteJobs,
    isLoading,
    isError,
  } = useGetRemoteListingJobsUsingTanstack();

  const paginatedRemoteJobs = remoteJobs?.slice(
    firstRemoteJobListingIndex,
    lastRemoteJobListingIndex
  );

  console.log("PGD=>", paginatedRemoteJobs);
  return (
    <>
      <section className="container mx-auto min-h-screen px-4">
        <div className="pt-40 mb-10">
          <h2 className="text-xl">Global Open Roles</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            Remote Opportunities
          </p>
        </div>
        {isLoading && <RemoteJobListingsLoadingUI />}
        {isError && <RemoteJobListingErrorUI />}
        <div className="flex flex-wrap lg:justify-center  mb-20 gap-8 md:gap-2 md:gap-y-8 lg:gap-8">
          {paginatedRemoteJobs?.map((job, index) => (
            <div
              key={index}
              className=" border-bts-BrownTwo/50 border-2 rounded-xl w-full md:w-[22rem] lg:w-5/12 bg-bts-BrownTwo/50 hover:shadow-bts-BrownFour hover:shadow-md hover:bg-bts-BrownFive/50 duration-700 px-8 py-4"
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
                  <p className="capitalize text-sm rounded-xl bg-bts-BrownOne text-black w-24 text-center">
                    {DateFormatter(`${job.dateCreated}`)}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-between mt-4 ">
                <div className="space-y-2 ml-12">
                  <p className="capitalize font-semibold">{job.jobName}</p>
                  <p className="capitalize text-sm">{job.jobSubCategory}</p>
                </div>
                <div className="c">
                  <Link href={`view-job/${job.jobsId}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-bts-BrownTwo hover:bg-bts-BrownTwo hover:text-black hover:scale-105 transition duration-500"
                    >
                      View Position
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {remoteJobs && (
          <div className="grid place-content-center">
            <div className=" mb-20 flex flex-wrap gap-2 items-center">
              <Button
                variant="outline"
                onClick={() => {
                  router.push(
                    `find-jobs/?page=${Number(page) - 1}&per_page=${per_page}`
                  );
                }}
                disabled={Number(page) <= 1}
              >
                previous
              </Button>
              <ul className="flex flex-wrap gap-2 items-center">
                {[
                  ...new Array(Math.ceil(remoteJobs.length / Number(per_page))),
                ].map((_, index) => {
                  const pageNavigation = index + 1;
                  return (
                    <Button
                      key={index}
                      type="button"
                      size="sm"
                      className={clsx(
                        "hover:bg-bts-BrownOne",
                        pageNavigation == Number(page)
                          ? "bg-bts-BrownFive"
                          : "bg-transparent text-black"
                      )}
                      onClick={() => {
                        router.push(
                          `find-jobs/?page=${pageNavigation}&per_page=${per_page}`
                        );
                      }}
                    >
                      {pageNavigation}
                    </Button>
                  );
                })}
              </ul>
              <Button
                variant="outline"
                onClick={() => {
                  router.push(
                    `find-jobs/?page=${Number(page) + 1}&per_page=${per_page}`
                  );
                }}
                disabled={lastRemoteJobListingIndex > remoteJobs.length}
              >
                next
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
