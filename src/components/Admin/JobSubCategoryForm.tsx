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
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

export default function JobSubCategoryForm() {
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
    alert(JSON.stringify(data));
  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Jobs SubCategory Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        {/* <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Job SubCategory Details
        </p> */}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="subCategoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category Name</FormLabel>
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
              name="jobCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90vw] md:w-[30vw] lg:w-[24vw]">
                        <SelectValue placeholder="Select Job Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["a", "b", "c", "d"].map((letter) => (
                        <SelectItem key={letter} value={letter}>
                          {letter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subCategoryDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category Description</FormLabel>
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
