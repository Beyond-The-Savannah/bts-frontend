import { verifyPaystackSignature } from "@/utils/paystackSignature"
import { NextResponse } from "next/server"

export async function POST(request:Request){
    const rawBody=await request.text()
    const signature=request.headers.get("x-paystack-signature")

    // verify webhook origin
    const isValid=verifyPaystackSignature(rawBody,signature)
    if(!isValid){
        return NextResponse.json({message:"Invalid Signature"},{status:401})
    }

    //parse the event
    const payLoad=JSON.parse(rawBody)

    //handle transaction event

    if(payLoad.event=="charge.success"){

    }

    //instantly acknowledge receipt to Paystack
    return NextResponse.json({received:true},{status:200})
}

