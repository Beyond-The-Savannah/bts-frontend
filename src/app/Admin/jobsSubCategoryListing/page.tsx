"use client";

import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllJobSubCategories,
  useGetJobCategoryDropDownList,
} from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import { SelectContent } from "@radix-ui/react-select";

import axios from "axios";
import { useState } from "react";

import { toast } from "sonner";

export default function JobsSubCategoryAdminPage() {
  
  // state to hold valiues of the input values onchange 
  const [jobCategoryValue, setjobCategoryValue] = useState("");
  const [subCategoryNameValue, setSubCategoryNameValue] = useState("");
  
  const { data: jobCategories } = useGetJobCategoryDropDownList();
  const { data, isLoading, isError } = useGetAllJobSubCategories();
  const dataInDescendingOrder = data
    ? [...data].sort((a, b) => b.id - a.id)
    : [];

  function updateJobSubCategory(id: number) {

    // gets all information for the jobSubCategory needed for default values in jobSubCategoryEditData object 
    const jobSubCategoryData = dataInDescendingOrder?.find(
      (job) => job.id == id
    );

    let updatedNameValue = "";
    if (subCategoryNameValue != "") {
      updatedNameValue = subCategoryNameValue;
    } else {
      updatedNameValue = jobSubCategoryData?.name as string;
    }

    const updateEntry = async () => {
      try {
      
          const jobSubCategoryEditData = {
            id: id,
            jobCategoryId: parseInt(jobCategoryValue),
            name: updatedNameValue,
            description: jobSubCategoryData?.description,
            createdBy: jobSubCategoryData?.createdBy,
            modifiedBy: jobSubCategoryData?.modifiedBy,
          };

          const response = await axiosInstance.put(`/api/JobSubCategory/updateJobSubCategory?id=${id}`,jobSubCategoryEditData);
          if(response?.data.errorMessage=="Update Done But No Matching Records Found"){toast.error(`Error, cannot update the ${jobSubCategoryData?.name} JobSubCategory`)}
          // console.log("Response from updating jobSubCategory", response);
          
        
      } catch (error) {
        toast.error("Error, cannot updated at the moment, try again later");
        console.log("Error updating the job sub category", error);
      }
    };
    

    toast.promise(updateEntry(), {
      loading: "Updating...",
      success: () => {
        return "JobSubCategory Updated";
      },
      error: "Error, cannot update the jobSubCategory, try again later",
    });
  }

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
  // console.log("SUBCATEGORIES=>", dataInDescendingOrder);
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
              className="border rounded-lg px-12 py-6 w-3/4 md:w-4/12 lg:w-[24vw] md:min-h-[24dvh] lg:min-h-[10dvh] flex flex-col gap-4 items-center justify-between bg-bts-BrownTwo"
            >
              <div>
                <p className="text-base flex flex-col ">
                  <span className="text-xs block -ml-4">
                    Job Sub Catgeory Name
                  </span>
                  {jobSubCategory.name}
                </p>
                {/* <span className="text-xs">{jobSubCategory.jobCategoryId}</span> */}
              </div>
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      // disabled
                      size="sm"
                      className="bg-green-400 hover:bg-green-500"
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl mx-auto ">
                    <DialogHeader className="text-center max-w-xl mx-auto">
                      <DialogTitle>Edit Job Sub Category</DialogTitle>
                      <DialogDescription>
                        on save changes will be reflected
                      </DialogDescription>
                    </DialogHeader>
                    <div className="min-h-[30dvh]">
                      <form className="space-y-4">
                        <div className="w-full">
                          <Label>Job subCategory name</Label>
                          <Input
                            defaultValue={jobSubCategory.name}
                            onChange={(e) =>
                              setSubCategoryNameValue(
                                e.target.value || jobSubCategory.name
                              )
                            }
                            required
                          />
                        </div>

                        <div className="w-full">
                          <Label>Job Category</Label>
                          <Select
                            defaultValue={jobSubCategory.jobCategoryId.toString()}
                            onValueChange={(value) => {
                              setjobCategoryValue(
                                value || jobSubCategory.jobCategoryId.toString()
                              );
                            }}
                            required
                          >
                            <SelectTrigger className="w-full ">
                              <SelectValue placeholder="Select Job Category" />
                            </SelectTrigger>
                            <SelectContent className="z-50">
                              {jobCategories?.map((jobCategory) => (
                                <SelectItem
                                  key={jobCategory.value}
                                  value={jobCategory.value.toString()}
                                >
                                  {jobCategory.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </form>
                    </div>
                    <DialogFooter className="w-48 p-2 mx-auto flex gap-8">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          onClick={() =>
                            updateJobSubCategory(jobSubCategory.id)
                          }
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full grid place-content-center">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        Please confirm Removal
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        This will remove{" "}
                        <span className="font-semibold">
                          {" "}
                          {jobSubCategory.name}{" "}
                        </span>{" "}
                        from the job sub-category listing
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeJobSubCategory(jobSubCategory.id)}
                        className="bg-red-400 hover:bg-red-600"
                      >
                        Remove{" "}
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
