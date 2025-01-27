import CompanyDetailsForm from "@/components/Admin/CompanyDetailsForm";
import JobCategoryForm from "@/components/Admin/JobCategoryForm";
import JobDetailsForm from "@/components/Admin/JobDetailsForm";
import JobSubCategoryForm from "@/components/Admin/JobSubCategoryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function AdminDefaultpage() {
  return (
    <>
      <section className="px-4 space-y-6">
        <div className="grid place-content-center ">
          
        </div>
        <div className=" ">
          <Tabs defaultValue="companyDetails" className="">
            <TabsList className="w-[80vw] mx-auto space-x-4 transition bg-bts-BrownTwo duration-700 ease-in">
              <TabsTrigger value="companyDetails">Company Details</TabsTrigger>
              <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
              <TabsTrigger value="jobCategory">Job Category</TabsTrigger>
              <TabsTrigger value="jobSubCategory">Job subCategory</TabsTrigger>
            </TabsList>
            <TabsContent value="companyDetails">
              <CompanyDetailsForm />
            </TabsContent>
            <TabsContent value="jobDetails">
              <JobDetailsForm/>
            </TabsContent>
            <TabsContent value="jobCategory">
              <JobCategoryForm/>
            </TabsContent>
            <TabsContent value="jobSubCategory">
              <JobSubCategoryForm/>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
