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
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

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
    alert(JSON.stringify(data));
  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Jobs Category Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        {/* <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Job Category Details
        </p> */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
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
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                    />
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
