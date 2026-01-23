// app/api/sync-users/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { SubscribedUserProp } from '@/types/subscribedUser';
import { SubscribedUser } from '@/types/globals';

const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export async function POST() {
  try {
    // 1. Fetch PayStack subscriptions
    const res = await axios.get(
      `${PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`
    );
    const payStackSubscribedUsers:SubscribedUser[] = await res.data.data;

    // 2. Fetch existing users
    const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
    const existingUsers = await response.data;

    // 3. Extract emails
    const existingEmails = new Set(
      existingUsers.map((user:SubscribedUserProp) => user.email.toLowerCase())
    );

    // 4. Filter and add new users
    const newUsers = payStackSubscribedUsers
      .filter((subscription) => {
        const email = subscription.customer?.email?.toLowerCase();
        return email && !existingEmails.has(email);
      })
      .map((subscription) => {
        let firstName = subscription.customer?.first_name;
        let lastName = subscription.customer?.last_name;

        if (!firstName && !lastName) {
          const emailName = subscription.customer.email.split("@")[0];
          const nameParts = emailName.split(/[._-]/);
          firstName = nameParts[0] || "";
          lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
        }

        firstName = firstName || "";
        lastName = lastName || "";

        const formData = new FormData();
        formData.append("status", subscription.status);
        formData.append("subscriptionPlan", subscription.plan.name);
        formData.append("career", String(0));
        formData.append("email", subscription.customer.email);
        formData.append("password", "");
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("phoneNumber", "");
        formData.append("AttachmentName", "");
        formData.append("file", "");
        formData.append("ImageUrl", "");
        formData.append("isActive", String(true));
        formData.append("isDeleted", String(false));

        return formData;
      });

    if (newUsers.length > 0) {
      const results = await Promise.allSettled(
        newUsers.map(async (user) => {
          try {
            const response = await axios.post(
              `${BTS_API_URL}/api/BydUsers/addUser`,
              user,
              {
                headers: { "Content-Type": "multipart/form-data" },
                timeout: 10000,
              }
            );
            return response.data;
          } catch (error) {
            console.error("Failed to add user", error);
            throw error;
          }
        })
      );

      const successful = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;

      return NextResponse.json({
        success: true,
        added: successful,
        failed: failed,
        total: newUsers.length,
      });
    }

    return NextResponse.json({
      success: true,
      added: 0,
      message: "No new users to add",
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json(
      { success: false, error: "Sync failed" },
      { status: 500 }
    );
  }
}