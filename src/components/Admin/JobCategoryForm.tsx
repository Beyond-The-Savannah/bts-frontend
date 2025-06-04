"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { JobCategoryFormSchema } from "@/formSchemas/jobListingSchema";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
// import dynamic from "next/dynamic";
import axios from "axios";
import { axiosInstance } from "@/remoteData/mutateData";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

// const ReactQuill = dynamic(() => import("react-quill-new"), {
//   ssr: false,
//   loading: () => <p>Loading text editor...</p>,
// });

export default function JobCategoryForm() {
  const [cDValue] = useState("");
  const form = useForm<z.infer<typeof JobCategoryFormSchema>>({
    resolver: zodResolver(JobCategoryFormSchema),
    defaultValues: {
      categoryName: "",
      categoryDescription: cDValue,
    },
  });

  function onSubmit(data: z.infer<typeof JobCategoryFormSchema>) {
    // alert(JSON.stringify(data));
    const jobsCategortyPostRequest= async()=>{
      try {
        const response= await axiosInstance.post(`/api/JobsCategory/addJobsCategories`,{
          name: data.categoryName,
          description: data.categoryDescription,
          createdBy: ``,
          modifiedBy: ``,
        })
        if(response.data==200){
          console.log(response)
        }
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error)){
          throw new Error(error.message)
        }
      }
    }
    toast.promise(jobsCategortyPostRequest(),{
      loading:"Adding...",
      success:()=>{
        return "Job's Sub Catgegory Added"
      },
      error:"Error, cannot add jobs sub catgegory, try again later"
    })
  }

  return (
    <>
    {/* <div className="w-full lg:w-[70vw] mx-auto"></div> */}
      <div className=" container mx-auto mt-10 mb-20">
        <h2 className="text-xl">Jobs Category Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-wrap items-start justify-center gap-6 ">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
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
              name="categoryDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]" />
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
            Add Job Category
          </Button>
        </form>
      </Form>
    </>
  );
}
