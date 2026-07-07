// app/api/sync-users/route.ts
// import { NextResponse } from "next/server";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUser } from "@/types/globals";
import { serve } from "@upstash/workflow/nextjs";

// const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
// const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;


// export const { POST } = serve(async (context) => {
//   // 1. Fetch only raw emails from DB
//   const existingEmails = await context.run("Get existing emails from DB", async () => {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
//       { timeout: 25000 } 
//     );
//     const users = Array.isArray(response.data) ? response.data : [];
//     return users.map((u: SubscribedUserProp) => u.email?.toLowerCase()).filter(Boolean);
//   });

//   // 2. Fetch Paystack subscriptions
//   const paystackData = await context.run("Get raw subscriptions from paystack", async () => {
//     const paystackResponse = await axios.get(
//       `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
//       { timeout: 25000 }
//     );
//     const subs = (paystackResponse.data?.data as SubscribedUser[]) || [];

//     return subs.map((sub) => ({
//       status: sub.status || "",
//       planName: sub.plan?.name || "",
//       email: sub.customer?.email || "",
//       firstName: sub.customer?.first_name || "",
//       lastName: sub.customer?.last_name || "",
//     }));
//   });

//   // 3. RUN CRITICAL FILTERING 
//   const existingEmailsSet = new Set(existingEmails);
//   const newUsers = paystackData
//     .filter((sub) => {
//       const email = sub.email?.toLowerCase();
//       return email && !existingEmailsSet.has(email);
//     })
//     .map((sub) => {
//       let firstName = sub.firstName;
//       let lastName = sub.lastName;

//       if (!firstName && !lastName && sub.email) {
//         const emailName = sub.email.split("@")[0];
//         const nameParts = emailName.split(/[._-]/);
//         firstName = nameParts[0] || "";
//         lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
//       }

//       // Return a plain Javascript Object mapping exactly what your FormData requires
//       return {
//         status: sub.status || "",
//         subscriptionPlan: sub.planName || "",
//         career: "0",
//         email: sub.email || "",
//         password: "",
//         firstName: firstName || "",
//         lastName: lastName || "",
//         phoneNumber: "",
//         AttachmentName: "",
//         file: "",
//         ImageUrl: "",
//         IsActive: "true",
//         IsDeleted: "false",
//       };
//     });

//   // 4. Batch process updates cleanly using constructed Multipart Form Data strings
//   if (newUsers.length > 0) {
//     const batchSize = 6; 

//     // Helper to prevent a rogue newline from breaking the multipart boundary
//     const sanitizeField = (value: string) =>
//       String(value ?? "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, "'");

//     const buildMultipartBody = (user: Record<string, string>, boundary: string) => {
//       let body = "";
//       for (const [key, value] of Object.entries(user)) {
//         body += `--${boundary}\r\n`;
//         body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
//         body += `${sanitizeField(value)}\r\n`;
//       }
//       body += `--${boundary}--\r\n`;
//       return body;
//     };

//     for (let i = 0; i < newUsers.length; i += batchSize) {
//       const batchIndex = Math.floor(i / batchSize);
//       const batch = newUsers.slice(i, i + batchSize);

//       await Promise.all(
//         batch.map(async (userToAdd, index) => {
//           try {
//             // Generate a unique boundary per user payload
//             const boundary = `----WebKitFormBoundaryUpstashWorkflow${Date.now()}${Math.random().toString(36).slice(2)}`;
            
//             // Build the stringified multipart body
//             const multipartBody = buildMultipartBody(userToAdd, boundary);

//             await context.call(`add-user-b${batchIndex}-i${index}`, {
//               url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/addUser`,
//               method: "POST",
//               headers: {
//                 // Must pass the EXACT boundary string in the header so the API knows how to parse the payload
//                 "Content-Type": `multipart/form-data; boundary=${boundary}`,
//               },
//               body: multipartBody, 
//             });
//           } catch (error) {
//             console.error(`Failed to update user record - ${userToAdd.email}`, error);
//           }
//         })
//       );

//       // Sleep to prevent outbound rate limits and allow Vercel execution to pause cleanly
//       if (i + batchSize < newUsers.length) {
//         await context.sleep(`pause-batch-${batchIndex}`, 1);
//       }
//     }
//   }
// });

// export const { POST } = serve(async (context) => {

//   //0 Fetch the users id email and status
//   const existingUsers = await context.run("Get existing users from DB", async () => {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
//       { timeout: 25000 } 
//     );
//     const users = Array.isArray(response.data) ? response.data : [];
//     return users.map((user:SubscribedUserProp)=>({userId:user.id,emaiL:user.email.toLocaleLowerCase(),status:user.status}))
//   });

//   // 1. Fetch only raw emails from DB
//   const existingEmails = await context.run("Get existing emails from DB", async () => {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
//       { timeout: 25000 } 
//     );
//     const users = Array.isArray(response.data) ? response.data : [];
//     return users.map((u: SubscribedUserProp) => u.email?.toLowerCase()).filter(Boolean);
//   });

//   // 2. Fetch Paystack subscriptions
//   const paystackData = await context.run("Get raw subscriptions from paystack", async () => {
//     const paystackResponse = await axios.get(
//       `${process.env.PUBLIC_BASE_URL}/api/get-all-subscriptions`,
//       { timeout: 25000 }
//     );
//     const subs = (paystackResponse.data?.data as SubscribedUser[]) || [];

//     return subs.map((sub) => ({
//       status: sub.status || "",
//       planName: sub.plan?.name || "",
//       email: sub.customer?.email || "",
//       firstName: sub.customer?.first_name || "",
//       lastName: sub.customer?.last_name || "",
//     }));
//   });

//   // 3. RUN CRITICAL FILTERING 
//   const existingEmailsSet = new Set(existingEmails);
//   const newUsers = paystackData
//     .filter((sub) => {
//       const email = sub.email?.toLowerCase();
//       return email && !existingEmailsSet.has(email);
//     })
//     .map((sub) => {
//       let firstName = sub.firstName;
//       let lastName = sub.lastName;

//       if (!firstName && !lastName && sub.email) {
//         const emailName = sub.email.split("@")[0];
//         const nameParts = emailName.split(/[._-]/);
//         firstName = nameParts[0] || "";
//         lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
//       }

//       // Return a plain Javascript Object mapping exactly what your FormData requires
//       return {
//         status: sub.status || "",
//         subscriptionPlan: sub.planName || "",
//         career: "0",
//         email: sub.email || "",
//         password: "",
//         firstName: firstName || "",
//         lastName: lastName || "",
//         phoneNumber: "",
//         AttachmentName: "",
//         file: "",
//         ImageUrl: "",
//         IsActive: "true",
//         IsDeleted: "false",
//       };
//     });

//      //4. Get users from db who's status doesn't match paystack status
//     const localUsersMap = new Map(existingUsers.map(u => [u.emaiL.toLowerCase(), u]));

//     const statusMismatches = subs.filter((sub) => {
//       const email = sub.email?.toLowerCase();
//       const localUser = localUsersMap.get(email);
      
//       // If they exist in DB, but their DB status doesn't match Paystack's status
//       // return localUser && localUser.status !== sub.status;
//       return localUser && localUser.status !== sub.status;
//     });

//   // 5. Batch process updates cleanly using constructed Multipart Form Data strings
//   if (newUsers.length > 0) {
//     const batchSize = 6; 

//     // Helper to prevent a rogue newline from breaking the multipart boundary
//     const sanitizeField = (value: string) =>
//       String(value ?? "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, "'");

//     const buildMultipartBody = (user: Record<string, string>, boundary: string) => {
//       let body = "";
//       for (const [key, value] of Object.entries(user)) {
//         body += `--${boundary}\r\n`;
//         body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
//         body += `${sanitizeField(value)}\r\n`;
//       }
//       body += `--${boundary}--\r\n`;
//       return body;
//     };

//     for (let i = 0; i < newUsers.length; i += batchSize) {
//       const batchIndex = Math.floor(i / batchSize);
//       const batch = newUsers.slice(i, i + batchSize);

//       await Promise.all(
//         batch.map(async (userToAdd, index) => {
//           try {
//             // Generate a unique boundary per user payload
//             const boundary = `----WebKitFormBoundaryUpstashWorkflow${Date.now()}${Math.random().toString(36).slice(2)}`;
            
//             // Build the stringified multipart body
//             const multipartBody = buildMultipartBody(userToAdd, boundary);

//             await context.call(`add-user-b${batchIndex}-i${index}`, {
//               url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/addUser`,
//               method: "POST",
//               headers: {
//                 // Must pass the EXACT boundary string in the header so the API knows how to parse the payload
//                 "Content-Type": `multipart/form-data; boundary=${boundary}`,
//               },
//               body: multipartBody, 
//             });
//           } catch (error) {
//             console.error(`Failed to update user record - ${userToAdd.email}`, error);
//           }
//         })
//       );

//       // Sleep to prevent outbound rate limits and allow Vercel execution to pause cleanly
//       if (i + batchSize < newUsers.length) {
//         await context.sleep(`pause-batch-${batchIndex}`, 1);
//       }
//     }
//   }
// });

export const { POST } = serve(async (context) => {

  // 1. Fetch the users from db)
  const existingUsers = await context.run("Get existing users from DB", async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
      { timeout: 25000 } 
    );
    const users = Array.isArray(response.data) ? response.data : [];
    return users.map((user: SubscribedUserProp) => ({
      userId: user.id,
      status: user.status,
      subscriptionPlan:user.subscriptionPlan,
      career:user.subscriptionPlan,
      email: user.email.toLowerCase(), 
      password:user.password,
      firstName:user.firstName,
      lastName:user.lastName,
      phoneNumber:user.phoneNumber,
      attachmentName:user.attachmentName,
      file:user.file,
      imageUrl:user.imageUrl,
      isActive:user.isActive,
      isDeleted:user.isDeleted,
    }));
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

  // 3. Get users from db whose status doesn't match paystack status (Replaces Step 3)
  const localUsersMap = new Map(existingUsers.map(u => [u.email, u]));

  const statusMismatches = paystackData
    .filter((sub) => {
      const email = sub.email?.toLowerCase();
      const localUser = localUsersMap.get(email);
      
      // If they exist in DB, but their DB status doesn't match Paystack's status
      return localUser && localUser.status !== sub.status;
    })
    .map((sub) => {
      // Map over the filtered data to attach the correct userId for Step 4
      const email = sub.email?.toLowerCase();
      const localUser = localUsersMap.get(email);
      
      return {
        ...sub,
        userId: localUser!.userId,
        subscriptionPlan:localUser?.subscriptionPlan,
        career:localUser?.subscriptionPlan,
        password:localUser?.password,
        phoneNumber:localUser?.phoneNumber,
        attachmentName:localUser?.attachmentName,
        file:localUser?.file,
        imageUrl:localUser?.imageUrl,
        isActive:localUser?.isActive,
        isDeleted:localUser?.isDeleted,
      };
    });

  // 4. Batch process updates cleanly using PUT requests with JSON data
  if (statusMismatches.length > 0) {
    const batchSize = 6; 

    for (let i = 0; i < statusMismatches.length; i += batchSize) {
      const batchIndex = Math.floor(i / batchSize);
      const batch = statusMismatches.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (userToUpdate, index) => {
          try {
            // Construct the JSON payload for the update
            const jsonPayload = {
              status: userToUpdate.status,
              subscriptionPlan: userToUpdate.planName,
              firstName: userToUpdate.firstName,
              lastName: userToUpdate.lastName,
                career:userToUpdate.subscriptionPlan,
                password:userToUpdate.password,
                phoneNumber:userToUpdate.phoneNumber,
                attachmentName:userToUpdate.attachmentName,
                file:userToUpdate.file,
                imageUrl:userToUpdate.imageUrl,
                isActive:userToUpdate.isActive,
                isDeleted:userToUpdate.isDeleted,
              // Add any other specific fields your updateUser endpoint requires here
            };

            await context.call(`update-user-b${batchIndex}-i${index}`, {
              url: `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUser?id=${userToUpdate.userId}`,
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: jsonPayload, 
            });
          } catch (error) {
            console.error(`Failed to update user record - ${userToUpdate.email}`, error);
          }
        })
      );

      // Sleep to prevent outbound rate limits and allow Vercel execution to pause cleanly
      if (i + batchSize < statusMismatches.length) {
        await context.sleep(`pause-batch-${batchIndex}`, 1);
      }
    }
  }
});

