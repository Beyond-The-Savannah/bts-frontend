import CompanyDetailsForm from "@/components/Admin/CompanyDetailsForm";
import JobDetailsForm from "@/components/Admin/JobDetailsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function AdminDefaultpage() {
  return (
    <>
      <section className="px-4 space-y-6">
        <div className="grid place-content-center ">
          <p className="text-center m">Admin Home Page</p>
        </div>
        <div className="c">
          <Tabs defaultValue="companyDetails" className="w-full">
            <TabsList>
              <TabsTrigger value="companyDetails">Company Details</TabsTrigger>
              <TabsTrigger value="jobDetails">Job Details</TabsTrigger>
            </TabsList>
            <TabsContent value="companyDetails">
              <CompanyDetailsForm />
            </TabsContent>
            <TabsContent value="jobDetails">
              <JobDetailsForm/>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
