"use client";
import CompanyDetailsForm from "@/components/Admin/CompanyDetailsForm";
// import DisplayImageFromNextCloudinary from "@/components/DisplayImageFromNextCloudinary";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetAllComapanies } from "@/remoteData/getData";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
// import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function CompanyListingAmdinPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAllComapanies();

  const dataInDescendingOrder = data
    ? [...data].sort((a, b) => b.id - a.id)
    : [];
  // console.log(data);

  function removeCompany(id: number) {
    const softDeleteCompany = async () => {
      try {
        const response = await axiosInstance.put(
          `/api/Companies/deleteCompany/?id=${id}`
        );
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(softDeleteCompany(), {
      loading: "Removing...",
      success: () => {
        // revalidatePath(`/Admin/companyListing`)
        router.refresh();
        return "Company Removed";
      },
      error: "Error, removal failed ",
    });
  }
  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Company Listing</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        <div className="grid place-content-center mt-2">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
        </div>

        <p className="flex justify-end text-xs mb-2">
          total companies listed {data?.length}
        </p>
        <ScrollArea className=" border space-y-4 px-4 pb-10 mb-10 h-[80vh] w-full rounded-lg">
          {/* <div className=" space-y-4 flex flex-wrap gap-4 items-end "> */}
          <div className=" space-y-4 flex flex-wrap gap-4 items-end justify-evenly ">
            {dataInDescendingOrder?.map((company) => (
              <div
                key={company.id}
                // className="px-4 py-6 rounded-lg bg-bts-BrownTwo border border-bts-BrownThree w-full sm:w-[40vw] lg:w-[22.5vw] space-y-2 "
                className="px-4 py-6 rounded-lg bg-bts-BrownTwo border border-bts-BrownThree w-full sm:w-[40vw] lg:w-3/12 space-y-2 "
              >
                <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center">
                  {company.imageUrl !== "" && (
                    <Image
                      src={company.imageUrl}
                      height={200}
                      width={200}
                      alt="company image"
                      className="object-contain size-28 rounded-lg "
                    />
                  )}
                  <p className="font-semibold">{company.name}</p>
                </div>
                {/* <p className="text-sm">
                  <span className="text-xs">company ID: </span>
                  {company.id}
                </p> */}
                <p className="text-sm">
                  <span className="text-xs">comapny Description: </span>
                  {company.description}
                </p>
                <p className="text-sm">
                  <span className="text-xs">comapny email: </span>
                  {company.email}
                </p>
                <p className="text-sm">
                  <span className="text-xs">comapny heaquater: </span>
                  {company.headQuarters}
                </p>
                <p className="text-sm">
                  <span className="text-xs">comapny location: </span>
                  {company.location}
                </p>
                <p className="text-sm">
                  <span className="text-xs">comapny phoneNumber: </span>
                  {company.phoneNumber}
                </p>
                <div className="flex justify-evenly gap-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="hover:bg-red-300"
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
                          <span className="font-semibold"> {company.name} </span>{" "}
                          from the company listing
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="w-12/12 mx-auto flex  justify-center items-center">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeCompany(company.id)}
                          className="bg-red-400 hover:bg-red-600"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="secondary" size="sm" className="bg-green-300 hover:bg-green-400">Edit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="py-10 h-[90dvh] max-w-[90dvw] mx-auto overflow-y-auto">
                      <AlertDialogTitle className="text-center">Edit <span className=" font-extrabold">{company.name}</span> details</AlertDialogTitle>
                      <AlertDialogDescription className="text-center"> </AlertDialogDescription>
                      <CompanyDetailsForm companyDetails={{
                        id:company.id,
                        companyName:company.name,
                        companyHeadQuaters:company.headQuarters,
                        companyContactEmail:company.email,
                        companyContactPhone:company.phoneNumber,
                        companyDescription:company.description,
                        location:company.location,
                        imageUrl:company.imageUrl

                      }}/>
                    <AlertDialogFooter>
                      <AlertDialogCancel className=" lg:-mt-20">Cancel</AlertDialogCancel>
                      <AlertDialogCancel className=" bg-blue-200 hover:bg-blue-100 lg:-mt-20">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
    </>
  );
}
