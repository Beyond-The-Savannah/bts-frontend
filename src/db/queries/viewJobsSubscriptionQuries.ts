import { eq } from "drizzle-orm";
import { db } from "../db";
import { accountSettingsTable, candidatesProfileTable, subscriptionsTable, usersTable } from "../schema";


export async function GetSubscriptionDetails(userEmail: string) {
  const data = await db
    .select({
        userId:subscriptionsTable.userId,
        plan:subscriptionsTable.subcriptionTierName,
        planCost:subscriptionsTable.subscriptionPrice,
        planStatus:subscriptionsTable.subscriptionStatus,
        endDate:subscriptionsTable.subscriptionEndDate,
        emailAddress:usersTable.emailAddress,
        firstName:usersTable.firstName,
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

export async function GetUploadedResume(userEmail:string){
  const data=await db.select({
    resumeName:candidatesProfileTable.resumeName,
    resumeUrl:candidatesProfileTable.resumeUrl,
    fileKey:candidatesProfileTable.fileKey
  }).from(candidatesProfileTable)
  .leftJoin(usersTable,eq(candidatesProfileTable.userId,usersTable.id))
  .where(eq(usersTable.emailAddress,userEmail))
  return data
}

export async function GetUserEmailNotificationDetails(){
  const data= await db.select({
    firstName:usersTable.firstName,
    emailAddress:usersTable.emailAddress,
    careerEmailNotification:accountSettingsTable.careerEmailNotification,
    acceptEmailNotification:accountSettingsTable.acceptEmailNotification,
    subscriptionStatus:subscriptionsTable.subscriptionStatus,
    subcriptionTierName:subscriptionsTable.subcriptionTierName
  }).from(usersTable)
  .leftJoin(subscriptionsTable,eq(subscriptionsTable.userId,usersTable.id))
  .leftJoin(accountSettingsTable,eq(accountSettingsTable.userId,usersTable.id))

  return data
}

export async function GetSubscriptionInformationDetails(){
  const data=await db.select({
    subscriptionId:subscriptionsTable.id,
    subscriptionTransactionReference:subscriptionsTable.subscriptionTransactionReference,
    subscriptionEndDate:subscriptionsTable.subscriptionEndDate,
  })
  .from(subscriptionsTable)
  .where(eq(subscriptionsTable.subscriptionStatus,"active"))
  return data
}


export async function ExpiredSubscriptionDetails(subscriptionId: string){
  const data=await db.update(subscriptionsTable)
  .set({subscriptionStatus:"cancelled"})
  .where(eq(subscriptionsTable.id,subscriptionId))
  .returning({subscriptionId:subscriptionsTable.id})
  return data
}