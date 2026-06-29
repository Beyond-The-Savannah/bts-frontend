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


// customId
// : 
// null
// fileHash
// : 
// "00c95dc841d5828c15ff462df0809948"
// key
// : 
// "qr8Sl6rtrb6LIdAUrUqqvkbQjGDEoiO74W8axKeNm6HlB1F0"
// lastModified
// : 
// 1780924373255
// name
// : 
// "Lavendar Otieno CV.pdf"
// serverData
// : 
// null
// size
// : 
// 84990
// type
// : 
// "application/pdf"
// ufsUrl
// : 
// "https://boqc3na5ns.ufs.sh/f/qr8Sl6rtrb6LIdAUrUqqvkbQjGDEoiO74W8axKeNm6HlB1F0"
// url
// : 
// (...)