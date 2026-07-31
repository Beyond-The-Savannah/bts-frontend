import { db } from "@/db/db";
import { candidatePoolTable } from "@/db/schema";
import { ne } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const data = await db
    .select()
    .from(candidatePoolTable)
    .where(ne(candidatePoolTable.resumeLink, ""))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return Response.json(data);
}
