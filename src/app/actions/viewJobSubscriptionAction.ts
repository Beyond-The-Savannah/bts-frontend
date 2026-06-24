"use server";

import { db } from "@/db/db";
import {
  accountSettingsTable,
  subscriptionsProp,
  subscriptionsTable,
  usersProp,
  usersTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

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
    await db
      .update(accountSettingsTable)
      .set({ careerEmailNotification: career })
      .where(eq(accountSettingsTable.userId, userId));
  } catch (error) {
    console.error("Error updating user account settings - ", error);
    return { success: false, error: "update failed", status: 400 };
  }
}
