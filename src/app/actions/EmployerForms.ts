"use server";

import { db } from "@/db/db";
import {  candidatePoolTable, CandidateProp, CompanyProp, companyTable, JobsProp, jobsTable } from "@/db/schema";

export async function AddNewJobForm(data:Omit<JobsProp, 'id'|'createdAt'|'updatedAt'>) {
// export async function AddNewJobForm(data: { deadLine: string; companyName: string; role: string; workMode: string; department: string; jobDetails: string; }) {
  try {
   await db.insert(jobsTable).values({
      role: data.role,
      companyName:data.companyName,
      companyOrganizationId:data.companyOrganizationId,
      companyLogo:data.companyLogo,
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
    photoLink:data.photoLink,
    photoName:data.photoName,
    country:data.country,
    profession:data.profession,
    experienceYears:data.experienceYears,
    certifications:data.certifications,
    workExperience:data.workExperience
  })
} catch (error) {
  console.log('Error in AddCandidatesProfile Server Action -EmloyerSection',error)
  return error
}
}

export async function AddCompanyProfile(data:Omit<CompanyProp, 'id'|'createdAt'|'updatedAt'>){
  try {
    await db.insert(companyTable).values({
      name:data.name,
      location:data.location,
      companyLogo:data.companyLogo,
      // teamMembers:data.teamMembers
    })
  } catch (error) {
    console.log('Error in AddCompanyProfile Server Action -EmployerSection',error)
    return error
  }

}