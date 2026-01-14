import { eq } from "drizzle-orm";
import { db } from "../db";
import { candidatePoolTable, jobsTable } from "../schema";

export async function GetEmpolyerJobs(orgId:string) {
  const data = await db.select().from(jobsTable).where(eq(jobsTable.companyOrganizationId,orgId));
  return data;
}

export async function GetCandidatesPool(){
  const data=await db.select().from(candidatePoolTable)
  return data
}