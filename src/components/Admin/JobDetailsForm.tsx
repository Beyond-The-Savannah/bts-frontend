"use client";
import { JobFormSchema } from "@/formSchemas/jobListingSchema";
import React from "react";
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
import { Textarea } from "../ui/textarea";

export default function JobDetailsForm() {
  const form = useForm<z.infer<typeof JobFormSchema>>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      jobName: "",
      jobCategory: "",
      jobSubCategory: "",
      jobUrl: "",
      company: "",
      companyDescription: "",
      jobSections: [
        {
          jobSectionName: "",
          jobSectionDescription: "",
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
  }
  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Jobs Form</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Job Details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
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
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="jobUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job URL</FormLabel>
                  <FormControl>
                    <Input
                    type='url'
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
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
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
          </div>

          <section className="c">
            <p className="font-semibold">Sections For Extra Job Information </p>
            <div className="">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-wrap items-center justify-start ml-12 gap-6 space-y-12"
                >
                  <div className="mt-12">
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
                  </div>

                  <div className="">
                    <FormItem>
                      <FormLabel>Job Section Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          {...form.register(
                            `jobSections.${index}.jobSectionDescription` as const
                          )}
                          defaultValue={field.jobSectionDescription}
                          className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <div className="">
                    {index > 0 && (
                      <Button variant="outline" onClick={() => remove(index)}>
                        Remove Section
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button
                variant="secondary"
                type="submit"
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
