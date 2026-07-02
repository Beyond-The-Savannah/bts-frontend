"use server";

import { db } from "@/db/db";
import {
  accountSettingsTable,
  candidatesProfileTable,
  subscriptionsProp,
  subscriptionsTable,
  usersProp,
  usersTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
// import { utapi } from "~/server/uploadthing.ts";
import { UTApi } from "uploadthing/server";


const utapi= new UTApi()

export async function AddUserAndSubscriptionToDb(
  userData: Omit<usersProp, "id" | "createdDate" | "updatedDate">,
  subscriptionData: Omit<
    subscriptionsProp,
    "id" | "createdDate" | "updatedDate" | "userId"
  >,
) {
  try {
    const userResult = await db
      .insert(usersTable)
      .values({
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailAddress: userData.emailAddress,
      })
      .onConflictDoUpdate({
        target: usersTable.emailAddress,
        set: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          emailAddress: userData.emailAddress,
        },
      })
      .returning({ insertedId: usersTable.id });

    if (userResult.length === 0) throw new Error("Failed to insert user data");

    const userId = userResult[0].insertedId;

    await db
      .insert(accountSettingsTable)
      .values({
        userId: userId,
      })
      .onConflictDoNothing();

    await db.insert(subscriptionsTable).values({
      userId: userId,
      subscriptionTransactionReference:
        subscriptionData.subscriptionTransactionReference,
      subcriptionTierName: subscriptionData.subcriptionTierName,
      subcriptionTierType: subscriptionData.subcriptionTierType,
      subscriptionPrice: subscriptionData.subscriptionPrice,
      subscriptionStatus: subscriptionData.subscriptionStatus,
      subscriptionCanceledAt: subscriptionData.subscriptionCanceledAt,
      subscriptionStartDate: subscriptionData.subscriptionStartDate,
      subscriptionEndDate: subscriptionData.subscriptionEndDate,
    });
  } catch (error) {
    console.error("Error adding user and subscription data to db - ", error);
    return { success: false, error: "data insersion failed", status: 400 };
  }
}



export async function UpdateUsersJobEmailNotificationCareer({
  userId,
  career,
}: {
  userId: string;
  career: string;
}) {
  try {
    await db.insert(accountSettingsTable).values({
      userId,
      careerEmailNotification:career,
    }).onConflictDoUpdate({
      target:accountSettingsTable.userId,
      set:{
        careerEmailNotification:career
      }
    })
    return {success:true}
    // await db
    //   .update(accountSettingsTable)
    //   .set({ careerEmailNotification: career })
    //   .where(eq(accountSettingsTable.userId, userId));
    //   return {success:true}
  } catch (error) {
    console.error("Error updating user account settings - ", error);
    return { success: false, error: "update failed", status: 400 };
  }
}

export async function UpdateUsersEmailNotification({
  userId,
  acceptEmailNotification,
}: {
  userId: string;
  acceptEmailNotification: boolean;
}) {
  try {
    const result = await db.update(accountSettingsTable).set({
      acceptEmailNotification:acceptEmailNotification?true:false,
    }).where(eq(accountSettingsTable.userId,userId)).returning({accountId: accountSettingsTable.id})
    return {success:true, accountId:result[0].accountId}
  } catch (error) {
    console.error("Error updating user account settings - ", error);
    return { success: false, error: "update failed", status: 400 };
  }
}

export async function AddAndUpdateUsersResume({  userId,data,}: {
  userId: string;
  data: {name:string,ufsUrl:string,key:string};
}){
  try {
    await db.insert(candidatesProfileTable).values({
      userId,
      resumeName:data.name,
      resumeUrl:data.ufsUrl,
      fileKey:data.key
    })
    .onConflictDoUpdate({
      target:candidatesProfileTable.userId,
      set:{
        resumeName:data.name,
      resumeUrl:data.ufsUrl,
      fileKey:data.key
      }
    })
    
    return{success:true}
  } catch (error) {
    console.error("Failed to update ",error)
    return {success:false,error:"update failed - ",status:400}
  }
}

export async function RemoveUserResume(fileKey:string){
  try {
    await utapi.deleteFiles(fileKey)

    const data=await db.delete(candidatesProfileTable)
    .where(eq(candidatesProfileTable.fileKey,fileKey))
    .returning({deletedFileKey:candidatesProfileTable.id})
    return data
  } catch (error) {
    console.error("Failed to delete resume", error)
    return {success:false,error:"Failed to delete resume",status:400}
  }
}


export async function UpdateSubscriptionDetails(channel:string,reference:string){
  const updatedSubscriptionId=await db.update(subscriptionsTable)
  .set({
    subscriptionPaymentChannel:channel,
  })
  .where(eq(subscriptionsTable.subscriptionTransactionReference,reference))
  .returning({ id: subscriptionsTable.id })
  return updatedSubscriptionId
}