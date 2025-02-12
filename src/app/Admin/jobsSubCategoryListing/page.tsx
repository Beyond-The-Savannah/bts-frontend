"use client";

import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
import { Button } from "@/components/ui/button";
import { useGetAllJobSubCategories } from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { toast } from "sonner";

export default function JobsSubCategoryAdminPage() {
  const { data, isLoading, isError } = useGetAllJobSubCategories();

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
      <section className="mt-20 px-4">
        <h2 className="text-xl">Job Sub Category Listing</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        <div className="grid place-content-center mt-2">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
        </div>
        <div className=" space-y-4 flex flex-wrap gap-4 items-center">
          {data?.map((jobSubCategory) => (
            <div
              key={jobSubCategory.id}
              className="border rounded-lg px-12 py-6 w-3/4 md:w-4/12 lg:w-[18vw] flex flex-col gap-4 items-center justify-start"
            >
              <div>
                <p className="text-base flex flex-col">
                  <span className="text-xs block -ml-4">
                    Job Sub Catgeory Name
                  </span>
                  {jobSubCategory.name}
                </p>
                <p className="text-base flex flex-col">
                  <span className="text-xs block -ml-4">
                    Job Sub Catgeory ID
                  </span>
                  {jobSubCategory.jobCategoryId}
                </p>
                <p className="text-base flex flex-col">
                  <span className="text-xs block -ml-4">
                    Job Catgeory Description
                  </span>
                  {jobSubCategory.description}
                </p>
              </div>
              <Button
                onClick={() => removeJobSubCategory(jobSubCategory.id)}
                size="sm"
                variant="destructive"
              >
                Remove category
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
