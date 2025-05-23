"use client";

import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGetAllJobSubCategories } from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { toast } from "sonner";

export default function JobsSubCategoryAdminPage() {
  

  const { data, isLoading, isError } = useGetAllJobSubCategories();
  const dataInDescendingOrder = data
    ? [...data].sort((a, b) => b.id - a.id)
    : [];

  function removeJobSubCategory(id: number) {
    const softDeleteJobSubCategory = async () => {
      try {
        const response = await axiosInstance.put(
          `/api/JobSubCategory/deleteJobSubCategory?id=${id}`
        );
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(softDeleteJobSubCategory(), {
      loading: "Removing",
      success: () => {
        return "Job Sub Category Removed";
      },
      error: "Error, cannot remove job sub category, try again later",
    });
  }
  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Job Sub Category Listing</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        <div className="grid place-content-center mt-2">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
        </div>
        <p className="flex justify-end text-xs mb-2">
          total sub categories listed {data?.length}
        </p>
        <div className=" space-y-4 flex flex-wrap gap-4 items-end justify-center mb-10">
          {dataInDescendingOrder?.map((jobSubCategory) => (
            <div
              key={jobSubCategory.id}
              className="border rounded-lg px-12 py-6 w-3/4 md:w-4/12 lg:w-[20vw] flex flex-col gap-4 items-center justify-start bg-bts-BrownTwo"
            >
              <div>
                <p className="text-base flex flex-col">
                  <span className="text-xs block -ml-4">
                    Job Sub Catgeory Name
                  </span>
                  {jobSubCategory.name}
                </p>
              </div>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="hover:bg-red-300">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full grid place-content-center">
                    <AlertDialogHeader >
                      <AlertDialogTitle className="text-center">Please confirm Removal</AlertDialogTitle>
                      <AlertDialogDescription className="text-center">This will remove <span className="font-semibold"> {jobSubCategory.name} </span> from the job sub-category listing</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>removeJobSubCategory(jobSubCategory.id)} className="bg-red-400 hover:bg-red-600">Remove </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              {/* <Button
                onClick={() => removeJobSubCategory(jobSubCategory.id)}
                size="sm"
                variant="destructive"
              >
                Remove
              </Button> */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
