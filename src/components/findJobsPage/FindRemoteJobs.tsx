"use client";

import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { Button } from "@/components/ui/button";
import { useGetRemoteListingJobsUsingTanstack } from "@/remoteData/getData";
import { useSearchParams } from "next/navigation";
import { Link, useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { DateFormatter } from "@/lib/utils";
import clsx from "clsx";
import RemoteJobListingErrorUI from "../RemoteJobListingErrorUI";

export function FindRemoteJobs() {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();

  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "10";
  const name = searchParams?.get("name") ?? "";
  const jobSubCategoryId = searchParams?.get("jobSubCategoryId")
    ? Number(searchParams.get("jobSubCategoryId"))
    : undefined;

  const lastRemoteJobListingIndex = Number(page) * Number(per_page);
  const firstRemoteJobListingIndex =
    lastRemoteJobListingIndex - Number(per_page);

  const {
    data: remoteJobs,
    isLoading,
    isError,
  } = useGetRemoteListingJobsUsingTanstack(name, jobSubCategoryId);

  const paginatedRemoteJobs = remoteJobs?.slice(
    firstRemoteJobListingIndex,
    lastRemoteJobListingIndex
  );
  return (
    <>
      <section className="container mx-auto min-h-screen px-4">
        <div className="pt-24 md:pt-44 mb-10">
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
                  className="object-contain rounded-xl size-12 blur-lg"
                />
                <div className="flex items-center justify-between w-full">
                  <p className="blur-sm">{job.companyName}</p>
                  <p className="capitalize text-sm rounded-xl bg-bts-BrownOne text-black w-24 text-center">
                    {DateFormatter(`${job.dateCreated}`)}
                  </p>
                </div>
              </div>
              {/* <div className="flex items-end justify-between mt-4 "> */}
              <div className="flex flex-col lg:flex-row items-start lg:items-end  lg:justify-between mt-4 ">
                <div className="space-y-2 ml-4 lg:ml-12 w-full">
                  <p className="capitalize font-semibold">{job.jobName}</p>
                  <p className="capitalize text-sm">{job.jobSubCategory}</p>
                </div>
                <div className="flex  justify-end w-full">
                  <Link href={`/Customer`}>
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
          <div className="grid place-content-center ">
            <div className=" max-w-5xl mx-auto mb-20 flex flex-wrap gap-2 items-center">
              <Button
                variant="outline"
                onClick={() => {
                  router.push(
                    `find-job/?jobSubCategoryId=${jobSubCategoryId}&page=${Number(page) - 1}&per_page=${per_page}`
                  );
                }}
                disabled={Number(page) <= 1}
              >
                previous
              </Button>
              <ul className="flex flex-wrap lg:flex-nowrap gap-2 items-center  overflow-x-auto  scrollbar-thin pb-3 mx-4  max-w-3xl">
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
                          `find-job/?jobSubCategoryId=${jobSubCategoryId}&page=${pageNavigation}&per_page=${per_page}`
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
                    // `find-jobs/?page=${Number(page) + 1}&per_page=${per_page}`
                    `find-job/?jobSubCategoryId=${jobSubCategoryId}&page=${Number(page) + 1}&per_page=${per_page}`
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
