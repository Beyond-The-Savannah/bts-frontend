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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { JobDetailsProps } from "@/types/globals";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});


export default function JobDetailsForm({jobDetails}:JobDetailsProps) {
  const [jCDValue] = useState("");
  const [jsDValue] = useState("");

  const { data: companies } = useGetCompaniesDropDownList();
  const { data: jobCategories } = useGetJobCategoryDropDownList();
  const { data: jobSubCategories } = useGetJobSubCategoryDropDownList();
  const { user } = useUser();

  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: jobDetails ? {
      endDate: new Date(jobDetails.endDate as string),
      jobName: jobDetails.jobName,
      jobDescription: jobDetails.jobDescription || jCDValue,
      companyId: jobDetails.companyId?.toString(),
      // language: jobDetails.language,
      language: "",
      jobUrl:jobDetails.jobUrl,
      salary: jobDetails.salary,
      jobCategoriesId: jobDetails.jobCategoriesId?.toString(),
      jobSubCategoryId: jobDetails.jobSubCategoryId?.toString(),
      jobsAndSections: jobDetails ?(jobDetails?.jobsAndSections?.map((section,index:number)=>({
        id:index,
        sectionName: section.sectionName,
        sectionDescription: section.sectionDescription,
        jobTypesId: section.jobTypesId,
        createdBy: section.createdBy,
        modifiedBy: section.modifiedBy,
      }))):([
        {
          sectionName: "",
          sectionDescription: jsDValue,
        }
      ]), 
      
    }:undefined,
    // defaultValues: {
    //   endDate: undefined,
    //   jobName: "",
    //   jobDescription: jCDValue,
    //   companyId: "0",
    //   language: "",
    //   jobUrl: "",
    //   salary: 0,
    //   jobCategoriesId: "0",
    //   jobSubCategoryId: "0",
    //   jobsAndSections: [
    //     {
    //       sectionName: "",
    //       sectionDescription: jsDValue,
    //     },
    //   ],
    // },
  });

  const { formState } = form;

  const { fields, append, remove } = useFieldArray({
    name: "jobsAndSections",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof JobFormSchema>) {
    if(jobDetails){
      const jobDetailsPutRequest= async ()=>{
        try {
          const response= await axiosInstance.put(`/api/Jobs/udateJobs?jobId=${jobDetails.jobsId}`,{
            jobs:{
              endDate: data.endDate,
              jobName: data.jobName,
              jobDescription: data.jobDescription,
              companyId: data.companyId,
              language: "",
              jobUrl: data.jobUrl,
              salary: data.salary,
              jobCategoriesId: Number(data.jobCategoriesId),
              jobSubCategoryId: Number(data.jobSubCategoryId)
            },
            createdBy:user?.fullName,
            jobsAndSections: data.jobsAndSections.map((section, index:number)=>({
              id:index,
              sectionName:section.sectionName,
              sectionDescription:section.sectionDescription,
              jobTypesId:1,
              createdBy:user?.fullName,
              modifiedBy:user?.fullName
            }))
          })
          if(response.data.errorCode==500){
            toast.error(`Error updating ${jobDetails.jobName} details, please try again later`)
          }
          console.log("Editing JOBDETAILSFORM", response)
          return response
        } catch (error) {
          if(axios.isAxiosError(error)){
              throw new Error(error.message)
          }else{throw new Error("An unexpected error occurred in the put request of JobsDetailsForm")}
        }
      } 
      toast.promise(jobDetailsPutRequest(),{
        loading:"Updating...",
        success:(response)=>{
          if(response?.data?.errorCode==201){
            return(`Job Details Updated for ${jobDetails.jobName}`)
          }
        },
        error:(response)=>{
          if(response?.data?.errorCode==500){
          return(`Error cannot update job details of ${jobDetails.jobName}`)
          }
        }
      })
    }
    else{

      const jobDetailsPostRequest = async () => {
        try {
          const response = await axiosInstance.post(`/api/Jobs/addJobs`, {
            jobs: {
              endDate: data.endDate,
              jobName: data.jobName,
              jobDescription: data.jobDescription,
              companyId: Number(data.companyId),
              language: "",
              jobUrl: data.jobUrl,
              salary: 0,
              jobCategoriesId: Number(data.jobCategoriesId),
              jobSubCategoryId: Number(data.jobSubCategoryId),
            },
            createdBy: user?.fullName,
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
  
          // console.log("JOBS DETAILS FORM RESPONSE",response)
  
          if (response.data.errorCode == 500) {
            toast.error(
              "Error adding current job deatils, please try again later"
            );
          }
          return response;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // console.error("Axios error:", error.message);
            throw new Error(error.message);
          } else {
            // console.error("An unexpected error occurred:", error);
            throw new Error("An unexpected error occurred in the post request of JobsDetailsForm");
          }
        }
      };
      toast.promise(jobDetailsPostRequest(), {
        loading: "Adding...",
        success: (response) => {
          if (response.data.errorCode == 201) {
            form.reset();
            return `Job Details Added`;
          }
        },
        error: (response) => {
          if (response.data.errorCode == 500) {
            return "Error, cannot add current job details,";
          }
        },
      });
    }
  }
  return (
    <>
      <div className="container mx-auto mt-10 mb-20">
        <h2 className="text-xl">Jobs Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log("Form Errors", errors)
          )}
          className="space-y-12 mb-20"
        >
          <div className="flex flex-wrap items-center justify-evenly gap-6">
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
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw] mx-2 flex justify-between"
                        >
                          {field.value
                            ? jobSubCategories?.find(
                                (categrory) =>
                                  String(categrory.value) === field.value
                              )?.label
                            : "Select categrory"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                      <Command>
                        <CommandInput
                          placeholder="Search job SubCategories"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No job category found</CommandEmpty>
                          <CommandGroup>
                            {jobSubCategories?.map((categrory) => (
                              <CommandItem
                                key={categrory.value}
                                value={categrory.label}
                                onSelect={() => {
                                  form.setValue(
                                    "jobSubCategoryId",
                                    String(categrory.value)
                                  );
                                }}
                              >
                                {categrory.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    String(categrory.value) === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
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
          <div className="flex flex-wrap items-center justify-evenly gap-12">
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
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw] mx-2 flex justify-between"
                        >
                          {field.value
                            ? companies?.find(
                                (company) =>
                                  String(company.value) === field.value
                              )?.label
                            : "Select company"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[90dvw] md:w-[30dvw] lg:w-[22dvw]">
                      <Command>
                        <CommandInput
                          placeholder="Search companies"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No company found</CommandEmpty>
                          <CommandGroup>
                            {companies?.map((company) => (
                              <CommandItem
                                key={company.value}
                                value={company.label}
                                onSelect={() => {
                                  form.setValue(
                                    "companyId",
                                    String(company.value)
                                  );
                                }}
                              >
                                {company.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    String(company.value) === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
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
                          {(field.value && !isNaN(new Date(field.value).getTime())) ? (
                            // format(field.value, "PPP")
                            format(new Date(field.value), "PPP")
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
                        size="sm"
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

          {jobDetails ?
          (
          <Button
            type="submit"
            className="bg-bts-BrownThree hover:bg-green-800"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Editing Job..." : "Edit Job"}
            {/* Add Job */}
          </Button>
          )
          :
          (

          <Button
            type="submit"
            className="bg-bts-BrownThree hover:bg-green-800"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Adding Job..." : "Add Job"}
            {/* Add Job */}
          </Button>
          )
          }
        </form>
      </Form>
    </>
  );
}
