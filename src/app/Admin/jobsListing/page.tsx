"use client";
import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DateFormatter } from "@/lib/utils";
import { useGetRemoteListingJobsUsingTanstack } from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { toast } from "sonner";
export default function JobsListingAdminPage() {
  const { data, isLoading, isError } = useGetRemoteListingJobsUsingTanstack();

  const sortedJobsByDate=data?.sort((a,b)=> {return new Date(b.dateCreated).getTime()- new Date(a.dateCreated).getTime()})

  // console.log("ADMIN JOB LISTING",data)
  // console.log("ADMIN JOB LISTING BY DATE",sortedJobsByDate)


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
        </div>
        <p className="flex justify-end text-xs mb-2">total jobs listed {data?.length}</p>
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
                    <Button variant="destructive" size="sm" className="border-bts-BrownTwo hover:bg-red-300 hover:text-black hover:scale-105 transition duration-500">Delete Job</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full grid place-content-center">
                    <AlertDialogHeader className="text-center">
                      <AlertDialogTitle className="text-center">Please confirm Removal</AlertDialogTitle>
                      <AlertDialogDescription className="text-center">This will remove <span className="font-semibold"> {job.jobName} </span> from the job listing</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>removeJobDetails(job.jobsId)} className="bg-red-400 hover:bg-red-600" >Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* <Button
                onClick={()=>removeJobDetails(job.jobsId)}
                  variant="destructive"
                  size="sm"
                  className="border-bts-BrownTwo hover:bg-red-300 hover:text-black hover:scale-105 transition duration-500"
                >
                  Remove job
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
