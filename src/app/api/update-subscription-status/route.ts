

import { SubscribedUser } from "@/types/globals";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { serve } from "@upstash/workflow/nextjs";
// import axios from "axios";

export const { POST } = serve(async (context) => {

  // Fetch database users
  const dbResponse=await context.call("Get Subscribed Users from BTS DataBase",{
    url:`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`,
    method:"GET"
  })
  const databaseUsers=Array.isArray(dbResponse.body)?
  (dbResponse.body as SubscribedUserProp[]).map((user)=>({id:user.id,email:user.email,status:user.status})):[]

  // // Fetch Paystack users
  // const paystackResponse=await context.call("Get all Paystack Subscribed Users from Paystack",{
  //   url:`${process.env.PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`,
  //   method:"GET"
  // })

  // const paystackData = (paystackResponse.body as { data?: unknown })?.data
  // const paystackUsers=Array.isArray(paystackData)?
  // (paystackData as SubscribedUser[]).map((user)=>({email:user.customer.email, status:user.status})):[]
  // 2. Fetch Paystack users via Pagination to bypass the 1MB limit
  let paystackUsers: { email: string; status: string }[] = [];
  let page = 1;
  let hasMore = true;
  const perPage = 100; // Adjust based on your API capability

  while (hasMore) {
    const paystackResponse = await context.call(`Get Paystack Users Page ${page}`, {
      url: `${process.env.PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes?page=${page}&perPage=${perPage}`,
      method: "GET"
    });

    const paystackData = (paystackResponse.body as { data?: unknown })?.data;
    
    if (Array.isArray(paystackData) && paystackData.length > 0) {
      const mapped = (paystackData as SubscribedUser[]).map((user) => ({
        email: user.customer.email,
        status: user.status
      }));
      paystackUsers = paystackUsers.concat(mapped);
      page++;
    } else {
      hasMore = false;
    }
    
    // Safety check to avoid accidental infinite loops
    if (page > 50) break; 
  }


  // Find matches
  const usersToUpdate=paystackUsers.flatMap((paystackUser)=>{
    const matched=databaseUsers.find((databaseuser)=>databaseuser.email==paystackUser.email)
    return matched ?[{id:matched.id,email:matched.email,status:matched.status}]:[]
  })


  // Batch process updates
  // if(usersToUpdate.length===0) return
if(usersToUpdate.length>0){

  const batchSize=50

  for(let i=0;i<usersToUpdate.length;i+=batchSize){
    const batchIndex=Math.floor(i/batchSize)
    const batch=usersToUpdate.slice(i,i+batchSize)

    await context.run(`Process update batch ${batchIndex}`, async ()=>{
      await Promise.all(
        batch.map(async (userToUpdate)=>{
          try {
            await context.call("",{
              url:`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUser?id=${userToUpdate.id}`,
              method:"PUT",
              body:{status:userToUpdate.status},
              headers:{"Content-Type":"application/json"},
            })
          } catch (error) {
            console.error(`Failed to update user record - ${userToUpdate.email}`, error);
          }
        })
      )
    })
    if(i+ batchSize<usersToUpdate.length){
      await context.sleep(`Pause-batch-${batchIndex}`, 1)
    }
  }
}


//   // Fetch database users
//   const dataBaseUsers = await context.run(
//     "Get Subscribed Uses from BTS DataBase",
//     async () => {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/getAllUsers`);
//        // Check if response.data is an array
//       if (!Array.isArray(response.data)) {
//         console.error("Database API response.data is not an array:", response.data);
//         return [];
//       }
//       const dataBaseUserList: Array<Pick<SubscribedUserProp, "id" |"email" | "status" >> = 
//       response.data.map((user:SubscribedUserProp)=>({id:user.id,email:user.email,status:user.status}));
//       return dataBaseUserList;
//     },
//   );

//   // Fetch Paystack users
//   const paystackUsers = await context.run(
//     "Get all Paystack Subscribed Users from Paystack",
//     async () => {
//       const response = await axios.get(
//         `${process.env.PUBLIC_BASE_URL}/api/subscription-details-by-plan-codes`,
//       );
//         // Check if response.data.data is an array
//       if (!Array.isArray(response.data.data)) {
//         console.error("Paystack API response.data.data is not an array:", response.data.data);
//         return [];
//       }
//       const paystackUsersList: Array<{status: string; email: string }> = 
//       response.data.data.map((user:SubscribedUser)=>({status:user.status,email:user.customer.email}));
//       return paystackUsersList;
//     },
//   );

//   // Find matches
//   const usersToUpdate=[]
//   for(const paystackUser of paystackUsers){
//     // const mactchedDatabaseUser=dataBaseUsers.find((dataBaseUser)=>{return dataBaseUser.email==paystackUser.customer.email})
//     const mactchedDatabaseUser=dataBaseUsers.find((dataBaseUser)=>{return dataBaseUser.email==paystackUser.email})
//     if(mactchedDatabaseUser){
//       usersToUpdate.push({id:mactchedDatabaseUser.id,email:mactchedDatabaseUser.email,status:mactchedDatabaseUser.status,})
//     }
//   }


//   // Batch process updates
//  if(usersToUpdate.length>0){

//     const batchSize = 50;
  
//     for (let i = 0; i < usersToUpdate.length; i += batchSize) {
//       const batchIndex = Math.floor(i / batchSize);
//       const batch = usersToUpdate.slice(i, i + batchSize);
  
//       await context.run(`Process update batch ${batchIndex}`, async () => {
//         await Promise.all(
//           batch.map(async (userToUpdate) => {
//             try {
//               const response = await axios.put(
//                 // `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUserDetails?email=${userToUpdate.email}`,
//                 `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/BydUsers/updateUser?id=${userToUpdate.id}`,
//                 {status:userToUpdate.status},
//                 {
//                   headers: { "Content-Type": "application/json" },
//                 },
//               );
//               console.log("Updated user record", {
//                 email: userToUpdate.email,
//                 status: response.status,
//                 statusText: response.statusText,
//               });
//             } catch (error) {
//               console.log(
//                 `Failed to update user record - ${userToUpdate.email}`,
//                 error,
//               );
//             }
//           }),
//         );
//       });
  
//       if (i + batchSize < usersToUpdate.length) {
//         await context.sleep(`Pause-batch-${batchIndex}`, 1);
//       }
//     }

//  }

  
});
