
import { AddSubscriberToKit } from "@/lib/kitNewsLetter";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { subscriptionDetailsProps } from "@/types/subscriptions";
// import { SubscriptionProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";


const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;
const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

// export async function GetUserSubscriptionInformation(){
//   const user=await currentUser()
//   if(!user){ 
//     console.log("No user from clerk")
//      return null}

//     GetCustomerSubscriptionDetailsByCustomerIDFromPaystack()

//   try {
    
//     const response1=await fetch(`${PUBLIC_BASE_URL}/api/subscriptions`,{next:{revalidate:60}})

//     const allSubscriptionData=await response1.json()  
//     const userEmailAddress = user?.emailAddresses[0].emailAddress.toLowerCase();

//      const userSubscriptionInformation: SubscriptionProps[] =
//       allSubscriptionData.data
//         .filter(
//           (data: SubscriptionProps) =>
//             data.customer.email.toLocaleLowerCase() == userEmailAddress
//         )
//         .sort(
//           (a:SubscriptionProps, b:SubscriptionProps) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         // )[0];
//         ).slice(0,4);
//     // console.log("SUBINFO", userSubscriptionInformation);

//     /*uses promise.all over foreach loop to be more efficient*/
//     const kitUpdatePromises=userSubscriptionInformation.map(async(subscription)=>{
//       if(subscription.amount!=600000 && subscription.status=="active" && userEmailAddress!=undefined){
//         return AddSubscriberToKit({email:userEmailAddress})
//       }
//       return null
//     })
//     await Promise.all(kitUpdatePromises)


//     return userSubscriptionInformation;

//   } catch (error) {
//     console.log("Error Getting userSubscriptionInformation", error);
//   }

 
// }

/*get customer id from paystack*/
async function GetCustomerIDFromPaystack(){
  const user=await currentUser()
  if(!user){return null}
  try {
    const response=await fetch(`${PUBLIC_BASE_URL}/api/customer?email=${user.emailAddresses[0].emailAddress.toLocaleLowerCase()}`)
    if(!response.ok){ throw new Error(`Fetch error in getting customer id: ${response.status}`)}
    const customerID=await response.json()
    return customerID
    console.log("CUSTMER ID ",customerID)


    
  } catch (error) {
    console.error("Error in getting customer id",error)
  }

}

export async function GetCustomerSubscriptionDetailsByCustomerIDFromPaystack(){
  const customerID= await GetCustomerIDFromPaystack()
  try {
    const response=await fetch(`${PUBLIC_BASE_URL}/api/subscriptions?idOrCode=${customerID}`)
    if(!response.ok){ throw new Error(`Fetch error in getting customer subscriptions details: ${response.status}`)}
    const subscriptionDetails=await response.json()
    // console.log("CUSTOMER SUBSCTIOPN DETAILS", subscriptionDetails.data)
    if(subscriptionDetails.data[0].amount!=600000 && subscriptionDetails.data[0].status=="active"){
      AddSubscriberToKit({email:subscriptionDetails.data[0].customer.email})
    }
    return subscriptionDetails.data
    
  } catch (error) {
     console.error("Error in getting customer subscription details",error)
    
  }
}


export async function AddNewSubscriberToDatabase(){
  
  const userSubscriptionInformation:subscriptionDetailsProps[] = await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();

  const userSubscriptionDetails=userSubscriptionInformation.find((subscription)=>subscription.amount!=600000 &&
["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase()))

// check if the user is already in the database
let existingUser: SubscribedUserProp | null=null

try {
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getUserDetailsByEmail?email=${userSubscriptionDetails?.customer.email.toLowerCase()}`);
if(response.status==200){
  existingUser =  response.data;
}
} catch (error) {
  if(axios.isAxiosError(error)){
    const axiosError=error as AxiosError
    console.error("Axios error checking existing user from db",axiosError.response?.status)
    existingUser=null
  }
}

// console.log("EXISTING USER CHECK2",existingUser)


if(userSubscriptionDetails !=undefined && existingUser==null){ 
  const formData= new FormData()
  formData.append("status",userSubscriptionDetails.status)
  formData.append("subscriptionPlan",userSubscriptionDetails.plan.name)
  formData.append("career",String(0))
  formData.append("email",userSubscriptionDetails.customer.email)
  formData.append("password","")
  formData.append("firstName",userSubscriptionDetails.customer.first_name ||"")
  formData.append("lastName",userSubscriptionDetails.customer.last_name ||"")
  formData.append("phoneNumber",userSubscriptionDetails.customer.phone ||"")
  formData.append("AttachmentName","")
  formData.append("file","")
  formData.append("ImageUrl","")
  formData.append("IsActive",String(true))
  formData.append("IsDeleted",String(false))

  console.log("FORM DATA TO BE SENT",formData)
  
  try {
    axios.post(`${BTS_API_URL}/api/ByUsers/addUser`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    console.log(`New subscriber added to database: ${formData.get("email")}`)
    
  } catch (error) {
    console.error("Error adding new subscriber to database",error)
  }
}


}

