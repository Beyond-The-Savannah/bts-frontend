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
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "../ui/calendar";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { toast } from "sonner";
import {
  useGetCompaniesDropDownList,
  useGetJobCategoryDropDownList,
  useGetJobSubCategoryDropDownList,
} from "@/remoteData/getData";
import { formats2, modules2 } from "@/lib/reactQuilSettings";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";




const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

export default function JobDetailsForm() {
  const [jCDValue] = useState("");
  const [jsDValue] = useState("");

  const { data: companies } = useGetCompaniesDropDownList();
  const { data: jobCategories } = useGetJobCategoryDropDownList();
  const { data: jobSubCategories } = useGetJobSubCategoryDropDownList();

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      endDate: undefined,
      jobName: "",
      jobDescription: jCDValue,
      companyId: "0",
      language: "",
      jobUrl: "",
      salary: 0,
      jobCategoriesId: "0",
      jobSubCategoryId: "0",
      jobsAndSections: [
        {
          sectionName: "",
          sectionDescription: jsDValue,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "jobsAndSections",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof JobFormSchema>) {

    console.log("JOBS DETAILS",data)
    const jobDetailsPostRequest = async () => {
      try {
        const response = await axiosInstance.post(`/api/Jobs/addJobs`, {
          jobs: {
            endDate: data.endDate,
            jobName: data.jobName,
            jobDescription: data.jobDescription,
            companyId: Number(data.companyId),
            language: "string",
            jobUrl: data.jobUrl,
            salary: 0,
            jobCategoriesId: Number(data.jobSubCategoryId),
            jobSubCategoryId: Number(data.jobSubCategoryId),
          },
          createdBy: "user",
          jobsAndSections: data.jobsAndSections.map(
            (section, index: number) => ({
              id: index,
              sectionName: section.sectionName,
              sectionDescription: section.sectionDescription,
              jobTypesId: 1,
              createdBy: "",
              modifiedBy: "",
            })
          ),
        });
        if (response.status === 200) {
          // console.log(response);
          // const {workflowRunId}=await client.trigger({
          //   url:`https://beyondthesavannah.co.ke/api/workflow-one`
          // })
          // console.log("WorkflowRundId from workflow one",workflowRunId)
          return true;
        } else {
          // console.error("Request failed with status:", response.status);
          return false;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // console.error("Axios error:", error.message);
          throw new Error(error.message);
        } else {
          // console.error("An unexpected error occurred:", error);
          throw new Error("An unexpected error occurred");
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
    {/* <div className="w-full lg:w-[70vw] mx-auto"></div> */}
      {/* <div className="mt-10 mb-20"> */}
      <div className="container mx-auto mt-10 mb-20">
        <h2 className="text-xl">Jobs Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        {/* <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Job Details
        </p> */}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log("Form Errors", errors)
          )}
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
                      className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobCategoriesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // onValueChange={(value)=> field.onChange(Number(value))}
                    // defaultValue={String(field.value)}
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
              name="jobSubCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job SubCategory</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw] mx-2 flex justify-between">
                          {field.value? jobSubCategories?.find((categrory)=>String(categrory.value)===field.value)?.label:"Select categrory"}
                          <ChevronsUpDown className="opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                      <Command>
                        <CommandInput placeholder="Search job SubCategories" className="h-9"/>
                        <CommandList>
                          <CommandEmpty>No job category found</CommandEmpty>
                          <CommandGroup>
                            {jobSubCategories?.map((categrory)=>(
                              <CommandItem key={categrory.value} value={categrory.label} onSelect={()=>{form.setValue("jobSubCategoryId",String(categrory.value))}}>
                                {categrory.label}
                                <Check className={cn("ml-auto", String(categrory.value)===field.value?"opacity-100":"opacity-0")}/>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                        <SelectValue placeholder="Select Job SubCategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobSubCategories?.map((jobSubCategory) => (
                        <SelectItem
                          key={jobSubCategory.value}
                          value={String(jobSubCategory.value)}
                        >
                          {jobSubCategory.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
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
                      className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Company</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw] mx-2 flex justify-between">
                          {field.value? companies?.find((company)=>String(company.value)===field.value)?.label:"Select company"}
                          <ChevronsUpDown className="opacity-50"/>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                      <Command>
                        <CommandInput placeholder="Search companies" className="h-9"/>
                        <CommandList>
                          <CommandEmpty>No company found</CommandEmpty>
                          <CommandGroup>
                            {companies?.map((company)=>(
                              <CommandItem key={company.value} value={company.label} onSelect={()=>{form.setValue("companyId",String(company.value))}}>
                                {company.label}
                                <Check className={cn("ml-auto", String(company.value)===field.value?"opacity-100":"opacity-0")}/>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                        <SelectValue placeholder="Select Job Company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies?.map((companies) => (
                        <SelectItem
                          key={companies.value}
                          value={String(companies.value)}
                        >
                          {companies.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
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
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="w-[95dvw] md:w-[60dvw] rounded-lg border-2"
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
                  className="border rounded-xl p-4 flex items-end  justify-start gap-4 "
                >
                  <section className="flex flex-wrap items-end  justify-evenly gap-4  space-y-12">
                    <FormItem>
                      <FormLabel>Job Section Name</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register(
                            `jobsAndSections.${index}.sectionName` as const
                          )}
                          defaultValue={field.sectionName}
                          className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]"
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
                          
                          // style={{ width: "40vw" }}
                          className="w-[95dvw] md:w-[30dvw] rounded-lg border-2"
                          defaultValue={field.sectionDescription}
                          onChange={(value) =>
                            form.setValue(
                              `jobsAndSections.${index}.sectionDescription`,
                              value
                            )
                          }
                          onBlur={() =>
                            form.trigger(
                              `jobsAndSections.${index}.sectionDescription`
                            )
                          }
                          modules={modules2}
                          formats={formats2}
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
                        size='sm'
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
                    sectionName: "",
                    sectionDescription: "",
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
            Add Job
          </Button>
        </form>
      </Form>
    </>
  );
}
