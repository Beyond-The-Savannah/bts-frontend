"use client";
import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGetAllJobsCategories } from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { toast } from "sonner";

export default function JobsCategoryListingAdminPage() {
  const { data, isLoading, isError } = useGetAllJobsCategories();
  function removeJobCategory(id: number) {
    const softDeleteJobCategory = async () => {
      try {
        const response = await axiosInstance.put(
          `api/JobsCategory/deleteJobsCategory/?id=${id}`
        );
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(softDeleteJobCategory(), {
      loading: "Removing",
      success: () => {
        return "Job Category Removed";
      },
      error: "Error, cannot remove job category, try again later",
    });
  }
  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Job Category Listing</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        <div className="grid place-content-center mt-2">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
        </div>
        <div className=" space-y-4 flex flex-wrap gap-4 items-center">
          {data?.map((jobCategory) => (
            <div
              key={jobCategory.id}
              className="border rounded-lg px-12 py-6 w-[40vw] flex items-center justify-between bg-bts-BrownTwo"
            >
              <div>
                <p className="text-base flex flex-col">
                  <span className="text-xs block -ml-4">Job Catgeory Name</span>
                  {jobCategory.name}
                </p>
                <p className="text-base flex flex-col">
                  <span className="text-xs block -ml-4">
                    Job Catgeory Description
                  </span>
                  {jobCategory.description}
                </p>
              </div>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="hover:bg-red-300">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full grid place-content-center">
                    <AlertDialogHeader >
                      <AlertDialogTitle className="text-center">Please confirm Removal</AlertDialogTitle>
                      <AlertDialogDescription className="text-center">This will remove <span className="font-semibold"> {jobCategory.name} </span> from the job category listing</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>removeJobCategory(jobCategory.id)} className="bg-red-400 hover:bg-red-600">Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              {/* <Button
                onClick={() => removeJobCategory(jobCategory.id)}
                size="sm"
                variant="destructive"
              >
                Remove category
              </Button> */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
