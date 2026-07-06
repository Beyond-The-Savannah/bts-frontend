// app/api/sync-users/route.ts
// import { NextResponse } from "next/server";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUser } from "@/types/globals";
import { serve } from "@upstash/workflow/nextjs";

// const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
// const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export const { POST } = serve(async (context) => {
  // 1. Fetch paystack subscriptions safely
  const subscribedUsers = await context.run("Get subscribed users from paystack", async () => {
    const paystackResponse = await axios.get(
      `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
      { timeout: 15000 },
    );
    return (paystackResponse.data?.data as SubscribedUser[]) || [];
  });

  // 2. Fetch existing database users
  const dbResponse = await context.call(
    "Get Subscribed Users from BTS DataBase",
    {
      url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
      method: "GET",
    },
  );

  // 3. Process existing user data locally (Deterministic & JSON safe)
  const databaseUsers = Array.isArray(dbResponse.body) ? dbResponse.body as SubscribedUserProp[] : [];
  const existingEmails = new Set(databaseUsers.map((user) => user.email.toLowerCase()));

  // 4. Map to clean JSON objects (NOT FormData)
  const newUsers = subscribedUsers
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

      // Return a plain object that can be safely serialized to JSON
      return {
        status: subscription.status,
        subscriptionPlan: subscription.plan.name,
        career: "0",
        email: subscription.customer.email,
        password: "",
        firstName: firstName || "",
        lastName: lastName || "",
        phoneNumber: "",
        AttachmentName: "",
        file: "",
        ImageUrl: "",
        isActive: "true",
        isDeleted: "false",
      };
    });

  // 5. Batch process updates cleanly
  if (newUsers.length > 0) {
    const batchSize = 10;

    for (let i = 0; i < newUsers.length; i += batchSize) {
      const batchIndex = Math.floor(i / batchSize);
      const batch = newUsers.slice(i, i + batchSize);

      // We use Promise.all directly on context.call (NO context.run wrapping it)
      await Promise.all(
        batch.map(async (userToAdd, index) => {
          try {
            // Deterministic Step ID using batch index and sequence index
            await context.call(`add-user-b${batchIndex}-i${index}`, {
              url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/addUser`,
              method: "POST",
              body: userToAdd, // Pass raw object. If backend strictly needs FormData, handle it at your API endpoint.
            });
          } catch (error) {
            console.error(`Failed to update user record - ${userToAdd.email}`, error);
          }
        })
      );

      // Sleep between batches if more exist
      if (i + batchSize < newUsers.length) {
        await context.sleep(`pause-batch-${batchIndex}`, 1);
      }
    }
  }
});



// export async function POST() {
//   try {
//     // 1. Fetch PayStack subscriptions
//     const res = await axios.get(`${PUBLIC_BASE_URL}/api/get-all-subscriptions`);
//     const payStackSubscribedUsers: SubscribedUser[] = await res.data.data;

//     // 2. Fetch existing users
//     const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
//     const existingUsers = await response.data;

//     // 3. Extract emails
//     const existingEmails = new Set(
//       existingUsers.map((user: SubscribedUserProp) => user.email.toLowerCase()),
//     );

//     // 4. Filter and add new users
//     const newUsers = payStackSubscribedUsers
//       .filter((subscription) => {
//         const email = subscription.customer?.email?.toLowerCase();
//         return email && !existingEmails.has(email);
//       })
//       .map((subscription) => {
//         let firstName = subscription.customer?.first_name;
//         let lastName = subscription.customer?.last_name;

//         if (!firstName && !lastName) {
//           const emailName = subscription.customer.email.split("@")[0];
//           const nameParts = emailName.split(/[._-]/);
//           firstName = nameParts[0] || "";
//           lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
//         }

//         firstName = firstName || "";
//         lastName = lastName || "";

//         const formData = new FormData();
//         formData.append("status", subscription.status);
//         formData.append("subscriptionPlan", subscription.plan.name);
//         formData.append("career", String(0));
//         formData.append("email", subscription.customer.email);
//         formData.append("password", "");
//         formData.append("firstName", firstName);
//         formData.append("lastName", lastName);
//         formData.append("phoneNumber", "");
//         formData.append("AttachmentName", "");
//         formData.append("file", "");
//         formData.append("ImageUrl", "");
//         formData.append("isActive", String(true));
//         formData.append("isDeleted", String(false));

//         return formData;
//       });

//     if (newUsers.length > 0) {
//       const results = await Promise.allSettled(
//         newUsers.map(async (user) => {
//           try {
//             const response = await axios.post(
//               `${BTS_API_URL}/api/BydUsers/addUser`,
//               user,
//               {
//                 headers: { "Content-Type": "multipart/form-data" },
//                 timeout: 10000,
//               },
//             );
//             return response.data;
//           } catch (error) {
//             console.error("Failed to add user", error);
//             throw error;
//           }
//         }),
//       );

//       const successful = results.filter((r) => r.status === "fulfilled").length;
//       const failed = results.filter((r) => r.status === "rejected").length;

//       return NextResponse.json({
//         success: true,
//         added: successful,
//         failed: failed,
//         total: newUsers.length,
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       added: 0,
//       message: "No new users to add",
//     });
//   } catch (error) {
//     console.error("Sync error:", error);
//     return NextResponse.json(
//       { success: false, error: "Sync failed" },
//       { status: 500 },
//     );
//   }
// }
