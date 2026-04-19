import { desc, eq, ilike, ne } from "drizzle-orm";
import { db } from "../db";
import { candidatePoolTable, jobsTable } from "../schema";

export async function GetEmpolyerJobs(orgId:string) {
  "use cache"
  const data = await db.select().from(jobsTable).where(eq(jobsTable.companyOrganizationId,orgId));
  return data;
}

export async function GetEmployerJobsDepartmentOnly(orgId:string){
  "use cache"
const data=await db.select({department:jobsTable.department}).from(jobsTable).where(eq(jobsTable.companyOrganizationId,orgId))
return data
}

export async function GetCandidatesPool(){
  "use cache"
  const data=await db.select().from(candidatePoolTable).orderBy(desc(candidatePoolTable.updatedAt))
  return data
}
export async function GetCandidatesWithResume(){
  "use cache"
  const data= await db.select().from(candidatePoolTable).where(ne(candidatePoolTable.resumeLink,''))
  return data
}
export async function GetCandidatesWithOutResume(){
  "use cache"
  const data= await db.select().from(candidatePoolTable).where(eq(candidatePoolTable.resumeLink,''))
  return data
}
export async function GetCandidateBYEmail(email:string){
  "use cache"
  const data=await db.select().from(candidatePoolTable).where(eq(candidatePoolTable.email,email))
  return data
}

export async function GetCandidatesBasedOnJobDepartment(jobDepartment:string){
  "use cache"
  const data=await db.select().from(candidatePoolTable).where(ilike(candidatePoolTable.profession,`%${jobDepartment}%`))
  return data
}

// export async function GetRelevantCandidates(orgId: string) {
//   const allJobsByEmployer = await GetEmployerJobsDepartmentOnly(orgId);
//   const allCandidates = await GetCandidatesPool();
//   const uniqueDepartments = [...new Set(allJobsByEmployer.map(job => job.department))];
  
//   const relavantCandidates = allCandidates.filter((candidate) =>
//     uniqueDepartments.includes(candidate.profession as string),
//   );
//   return relavantCandidates;
// }


export async function GetRelevantCandidates(orgId: string) {
  "use cache"
  const allJobsByEmployer = await GetEmployerJobsDepartmentOnly(orgId);
  const allCandidates = await GetCandidatesPool();
  const uniqueDepartments = [...new Set(allJobsByEmployer.map(job => job.department))];
  
  const relavantCandidates = allCandidates.filter((candidate) =>{
    const profession=(candidate.profession as string).toLowerCase()
    /*The some method checks if any of the unique departments from the employer's jobs are included in 
    the candidate's profession. It returns true if there is a match, indicating that the candidate is
     relevant to at least one of the job departments, and false otherwise. The includes then checks
     if a substring of the deparyment name exists within the candidate's profession*/
    return uniqueDepartments.some(department=>profession.includes(department.toLowerCase()))

  }
  );
  return relavantCandidates;
}
