import { Paystack } from "paystack-sdk";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack secret Key is missing in the customer route");
}

const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("email");

    if (userEmail == null) {
      return Response.json(
        { error: "User email address is needed" },
        { status: 500 }
      );
    }
    const response = await paystackInstance.customer.fetch(userEmail);
    return Response.json(response.data?.id);
    // return Response.json(response);
  } catch (error) {
    return Response.json(
      { error: `${error}-- ERROR in getting customer id from paystack` },
      { status: 500 }
    );
  }
}
