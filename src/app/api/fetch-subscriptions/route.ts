import { Paystack } from "paystack-sdk";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack API Key is missing.");
  }
const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);

export async function GET(){
try {
    const response= await paystackInstance.subscription.fetch(`PLN_bc18wio85ryfm5i`)
    const premiumSubsribers= response.status
    console.log("Fetched Users", premiumSubsribers)
} catch (error) {
    console.log("Error fetching subscription data using paystack.fetch()", error)
}

}