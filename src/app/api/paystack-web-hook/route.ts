
import { UpdateSubscriptionDetails } from "@/app/actions/viewJobSubscriptionAction"
import PaystackWebhookTemplate from "@/components/Emails/PaystackWebhookTemplate"

import { axiosInstance } from "@/remoteData/mutateData"
import { paystackSubscriptionNotRenewEventProp, PaystackWebhook } from "@/types/globals"
import { SubscribedUserProp } from "@/types/subscribedUser"
import { NextResponse } from "next/server"
import crypto from "node:crypto"
import { Resend } from "resend"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY!;
const resend = new Resend(process.env.RESEND_API_KEY);


function verifyPaystackSignature(payLoad:string,signature:string|null,):boolean{

    if(!signature) return false

    const secretKey=PAYSTACK_SECRET_KEY
    const hash=crypto.createHmac("sha512", secretKey).update(payLoad).digest("hex")
    return hash===signature
}

export async function POST(request:Request){
    const rawBody=await request.text()
    const signature=request.headers.get("x-paystack-signature")

    
    //verify webhook origin
    const isValid=verifyPaystackSignature(rawBody,signature)
    if(!isValid){
        return NextResponse.json({message:"Invalid siganture"},{status:401})
    }
    
    //pasre the event
    const payLoad=JSON.parse(rawBody)
    

    //handle subscription event
    if(payLoad.event==="subscription.not_renew"){
        
       processSubscriptionCanceled(payLoad)
       .catch((err) => console.error("Background processing error:", err))
    }
    if(payLoad.event==="charge.success"){
        UpdateSubscriptionDetailsChannel(payLoad)
        .catch((err) => console.error("Background processing error:", err))
    }

    // Instantly acknowledge receipt to Paystack
        return NextResponse.json({ received: true }, { status: 200 });
}

async function processSubscriptionCanceled(data:paystackSubscriptionNotRenewEventProp){
    const response= await axiosInstance.get(`/api/BydUsers/getUserDetailsByEmail?email=${data.data.customer.email}`)
    const subscribedUserData:SubscribedUserProp= await response.data

    const newUserData= {
    "id": subscribedUserData.id,
    "status": subscribedUserData.status,
    "subscriptionPlan": subscribedUserData.subscriptionPlan,
    "career": subscribedUserData.career,
    "email": subscribedUserData.email,
    "password": subscribedUserData.password,
    "firstName": subscribedUserData.firstName,
    "lastName": subscribedUserData.lastName,
    "phoneNumber": subscribedUserData.phoneNumber,
    "attachmentName": subscribedUserData.attachmentName,
    "file": subscribedUserData.file,
    "imageUrl": subscribedUserData.imageUrl,
    "isActive": subscribedUserData.isActive,
    "isDeleted": subscribedUserData.isDeleted
  }
    
try {
    const response=await axiosInstance.put(`/api/BydUsers/updateUser?id=${subscribedUserData.id}`,
        newUserData,
        {headers:{"Content-Type":"application/json"}})
        console.log(`Updated user email:${data.data.customer.email} - paystackId: ${data.data.customer.id} - customer code: ${data.data.customer.customer_code}`,response.status)
        await resend.emails.send({
            from:`info@beyondthesavannah.co.ke`,
            to:`gitoshmbae@gmail.com`,
            subject:`Subscription Webhook Update for: ${data.data.customer.email}`,
            react:PaystackWebhookTemplate({
                firstName:"Mike",
                email:data.data.customer.email,
                paystackId:data.data.customer.id,
                eventName:"subscription.not_renew",
                customerId:data.data.customer.customer_code,
            })
        })
} catch (error) {
    console.log("Error could not update users status", error)
}
}

async function UpdateSubscriptionDetailsChannel(data:PaystackWebhook){
    try {
        
        const returnedData=await UpdateSubscriptionDetails(data.data.channel,data.data.reference)
        console.log(`Updated user subscription channel:${data.data.channel} - paystackReference: ${data.data.reference} - paystack channel: ${data.data.channel}`)
        console.log('Updated subscription id:',returnedData)
        // console.log(`Updated user subscription channel:${data.data.channel} - paystackId: ${data.data.customer.id} - customer code: ${data.data.customer.customer_code}`,data)
        
    } catch (error) {
        console.log("Error could not update users subscription channel", error)
    }

}