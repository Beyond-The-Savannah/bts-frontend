import { NextResponse } from "next/server";
import { Paystack } from "paystack-sdk";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack API Key is missing.");
}
const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);

export async function GET() {
  try {
    // const response= await paystackInstance.subscription.fetch(`PLN_h8gh0augbsbo5zv`)
    const response =
      await paystackInstance.subscription.fetch(`PLN_h8gh0augbsbo5zv`);
    // const premiumSubsribers= response.status
    // console.log("API ENDPONT fetch method paystack instance",premiumSubsribers)
    return NextResponse.json(response);
  } catch (error) {
    console.log(
      "Error fetching subscription data using paystack.fetch()",
      error
    );
  }
}
