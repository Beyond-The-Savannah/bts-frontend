import { db } from "@/db/db";
import { candidatePoolTable } from "@/db/schema";
import { ilike } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobDepartment = searchParams.get("jobDepartment") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const data = await db
    .select()
    .from(candidatePoolTable)
    .where(ilike(candidatePoolTable.profession, `%${jobDepartment}%`))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return Response.json(data);
}
