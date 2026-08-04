import { db } from "@/db/db";
import { jobsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get("orgId") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  
  const data = await db
    .select()
    .from(jobsTable)
    .where(eq(jobsTable.companyOrganizationId, orgId))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return Response.json(data);
}
