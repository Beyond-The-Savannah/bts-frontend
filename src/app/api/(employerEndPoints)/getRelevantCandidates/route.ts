import { db } from "@/db/db";
import { jobsTable,candidatePoolTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get("orgId") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  if (!orgId) {
    return Response.json({ error: "orgId is required" }, { status: 400 });
  }

  const relavantCandidates = await GetRelevantCandidates(orgId);
  const data = relavantCandidates
    .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  return Response.json(data);
}

export async function GetEmployerJobsDepartmentOnly(orgId:string){
const data=await db.select({department:jobsTable.department}).from(jobsTable).where(eq(jobsTable.companyOrganizationId,orgId))
return data
}

export async function GetCandidatesPool(){
  const data=await db.select().from(candidatePoolTable).orderBy(desc(candidatePoolTable.updatedAt))
  return data
}

export async function GetRelevantCandidates(orgId: string) {
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

