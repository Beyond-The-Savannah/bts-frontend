import { db } from "../db";
import { candidatePoolTable, jobsTable } from "../schema";

export async function GetEmpolyerJobs() {
  const data = await db.select().from(jobsTable);
  return data;
}

export async function GetCandidatesPool(){
  const data=await db.select().from(candidatePoolTable)
  return data
}