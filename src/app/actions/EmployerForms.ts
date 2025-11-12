"use server";

import { db } from "@/db/db";
import {  JobsProp, jobsTable } from "@/db/schema";

export async function AddNewJobForm(data:Omit<JobsProp, 'id'|'createdAt'|'updatedAt'>) {
// export async function AddNewJobForm(data: { deadLine: string; companyName: string; role: string; workMode: string; department: string; jobDetails: string; }) {
  try {
   await db.insert(jobsTable).values({
      role: data.role,
      companyName:data.companyName,
      workMode: data.workMode,
      department: data.department,
      jobDetails: data.jobDetails,
      jobType:data.jobType,
      author: data.author,
      deadLine: data.deadLine,
      applicationLink: "",
    })
  } catch (error) {
    console.log("Error in AddNewJobForm -Employer Section", error);
  }
}
