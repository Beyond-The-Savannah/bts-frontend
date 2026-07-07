// app/api/sync-users/route.ts
// import { NextResponse } from "next/server";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUser } from "@/types/globals";
import { serve } from "@upstash/workflow/nextjs";

// const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
// const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;


export const { POST } = serve(async (context) => {
  // 1. Fetch only raw emails from DB
  const existingEmails = await context.run("Get existing emails from DB", async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
      { timeout: 25000 } 
    );
    const users = Array.isArray(response.data) ? response.data : [];
    return users.map((u: SubscribedUserProp) => u.email?.toLowerCase()).filter(Boolean);
  });

  // 2. Fetch Paystack subscriptions
  const paystackData = await context.run("Get raw subscriptions from paystack", async () => {
    const paystackResponse = await axios.get(
      `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
      { timeout: 25000 }
    );
    const subs = (paystackResponse.data?.data as SubscribedUser[]) || [];

    return subs.map((sub) => ({
      status: sub.status || "",
      planName: sub.plan?.name || "",
      email: sub.customer?.email || "",
      firstName: sub.customer?.first_name || "",
      lastName: sub.customer?.last_name || "",
    }));
  });

  // 3. RUN CRITICAL FILTERING 
  const existingEmailsSet = new Set(existingEmails);
  const newUsers = paystackData
    .filter((sub) => {
      const email = sub.email?.toLowerCase();
      return email && !existingEmailsSet.has(email);
    })
    .map((sub) => {
      let firstName = sub.firstName;
      let lastName = sub.lastName;

      if (!firstName && !lastName && sub.email) {
        const emailName = sub.email.split("@")[0];
        const nameParts = emailName.split(/[._-]/);
        firstName = nameParts[0] || "";
        lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      }

      // Return a plain Javascript Object mapping exactly what your FormData requires
      return {
        status: sub.status || "",
        subscriptionPlan: sub.planName || "",
        career: "0",
        email: sub.email || "",
        password: "",
        firstName: firstName || "",
        lastName: lastName || "",
        phoneNumber: "",
        AttachmentName: "",
        file: "",
        ImageUrl: "",
        IsActive: "true",
        IsDeleted: "false",
      };
    });

  // 4. Batch process updates cleanly using constructed Multipart Form Data strings
  if (newUsers.length > 0) {
    const batchSize = 6; 

    // Helper to prevent a rogue newline from breaking the multipart boundary
    const sanitizeField = (value: string) =>
      String(value ?? "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, "'");

    const buildMultipartBody = (user: Record<string, string>, boundary: string) => {
      let body = "";
      for (const [key, value] of Object.entries(user)) {
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
        body += `${sanitizeField(value)}\r\n`;
      }
      body += `--${boundary}--\r\n`;
      return body;
    };

    for (let i = 0; i < newUsers.length; i += batchSize) {
      const batchIndex = Math.floor(i / batchSize);
      const batch = newUsers.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (userToAdd, index) => {
          try {
            // Generate a unique boundary per user payload
            const boundary = `----WebKitFormBoundaryUpstashWorkflow${Date.now()}${Math.random().toString(36).slice(2)}`;
            
            // Build the stringified multipart body
            const multipartBody = buildMultipartBody(userToAdd, boundary);

            await context.call(`add-user-b${batchIndex}-i${index}`, {
              url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/addUser`,
              method: "POST",
              headers: {
                // Must pass the EXACT boundary string in the header so the API knows how to parse the payload
                "Content-Type": `multipart/form-data; boundary=${boundary}`,
              },
              body: multipartBody, 
            });
          } catch (error) {
            console.error(`Failed to update user record - ${userToAdd.email}`, error);
          }
        })
      );

      // Sleep to prevent outbound rate limits and allow Vercel execution to pause cleanly
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
