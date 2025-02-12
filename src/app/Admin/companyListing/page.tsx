"use client";
// import DisplayImageFromNextCloudinary from "@/components/DisplayImageFromNextCloudinary";
import RemoteJobListingErrorUI from "@/components/RemoteJobListingErrorUI";
import RemoteJobListingsLoadingUI from "@/components/RemoteJobListingsLoadingUI";
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
      success: ()=>{
        // revalidatePath(`/Admin/companyListing`)
        router.refresh()
        return "Company Removed"
      },
      error: "Error, removal failed ",
    });
  }
  return (
    <>
      <section className="mt-20 px-4">
        <h2 className="text-xl">Company Listing</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        <div className="grid place-content-center mt-2">
          {isLoading && <RemoteJobListingsLoadingUI />}
          {isError && <RemoteJobListingErrorUI />}
        </div>
        <ScrollArea className=" border space-y-4 px-20 h-[80vh] w-[80vw]">
          <div className=" space-y-4 flex flex-wrap gap-4 items-center">
            {data?.map((company) => (
              <div
                key={company.id}
                className="px-4 py-6 rounded-lg border  border-bts-BrownThree w-[20vw] space-y-2"
              >
                <div className="flex gap-4 items-center">
                  {/* {company.imageUrl !== "" && (
                    <DisplayImageFromNextCloudinary
                      src={company.imageUrl}
                      height={200}
                      width={200}
                      alt="company logo"
                      classname="object-cover size-28 rounded-lg border-2"
                    />
                  )} */}
                  {company.imageUrl !== "" && (
                    <Image
                      src={company.imageUrl}
                      height={200}
                      width={200}
                      alt="company image"
                      className="object-contain size-28 rounded-lg border-2"
                    />
                  )}
                  <p className="font-medium text-xl">{company.name}</p>
                </div>
                <p className="text-sm">
                  <span className="text-xs">company ID: </span>
                  {company.id}
                </p>
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
                <Button
                  variant="destructive"
                  onClick={() => removeCompany(company.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
    </>
  );
}
