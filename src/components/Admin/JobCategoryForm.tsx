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
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function JobCategoryForm() {
  const form = useForm<z.infer<typeof JobCategoryFormSchema>>({
    resolver: zodResolver(JobCategoryFormSchema),
    defaultValues: {
      categoryName: "",
      categoryDescription: "",
    },
  });

  function onSubmit(data: z.infer<typeof JobCategoryFormSchema>) {
    alert(JSON.stringify(data));
  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Jobs Category Form</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Job Category Details
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <FormField
              control={form.control}
              name="categoryName"
              render={({field}) => (
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} className="w-[90vw] md:w-[30vw] lg:w-[34vw]" />
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
