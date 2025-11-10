import { db } from "../db";
import { jobsTable } from "../schema";

export async function GetEmpolyerJobs() {
  const data = await db.select().from(jobsTable);
  return data;
}
