"use client";

import { useGetRemoteListingJobsUsingTanstack } from "@/remoteData/getData";
import RemoteJobListingErrorUI from "../RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "../RemoteJobListingsLoadingUI";
import Image from "next/image";
import { DateFormatter } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { CircleAlert } from "lucide-react";
import { Suspense } from "react";

export default function JobsListingByDepartmentCareer() {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const jobSubCategoryId =
    localStorage.getItem("CareerDeparmentValue") ?? undefined;
  const name = searchParams?.get("name") ?? "";
  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "10";
  const lastRemoteJobListingIndex = Number(page) * Number(per_page);
  const firstRemoteJobListingIndex =
    lastRemoteJobListingIndex - Number(per_page);
  const convertedJobSubCategoryId = Number(jobSubCategoryId);

  const {
    data: remoteJobs,
    isLoading,
    isError,
  } = useGetRemoteListingJobsUsingTanstack(name, convertedJobSubCategoryId);
  const paginatedRemoteJobs = remoteJobs?.slice(
    firstRemoteJobListingIndex,
    lastRemoteJobListingIndex
  );
  return (
    <>
    <Suspense>

      {jobSubCategoryId == undefined ? (
        <div className="bg-yellow-100 rounded-lg px-4 py-8 my-20 w-full flex gap-3">
          <CircleAlert />
          <p>Please head over to the &ldquo;Career Selection&ldquo; and select your career category  in order to view a job</p>
        </div>
      ) : (
        <section className="container mx-auto min-h-screen px-4">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
          <div className="flex flex-wrap lg:justify-center  mb-20 gap-8 md:gap-2 md:gap-y-8 lg:gap-8 py-10">
            {paginatedRemoteJobs?.map((job, index) => (
              <div
                key={index}
                className=" border-bts-BrownTwo/50 border-2 rounded-xl w-full md:w-[22rem] lg:w-10/12 bg-bts-BrownTwo/50 hover:shadow-bts-BrownFour hover:shadow-md hover:bg-bts-BrownFive/50 duration-700 px-8 py-4"
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
                <div className="flex flex-col lg:flex-row items-start lg:items-end  lg:justify-between mt-4 ">
                  <div className="space-y-2 ml-4 lg:ml-12 w-full">
                    <p className="capitalize font-semibold">{job.jobName}</p>
                    <p className="capitalize text-sm">{job.jobSubCategory}</p>
                  </div>
                  <div className="flex  justify-end w-full">
                    <Link href={`find-jobs/${job.jobsId}`}>
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
          {/* pagination section  */}
          {remoteJobs && (
            <div className="grid place-content-center">
              <div className=" mb-20 flex flex-wrap gap-2 items-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push(
                      `find-jobs/?jobSubCategoryId=${jobSubCategoryId}&page=${Number(page) - 1}&per_page=${per_page}`
                    );
                  }}
                  disabled={Number(page) <= 1}
                >
                  previous
                </Button>
                <ul className="flex flex-wrap gap-2 items-center">
                  {[
                    ...new Array(
                      Math.ceil(remoteJobs.length / Number(per_page))
                    ),
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
                            `find-jobs/?jobSubCategoryId=${jobSubCategoryId}&page=${pageNavigation}&per_page=${per_page}`
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
                      `find-jobs/?jobSubCategoryId=${jobSubCategoryId}&page=${Number(page) + 1}&per_page=${per_page}`
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
      )}
    </Suspense>
    </>
  );
}
