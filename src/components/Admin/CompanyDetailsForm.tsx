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
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
// import { imageFormat, imageModule } from "@/lib/reactQuilSettings";
// import { useAddCompanyDetails } from "@/remoteData/mutateData";
import { toast } from "sonner";
import { CldUploadWidget, CldUploadWidgetInfo} from "next-cloudinary";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

export default function CompanyDetailsForm() {
  const baseUrl = "https://efmsapi.azurewebsites.net";

  const [cDValue] = useState("");
  const [cImage, setCImage] = useState("");
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
      // imageUrl: "",
      imageUrl: cImage,
    },
  });

  function Submit(data: z.infer<typeof CompanyFormSchema>) {
    // alert(JSON.stringify(data));

    // const response = await fetch(`${baseUrl}/api/Companies/addCompanies`, {
    fetch(`${baseUrl}/api/Companies/addCompanies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.companyName,
        description: data.companyDescription,
        phoneNumber: data.companyContactPhone,
        headQuarters: data.companyHeadQuaters,
        attachmentName: "",
        imageUrl: data.imageUrl,
        attachment: "",
        email: data.companyContactEmail,
        location: data.location,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return toast(data);
      });

    // const result = await response.json();
    // return result;
    // const mutataion= useAddCompanyDetails(data)
    // if(mutataion.isPending){return toast.info('processing')}
    // if(mutataion.isSuccess){return toast.success('Company Details added')}
    // if(mutataion.isError){return toast.info('Company Details not added')}
  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Company Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        {/* <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Company Details
        </p> */}
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
          </div>
          {/* <div className="flex flex-col-reverse md:flex-row gap-2 justify-center"> */}
          <div className="flex flex-col-reverse md:flex-row gap-12  items-center justify-evenly">
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
            <div className="">
              <p>Company Image</p>
              <Button asChild variant="default">
                <CldUploadWidget
                  uploadPreset="btsUpload1"
                  onSuccess={(results) => {
                    const info= results.info as CldUploadWidgetInfo
                    setCImage(info.secure_url);
                  }}
                >
                  {({ open }) => {
                    return (
                      <Button onClick={() => open()} className="">
                        Upload Company Logo
                      </Button>
                    );
                  }}
                </CldUploadWidget>
              </Button>
            </div>
            {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      modules={imageModule}
                      formats={imageFormat}
                      style={{width:"15vw", borderRadius:"200rem", height:"vh"}}
                    />
                    
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <Button
            type="submit"
            className="bg-bts-BrownThree hover:bg-green-800"
          >
            Add Company
          </Button>
        </form>
      </Form>
    </>
  );
}
