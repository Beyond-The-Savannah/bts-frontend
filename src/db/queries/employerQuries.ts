import { eq } from "drizzle-orm";
import { db } from "../db";
import { candidatePoolTable, jobsTable } from "../schema";

export async function GetEmpolyerJobs(orgId:string) {
  const data = await db.select().from(jobsTable).where(eq(jobsTable.companyOrganizationId,orgId));
  return data;
}

export async function GetEmployerJobsDepartmentOnly(orgId:string){
const data=await db.select({department:jobsTable.department}).from(jobsTable).where(eq(jobsTable.companyOrganizationId,orgId))
return data
}

export async function GetCandidatesPool(){
  const data=await db.select().from(candidatePoolTable)
  return data
}

export async function GetCandidatesBasedOnJobDepartment(jobDepartment:string){
  const data=await db.select().from(candidatePoolTable).where(eq(candidatePoolTable.profession,jobDepartment))
  return data
}

// lib/data.ts
export async function GetRelevantCandidates(orgId: string) {
  const allJobsByEmployer = await GetEmployerJobsDepartmentOnly(orgId);
  const uniqueDepartments = [...new Set(allJobsByEmployer.map(j => j.department))];
  const allCandidates = await GetCandidatesPool();
  
  const relavantCandidates = allCandidates.filter((candidate) =>
    uniqueDepartments.includes(candidate.profession),
  );
  return relavantCandidates;
}
