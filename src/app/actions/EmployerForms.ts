"use server";

import { db } from "@/db/db";
import {  candidatePoolTable, CandidateProp, JobsProp, jobsTable } from "@/db/schema";

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

export async function AddCandidatesProfile(data:Omit<CandidateProp, 'id'|'createdAt'|'updatedAt'>){
try {
  await db.insert(candidatePoolTable).values({
    firstName:data.firstName,
    lastName:data.lastName,
    email:data.email,
    phone:data.phone,
    resumeLink:data.resumeLink,
    resumeName:data.resumeName,
    country:data.country,
    profession:data.profession,
    experienceYears:data.experienceYears,
    certifications:data.certifications
  })
} catch (error) {
  console.log('Error in AddCandidatesProfile Server Action -EmloyerSection',error)
}
}