// import { DataTable } from "./data-table";
// import { columns } from "./columns";
// import axios from "axios";
// import { SubscribedUserProp } from "@/types/subscribedUser";

// const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

// export default async function page() {

//   const res = await axios.get(`${PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`);
//   const payStackSubscribedUsers = await res.data.data;

//   // const postResponse= await axios.post(`https://efmsapi-staging.azurewebsites.net/api/BydUsers/getAllUsers`, {
//   //   status
//   // })

//   const response = await axios.get(`https://efmsapi-staging.azurewebsites.net/api/BydUsers/getAllUsers`);

//   // const response= await axios.get(`${PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`)

//   // console.log(" BTS subscriptions in subscribed users in", payStackSubscribedUsers)
//   console.log(" PayStack subscriptions ", payStackSubscribedUsers);
//   console.log(" BTS users in DB", response.data)

//   const users: SubscribedUserProp[] = await response.data;

//   // const response1=await axios.get(`${PUBLIC_BASE_URL}/api/fetch-subscriptions`)
//   // const subscribedUsers=await response1.data

//   // console.log("SUBUSERS", subscribedUsers)
//   return (
//     <>
//       <section className="mt-10 px-4">
//         <h2 className="text-xl">Subscribed Users</h2>
//         <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>

//         <div className="container mx-auto px-4 py-10">
//           <DataTable data={users} columns={columns} />
//         </div>
//       </section>
//     </>
//   );
// }

import { DataTable } from "./data-table";
import { columns } from "./columns";
import axios from "axios";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SubscribedUser } from "@/types/globals";

const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
// const BTS_API_URL = "https://efmsapi-staging.azurewebsites.net/api/BydUsers";
const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export default async function Page() {
  // 1. Fetch PayStack subscriptions
  const res = await axios.get(
    `${PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`
  );
  const payStackSubscribedUsers:SubscribedUser[] = await res.data.data;

  // 2. Fetch existing users from your database
  // const response = await axios.get(`${BTS_API_URL}/getAllUsers`);
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const existingUsers: SubscribedUserProp[] = await response.data;

  // 3. Extract emails from existing users for easy comparison
  const existingEmails = new Set(
    existingUsers.map((user) => user.email.toLowerCase())
  );

  // 4. Filter and format PayStack users that don't exist in your database
  const newUsers = payStackSubscribedUsers
    .filter((subscription: { customer: { email: string } }) => {
      const email = subscription.customer?.email?.toLowerCase();
      return email && !existingEmails.has(email);
    })
    .map(
      (subscription: {
        customer: {
          first_name: string| null;
          last_name: string| null;
          email: string;
          phone: string| null;
        };
        plan: { name: string };
        status: string;
      }) => {
        // Extract first name and last name from email if not provided
        let firstName = subscription.customer?.first_name;
        let lastName = subscription.customer?.last_name;

        if (!firstName && !lastName) {
          const emailName = subscription.customer.email.split("@")[0];
          const nameParts = emailName.split(/[._-]/);
          firstName = nameParts[0] || "";
          lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
        }
        // Ensure we have string values, not null
        firstName = firstName || "";
        lastName = lastName || "";

        // Format to match your database schema
        const formData=new FormData()
          formData.append("status",subscription.status)
          formData.append("subscriptionPlan",subscription.plan.name)
          formData.append("career",String(0))
          formData.append("email",subscription.customer.email)
          formData.append("password", "")
          formData.append("firstName",firstName)
          formData.append("lastName",lastName)
          formData.append("phoneNumber","")
          formData.append("AttachmentName","")
          formData.append("file","")
          formData.append("ImageUrl","")
          formData.append("isActive",String(true))
          formData.append("isDeleted",String(false))
        
          return formData
        // return {
        //   status: subscription.status,
        //   subscriptionPlan: subscription.plan.name,
        //   career: 0, // You might need to map this from plan or other data
        //   email: subscription.customer.email,
        //   password: "", // You'll need a secure way to generate passwords or handle this
        //   firstName: subscription.customer.first_name,
        //   lastName: subscription.customer.last_name,
        //   file: "",
        //   AttachmentName: "",
        //   ImageUrl: "",
        //   phoneNumber: subscription.customer?.phone || "",
        //   isActive: subscription.status === "active" ? true : false,
        //   isDeleted: false,
        // };
      }
    );

  // 5. Post new users to database if there are any
  // if (newUsers.length > 0) {
  //   try {
  //     console.log(`Adding ${newUsers.length} new users to database`);

  //     // Use Promise.all to handle multiple users in parallel
  //     await Promise.all(
  //       newUsers.map(async (user) => {
  //         await axios.post(`${BTS_API_URL}/addUser`, user, {
  //           headers:{"Content-Type":"multipart/form-data"}});
  //       })
  //     );

  //     console.log("Successfully added new users to database");
  //   } catch (error) {
  //     console.error("Error adding users to database:", error);
  //   }
  // } else {
  //   console.log("No new users to add to database");
  // }

if (newUsers.length > 0) {
      console.log(`Adding ${newUsers.length} new users to database`);

      // Process users one by one to better handle errors
      const results = await Promise.allSettled(
        newUsers.map(async (user) => {
          try {
            // const response = await axios.post(`${BTS_API_URL}/addUser`, user, {
            const response = await axios.post(`${BTS_API_URL}/api/BydUsers/addUser`, user, {
              headers: { 
                "Content-Type":"multipart/form-data"
              },
              timeout: 10000 // Add timeout
            });
            console.log(`Successfully added user: ${user.get('email')}`);
            return response.data;
          } catch (error) {
            console.log('Failed to add user',error)
            // console.error(`Failed to add user ${user.get('email')}:`, {
            //   message: error.message,
            //   status: error.response?.status,
            //   data: error.response?.data
            // });
            // throw error;
          }
        })
      );

      // Count successful additions
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;
      
      console.log(`Successfully added ${successful} users, ${failed} failed`);

      // Log failed attempts for debugging
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`User ${newUsers[index].get('email')} failed:`, result.reason);
        }
      });
    } else {
      console.log("No new users to add to database");
    }



  // 6. Refresh the user list after potential additions
  const updatedResponse = await axios.get(`${BTS_API_URL}/getAllUsers`);
  const updatedUsers: SubscribedUserProp[] = await updatedResponse.data;

  // 7. Log summary information
  console.log(
    `Total PayStack subscriptions: ${payStackSubscribedUsers.length}`
  );
  console.log(`Total users in database: ${updatedUsers.length}`);
  console.log(`Added ${newUsers.length} new users`);

  return (
    <>
      <section className="mt-10 px-4">
        <h2 className="text-xl">Subscribed Users</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>

        <div className="container mx-auto px-4 py-10">
          <DataTable data={updatedUsers} columns={columns} />
        </div>
      </section>
    </>
  );
}
