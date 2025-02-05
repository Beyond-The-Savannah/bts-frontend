"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { CompanyFormSchema } from "@/formSchemas/jobListingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toast } from "sonner";
// import { CldUploadWidget } from "next-cloudinary";
// import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

export default function CompanyDetailsForm() {
  

  const [cDValue] = useState("");
  // const [cImage, setCImage] = useState("");
  // const [cImage2]=useState("")

  const form = useForm<z.infer<typeof CompanyFormSchema>>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      companyName: "",
      companyHeadQuaters: "",
      companyContactEmail: "",
      companyContactPhone: "",
      companyDescription: cDValue,
      location: "",
      // imageUrl: cImage,
      imageUrl: "",
    },
  });

   function Submit(data: z.infer<typeof CompanyFormSchema>) {
    // alert(JSON.stringify(data))
    const postRequest= async()=>{

      try {
        const response = await axiosInstance.post(`/api/Companies/addCompanies`, {
          name: data.companyName,
          description: data.companyDescription,
          phoneNumber: data.companyContactPhone,
          headQuarters: data.companyHeadQuaters,
          attachmentName: "",
          imageUrl: data.imageUrl,
          email: data.companyContactEmail,
          location: data.location,
        });
        if (response.data == 200) {
          console.log(response)
          
          return response.data
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message)
        }
      }
    }
    toast.promise(
      postRequest(),
      {
        loading:"Adding...",
        success:()=>{
          form.reset()
          // setCImage("")
          // console.log("DATA",data)
          return `Company Details Added`
        },
        error:"Error, try again later"
      }
    )

  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Company Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Submit)} className="space-y-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyHeadQuaters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Headquaters</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyContactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Contact Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Contact Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      required
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Contact Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      required
                      type="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                      className=""
                      required
                      type="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row flex-wrap gap-12  items-center justify-evenly">
            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      // style={{width:"90%"}}
                      className="w-[50vw]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({}) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-4 items-center">
                      {
                        <CldUploadWidget
                          uploadPreset="btsUpload1"
                          onSuccess={(result) => {
                            if (
                              result?.info &&
                              typeof result.info === "object" &&
                              "secure_url"
                            ) {
                              setCImage(result.info.secure_url);
                              form.setValue("imageUrl", result.info.secure_url);
                            }
                          }}
                        >
                          {({ open }) => {
                            return (
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => open()}
                                className=""
                              >
                                Upload Company Logo
                              </Button>
                            );
                          }}
                        </CldUploadWidget>
                      }
                      {cImage !== "" && (
                        <DisplayImageFromNextCloudinary
                          src={cImage}
                          height={200}
                          width={200}
                          alt="company image"
                          classname="object-cover size-24 rounded-lg"
                        />
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-bts-BrownThree hover:bg-green-800"
          >
            Add Company
          </Button>
        </form>
      </Form>
    </>
  );
}
