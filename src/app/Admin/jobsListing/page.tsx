"use client";
import JobDetailsForm from "@/components/Admin/JobDetailsForm";
import FilterJobsByDepartment from "@/components/findJobsPage/FilterJobsByDepartment";
import FilterJobsByName from "@/components/findJobsPage/FilterJobsByJobName";
// import JobDetailsForm from "@/components/Admin/JobDetailsForm";
import RemoteJobListingErrorUI from "@/components/Loaders/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/Loaders/RemoteJobListingsLoadingUI";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DateFormatter } from "@/lib/utils";
import { useGetJobSubCategoryDropDownList, useGetRemoteListingJobsUsingTanstack } from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function JobsListingAdminPage() {
  
  const searchParams = useSearchParams();

  const name = searchParams?.get("name") ?? "";
  const jobSubCategoryId = searchParams?.get("jobSubCategoryId")? Number(searchParams.get("jobSubCategoryId")): undefined
  
  const { data, isLoading, isError } = useGetRemoteListingJobsUsingTanstack();
  const { data: jobDepartments } = useGetJobSubCategoryDropDownList();
  const {data: remoteJobs} = useGetRemoteListingJobsUsingTanstack(name, jobSubCategoryId);

  // const sortedJobsByDate = data?.sort((a, b) => {
  const sortedJobsByDate = remoteJobs?.sort((a, b) => {
    return (
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
  });

  // console.log("ADMIN JOB LISTING",data)
  // console.log("ADMIN JOB LISTING BY DATE", sortedJobsByDate);

  function removeJobDetails(id: number) {
    const softDelteJobDetails = async () => {
      try {
        const response = await axiosInstance.put(
          `/api/Jobs/deleteJob/?jobsId=${id}`
        );
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(softDelteJobDetails(), {
      loading: "Removing...",
      success: () => {
        return "JobDetails Removed";
      },
      error: "Error, removal failed, try again later",
    });
  }
  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Job Listing</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        <div className="grid place-content-center mt-2">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
           <div className="my-4 flex flex-wrap gap-2 pl-0 md:pl-5 pb-10">
              {remoteJobs && <FilterJobsByName remoteData={remoteJobs} />}
                {isLoading ||(jobDepartments && (<FilterJobsByDepartment remoteData={jobDepartments} />))}
            </div>
        </div>
        <p className="flex justify-end gap-4  text-xs mb-2">
          <span className="block border rounded-md px-2 py-1">total jobs listed : <span className="font-semibold">{data?.length}</span></span>
          {(jobSubCategoryId!=undefined ||  name!='') && (<span className="block border rounded-md px-2 py-1">filtered jobs : <span className="font-semibold">{remoteJobs?.length}</span>  </span>)}
          
        </p>
        <div className="flex flex-wrap lg:justify-center  mb-20 gap-8 md:gap-2 md:gap-y-8 lg:gap-8">
          {sortedJobsByDate?.map((job, index) => (
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
              </div>
              <div className="flex items-center justify-evenly gap-4 mt-2">
                <Link href={`/Admin/jobsListing/${job.jobsId}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-bts-BrownTwo hover:bg-bts-BrownTwo hover:text-black hover:scale-105 transition duration-500"
                  >
                    View Position
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="border-bts-BrownTwo hover:bg-green-300 hover:text-black hover:scale-105 transition duration-500"
                    >
                      Edit Job details
                    </Button>
                  </AlertDialogTrigger>
                  {/* <AlertDialogContent className="w-full md:max-w-[80dvw] pt-20 h-full overflow-y-auto  grid place-content-center"> */}
                  <AlertDialogContent className="max-w-[80dvw] py-10 h-[90dvh] overflow-y-auto">
                    <AlertDialogHeader className="text-center">
                      <AlertDialogTitle className="text-center">Edit <span className=" font-extrabold"> {job.companyName}</span> Job Details</AlertDialogTitle>
                      <AlertDialogDescription className="text-center"></AlertDialogDescription>
                    </AlertDialogHeader>
                    <JobDetailsForm jobDetails={{
                      jobsId:job.jobsId,
                      endDate:job.endDate,
                      jobName:job.companyName,
                      jobDescription:job.jobDescription,
                      companyId:job.companyId,
                      language:job.language as string,
                      jobUrl:job.jobUrl,
                      salary:job.salary,
                      jobCategoriesId:job.jobCategoriesId,
                      jobSubCategoryId:job.jobSubCategoryId

                    }}/>
                    {/* <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center"> */}
                    <AlertDialogFooter>
                      <AlertDialogCancel className=" lg:-mt-32">Cancel</AlertDialogCancel>
                      <AlertDialogCancel  className=" bg-blue-200 hover:bg-blue-100 lg:-mt-32">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="border-bts-BrownTwo hover:bg-red-300 hover:text-black hover:scale-105 transition duration-500"
                    >
                      Delete Job
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full grid place-content-center">
                    <AlertDialogHeader className="text-center">
                      <AlertDialogTitle className="text-center">
                        Please confirm Removal
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        This will remove{" "}
                        <span className="font-semibold"> {job.jobName} </span>{" "}
                        from the job listing
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeJobDetails(job.jobsId)}
                        className="bg-red-400 hover:bg-red-600"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
