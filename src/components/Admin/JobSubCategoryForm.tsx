"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { JobSubCategoryFormSchema } from "@/formSchemas/jobListingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/remoteData/mutateData";
import { Textarea } from "../ui/textarea";
import { useGetJobCategoryDropDownList } from "@/remoteData/getData";
// const ReactQuill = dynamic(() => import("react-quill-new"), {
//   ssr: false,
//   loading: () => <p>Loading text editor...</p>,
// });

export default function JobSubCategoryForm() {
  const { data: jobCategories } = useGetJobCategoryDropDownList();
  const [sCDValue] = useState("");

  const form = useForm<z.infer<typeof JobSubCategoryFormSchema>>({
    resolver: zodResolver(JobSubCategoryFormSchema),
    defaultValues: {
      subCategoryName: "",
      subCategoryDescription: sCDValue,
      jobCategory: "",
    },
  });

  function onSubmit(data: z.infer<typeof JobSubCategoryFormSchema>) {
    // alert(JSON.stringify(data));
    const jobsCategortyPostRequest = async () => {
      try {
        const response = await axiosInstance.post(
          `/api/JobSubCategory/addJobsCategories`,
          {
            name: data.subCategoryName,
            description: data.subCategoryDescription,
            jobCategoryId: 2,
            createdBy: ``,
            modifiedBy: ``,
          }
        );
        if (response.data == 200) {
          console.log(response);
        }
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(jobsCategortyPostRequest(), {
      loading: "Adding...",
      success: () => {
        return "Job's Sub Catgegory Added";
      },
      error: "Error, cannot add jobs sub catgegory, try again later",
    });
  }

  return (
    <>
      {/* <div className="w-full lg:w-[70vw] mx-auto"></div> */}
      <div className=" container mx-auto mt-10 mb-20">
        <h2 className="text-xl">Jobs SubCategory Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-wrap items-start justify-center gap-6">
            <FormField
              control={form.control}
              name="subCategoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]"
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                        <SelectValue placeholder="Select Job Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobCategories?.map((jobCategory) => (
                        <SelectItem
                          key={jobCategory.value}
                          value={String(jobCategory.value)}
                        >
                          {jobCategory.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategoryDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]"
                    />
                    {/* <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                  /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="bg-bts-BrownThree hover:bg-green-800"
          >
            Add Job Sub Category
          </Button>
        </form>
      </Form>
    </>
  );
}
