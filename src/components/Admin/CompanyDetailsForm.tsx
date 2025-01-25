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
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CompanyDetailsForm() {
  const [cDValue] = useState("");
  const form = useForm<z.infer<typeof CompanyFormSchema>>({
    resolver: zodResolver(CompanyFormSchema),
    defaultValues: {
      companyName: "",
      companyHeadQuaters: "",
      companyContactEmail: "",
      companyContactPhone: "",
      companyDescription: cDValue,
      location: "",
      imageUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof CompanyFormSchema>) {
    alert(JSON.stringify(data));
  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Company Form</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Company Details
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
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
