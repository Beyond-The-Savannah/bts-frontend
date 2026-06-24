import { eq } from "drizzle-orm";
import { db } from "../db";
import { accountSettingsTable, subscriptionsTable, usersTable } from "../schema";

export async function GetSubscriptionDetails(userEmail: string) {
  const data = await db
    .select({
        userId:subscriptionsTable.userId,
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

export async function GetSelectedCareerEmailNotification(userEmail:string){
  const data=await db.select({
    careerEmailNotification:accountSettingsTable.careerEmailNotification,
    acceptEmailNotification:accountSettingsTable.acceptEmailNotification
  })
  .from(accountSettingsTable)
  .leftJoin(usersTable,eq(accountSettingsTable.userId,usersTable.id))
  .where(eq(usersTable.emailAddress,userEmail))
  return data
}