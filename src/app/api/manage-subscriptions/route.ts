
import { Paystack } from "paystack-sdk";
import { GenerateSubscriptionLink } from "paystack-sdk/dist/subscription";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack API Key is missing.");
}

const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);

export async function GET(request:Request){
    try {
        const{searchParams}=new URL(request.url)
        const code=searchParams.get("code")
        if(!code){
            return Response.json({error:"Subscription code is required"}, {status:400})
        }
        const manageSubscriptionLinkResponse= await paystackInstance.subscription.generateSubscriptionLink(code)
        if(manageSubscriptionLinkResponse.status==false){
            return Response.json({ error: "Failed to generate subscription link" }, { status: 500 })
        }
        // const manageSubscriptionLink= manageSubscriptionLinkResponse.data.link
        const manageSubscriptionLink = (manageSubscriptionLinkResponse as GenerateSubscriptionLink).data.link;
        // return Response.redirect(manageSubscriptionLink)
        return Response.json(manageSubscriptionLink)
    } catch (error) {
        return Response.json({"manage-subscription:getMethodError":error})
    }
}