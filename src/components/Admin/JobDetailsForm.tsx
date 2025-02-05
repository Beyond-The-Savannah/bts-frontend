"use client";
// import dynamic from "next/dynamic";
import { JobFormSchema } from "@/formSchemas/jobListingSchema";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import clsx from "clsx";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

export default function JobDetailsForm() {
  const [jCDValue] = useState("");
  const [jsDValue] = useState("");

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      jobName: "",
      jobCategory: "",
      jobSubCategory: "",
      jobUrl: "",
      company: "",
      companyDescription: jCDValue,
      jobSections: [
        {
          jobSectionName: "",
          jobSectionDescription: jsDValue,
        },
      ],
      endDate: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "jobSections",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof JobFormSchema>) {
    alert(JSON.stringify(data));
    const jobDetailsPostRequest = async () => {
      try {
        const response = await axiosInstance.post(`/api/Jobs/addJobs`, {
          jobs: {
            endDate: data.endDate,
            jobName: data.jobName,
            jobDescription: data.companyDescription,
            companyId: data.company,
            language: "string",
            jobUrl: data.jobUrl,
            salary: 0,
            jobCategoriesId: 0,
            jobSubCategoryId: 0,
          },
          createdBy: "string",
          jobsAndSections: [
            {
              id: 0,
              sectionName: "string",
              sectionDescription: "string",
              jobTypesId: 0,
              createdBy: "string",
              modifiedBy: "string",
            },
          ],
        });
        if (response.data == 200) {
          console.log(response);
          return response.data;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(jobDetailsPostRequest(), {
      loading: "Adding...",
      success: () => {
        form.reset();
        return `Job Details Added`;
      },
      error: "Error, cannot add the jobs details, try again alter",
    });
  }
  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Jobs Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        {/* <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Job Details
        </p> */}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 mb-20"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="jobName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Name</FormLabel>
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
            <FormField
              control={form.control}
              name="jobSubCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job SubCategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90vw] md:w-[30vw] lg:w-[24vw]">
                        <SelectValue placeholder="Select Job SubCategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["e", "f", "g", "h"].map((letter) => (
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
          <div className="flex flex-wrap items-center justify-center gap-12">
            <FormField
              control={form.control}
              name="jobUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90vw] md:w-[30vw] lg:w-[24vw]">
                        <SelectValue placeholder="Select Job Company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["i", "j", "k", "l"].map((letter) => (
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

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={clsx(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick and End Date</span>
                          )}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date)=>(date > new Date() || date < new Date("1900-01-01 "))}
                        disabled={(date) => date < new Date("1900-01-01 ")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <section className="c">
            <p className="font-semibold pb-12">
              Sections For Extra Job Information{" "}
            </p>
            <div className="space-y-4 ">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border rounded-xl p-4 flex items-center  justify-around "
                >
                  <section className="flex flex-col  justify-start  space-y-12">
                    <FormItem>
                      <FormLabel>Job Section Name</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            `jobSections.${index}.jobSectionName` as const
                          )}
                          defaultValue={field.jobSectionName}
                          className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {/* <div className=""> */}
                    <FormItem>
                      <FormLabel>Job Section Description</FormLabel>
                      <FormControl>
                        <ReactQuill
                          theme="snow"
                          style={{ width: "40vw" }}
                          defaultValue={field.jobSectionDescription}
                          onChange={(value) =>
                            form.setValue(
                              `jobSections.${index}.jobSectionDescription`,
                              value
                            )
                          }
                          onBlur={() =>
                            form.trigger(
                              `jobSections.${index}.jobSectionDescription`
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {/* </div> */}
                  </section>

                  <div className="">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(index)}
                      >
                        Remove Section
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button
                variant="secondary"
                type="button"
                onClick={() =>
                  append({
                    jobSectionName: "",
                    jobSectionDescription: "",
                  })
                }
              >
                Add New Section
              </Button>
            </div>
          </section>

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
