
import PaystackWebhookTemplate from "@/components/Emails/PaystackWebhookTemplate"
import { axiosInstance } from "@/remoteData/mutateData"
import { paystackSubscriptionNotRenewEventProp } from "@/types/globals"
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

    // Instantly acknowledge receipt to Paystack
        return NextResponse.json({ received: true }, { status: 200 });
}

async function processSubscriptionCanceled(data:paystackSubscriptionNotRenewEventProp){
    const response= await axiosInstance.get(`/api/BydUsers/getUserDetailsByEmail?email=${data.data.customer.email}`)
    const subscribedUserData:SubscribedUserProp= await response.data
    
    const formData=new FormData()
    
    formData.append("id",String(subscribedUserData.id))
    formData.append("status","cancelled")
    formData.append("subscriptionPlan",subscribedUserData.subscriptionPlan)
    formData.append("career",String(subscribedUserData.career))
    formData.append("email",subscribedUserData.email)
    formData.append("password",subscribedUserData.password )
    formData.append("firstName",subscribedUserData.firstName)
    formData.append("lastName",subscribedUserData.lastName)
    formData.append("phoneNumber", subscribedUserData.phoneNumber )
    formData.append("AttachmentName",subscribedUserData.attachmentName)
    formData.append("file",subscribedUserData.file)
    formData.append("ImageUrl",subscribedUserData.imageUrl)
    formData.append("isActive",String(subscribedUserData.isActive))
    formData.append("isDeleted",String(subscribedUserData.isDeleted))
try {
    const response=await axiosInstance.put(`api/BydUsers/updateUserDetails?email=${subscribedUserData.email}`,
        formData,
        {headers:{"Content-Type":"multipart/form-data"}})
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