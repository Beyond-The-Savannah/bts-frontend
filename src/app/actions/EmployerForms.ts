"use server";

import { db } from "@/db/db";
import { jobsTable } from "@/db/schema";

// export async function AddNewJobForm(data:Omit<JobsProp, 'id'|'createdAt'|'updatedAt'>) {
export async function AddNewJobForm(data: { deadLineDate: string; companyName: string; role: string; workMode: string; department: string; jobDetails: string; }) {
  try {
   await db.insert(jobsTable).values({
      role: data.role,
      workMode: data.workMode,
      jobType: "Full Time",
      department: data.department,
      author: "current-loged-user",
      deadLine: data.deadLineDate,
      jobDetails: data.jobDetails,
      applicationLink: "",
    })
  } catch (error) {
    console.log("Error in AddNewJobForm -Employer Section", error);
  }
}
