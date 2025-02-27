import WhatsAppsEmailTemplate from "@/components/Emails/WhatsAppsEmailTemplate";
import { Paystack } from "paystack-sdk";
import { Resend } from "resend";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack API Key is missing.");
}

const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

console.log(paystackInstance);

export async function POST(request: Request) {
  try {
    const { email, amount, plan, firstName } = await request.json();
    const amountInCents = amount * 100;
    // const reference=`ref_${Date.now()}`
    const initialResponse = await paystackInstance.transaction.initialize({
      email: email,
      amount: String(amountInCents),
      plan: plan,
      callback_url: "http://localhost:3000/Customer/customerpage",
    });
    const { data, error } = await resend.emails.send({
      from: `info@beyondthesavannah.co.ke`,
      to: [email],
      subject: `Beyond The Savannah`,
      react: WhatsAppsEmailTemplate({
        firstName: firstName,
      }),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    console.log(data?.id);
    console.log(initialResponse);

    return Response.json({initialResponse});
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await paystackInstance.subscription.list();
    return Response.json(response);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
