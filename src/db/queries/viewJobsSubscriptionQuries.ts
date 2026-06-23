import { eq } from "drizzle-orm";
import { db } from "../db";
import { subscriptionsTable, usersTable } from "../schema";

export async function GetSubscriptionDetails(userEmail: string) {
  const data = await db
    .select({
        plan:subscriptionsTable.subcriptionTierName,
        planCost:subscriptionsTable.subscriptionPrice,
        planStatus:subscriptionsTable.subscriptionStatus,
        endDate:subscriptionsTable.subscriptionEndDate,
        emailAddress:usersTable.emailAddress,
    })
    .from(subscriptionsTable)
    .leftJoin(usersTable,eq(subscriptionsTable.userId,usersTable.id))
    .where(eq(usersTable.emailAddress,userEmail))
  return data;
}
