import WhatsAppsEmailTemplate from "@/components/Emails/WhatsAppsEmailTemplate";
import { Paystack } from "paystack-sdk";
import { Resend } from "resend";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK__SECRET_KEY;
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("Paystack API Key is missing.");
}

const paystackInstance = new Paystack(PAYSTACK_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// console.log("PAYSTACK INSTANCE",paystackInstance);

export async function POST(request: Request) {
  try {
    const { email, amount, plan, firstName, whatsAppExpiringLink } =
      await request.json();
    const amountInCents = amount * 100;

    let callback_url_value = "";

    if (amountInCents == 600000) {
      callback_url_value = `${PUBLIC_BASE_URL}/Customer/whatsappService?source=whatsapp-service`;
    } else {
      callback_url_value = `${PUBLIC_BASE_URL}/Customer`;
    }

    const initialResponse = await paystackInstance.transaction.initialize({
      email: email,
      amount: String(amountInCents),
      plan: plan,
      callback_url: callback_url_value,
    });

    if (
      initialResponse?.status == true &&
      (amountInCents == 150000 || amountInCents == 1800000)
    ) {
      const { data, error } = await resend.emails.send({
        from: `info@beyondthesavannah.co.ke`,
        to: [email],
        subject: `Beyond The Savannah`,
        react: WhatsAppsEmailTemplate({
          firstName: firstName,
          whatsAppExpiringLink: whatsAppExpiringLink,
        }),
      });
      if (error) {
        return Response.json({ error }, { status: 500 });
      }
      console.log(data?.id);
    }

    if (initialResponse?.status == true && amountInCents == 600000) {
      const { data, error } = await resend.emails.send({
        from: `info@beyondthesavannah.co.ke`,
        to: [email],
        subject: `Beyond The Savannah`,
        react: WhatsAppsEmailTemplate({
          firstName: firstName,
          whatsAppExpiringLink:
            "https://chat.whatsapp.com/LDHAh18I4kZ208gGig8jMV",
        }),
      });
      if (error) {
        return Response.json({ error }, { status: 500 });
      }
      console.log(data?.id);
    }

    return Response.json({ initialResponse });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     const response = await paystackInstance.subscription.list();
//     return Response.json(response);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
export async function GET() {
  try {
    let allSubscriptions: unknown[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const response = await paystackInstance.subscription.list({
        page: currentPage,
        perPage: 50,
      });
      if ("data" in response) {
        allSubscriptions = [...allSubscriptions, ...response.data];
        totalPages = response.meta.pageCount;
      } else {
        throw new Error("BadRequest received from Paystack API");
      }
      currentPage++;
    } while (currentPage <= totalPages);

    // return Response.json(response);
    return Response.json({
      status: true,
      message: "All subscriptions retrieved",
      data: allSubscriptions,
      meta: {
        total: allSubscriptions.length,
        pageCount: totalPages,
      },
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
