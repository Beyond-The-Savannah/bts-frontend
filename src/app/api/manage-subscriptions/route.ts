import { Paystack } from "paystack-sdk";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack API Key is missing.");
}

const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);

export async function GET(request:Request){
    try {
        const{code}=await request.json()
        const response=await paystackInstance.subscription.generateSubscriptionLink(code)
        return Response.json(response)
    } catch (error) {
        return Response.json({"manage-subscription:getMethodError":error})
    }
}