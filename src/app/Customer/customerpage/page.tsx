("");
// import ManageSubscription from "@/components/Customer/ManageSubscription";
import { Button } from "@/components/ui/button";
import { SubscriptionProps } from "@/types/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  const response = await fetch(`http://localhost:3000/api/subscriptions`);
  const responseData = await response.json();
  const userEmailAddress = user?.emailAddresses[0].emailAddress;

  const userSubscriptionInformation = responseData.data.find(
    (data: SubscriptionProps) => data.customer.email == userEmailAddress
  );
  // console.log(responseData);
  // const subscriptionCode = responseData.data[0]?.subscription_code;
  const subscriptionCode = userSubscriptionInformation.subscription_code;

  if (!subscriptionCode) {
    console.error("Subscription code is not defined.");
    return;
  }
  console.log("Subscription Code:", subscriptionCode);

  // async function handleCancelSubscription() {
  //   "use server";
  //   const response = await fetch(`http://localhost:3000/api/subscriptions`, {
  //     method: "POST",
  //     headers: { "Content-Type": "appplication/json" },
  //     body: JSON.stringify({
  //       code: responseData.data[0].plan.subscription_code,
  //       token: responseData.data[0].email_token,
  //     }),
  //   });
  //   const response2 = await response.json();
  //   console.log(response2);
  // }
  async function handleManageSubscription() {
    "use server";
    let paystackManageUrl = "";
    try {
      const response = await fetch(
        `http://localhost:3000/api/manage-subscriptions?code=${subscriptionCode}`,
        {
          method: "GET",
        }
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const responseUrl = await response.json();
      console.log("MANAGE SUBS", responseUrl);
      paystackManageUrl = responseUrl;
      // return redirect(paystackManageUrl);
    } catch (error) {
      console.error("Error managing subscription:", error);
    }
    if (paystackManageUrl != "") {
      redirect(paystackManageUrl);
    }
  }

  return (
    <>
      <section className="pt-4 pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-xl">Hi {user?.firstName}</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            {/* Subscription details */}
            {/* Hi {user?.firstName} */}
          </p>
          <div className="min-h-[70vh] mt-20">
            <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-evenly">
              {responseData.data.length > 0 && (
                <div className="space-y-4 rounded-lg bg-slate-200 px-6 py-12">
                  <p className="font-semibold text-xl">Subscription details</p>
                  <p>
                    <span className="text-xs">
                      Subscription Email Address:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {responseData.data[0].customer.email}
                    </span>
                  </p>
                  <p>
                    Current Subscription Plan:{" "}
                    <span className="font-semibold ml-1">
                      {responseData.data[0].plan.name}
                    </span>
                  </p>
                  <p>
                    Current Subscription Status:{" "}
                    <span className="font-semibold ml-1">
                      {responseData.data[0].status}
                    </span>
                  </p>
                  <p>
                    Next Subscription Payment Date:{" "}
                    <span className="font-semibold ml-1">
                      {responseData.data[0].next_payment_date}
                    </span>
                  </p>
                  <p>
                    Subscription Card Number:{" "}
                    <span className="font-semibold ml-1">
                      XXXX XXXX {responseData.data[0].authorization.last4}
                    </span>
                  </p>
                  <div className="c">
                    <form action={handleManageSubscription}>
                      <Button variant="outline" size="sm" type="submit">
                        Manage your Subscrption
                      </Button>
                    </form>
                  </div>
                </div>
              )}
              <div className="space-y-4 rounded-lg bg-slate-100 pr-6 py-12">
                <p className="font-semibold text-xl px-9">Subscription guide</p>
                <div className="border-l-[1.5rem] border-blue-400 bg-blue-100 px-4 py-2 rounded-l">
                  <p>
                    To change card details you can use the Manage your
                    Subscrption button
                  </p>
                </div>
                <div className="border-l-[1.5rem] border-red-400 bg-red-100 px-4 py-2 rounded-l">
                  <p>
                    To cancel your subscrption can use the Manage your
                    Subscrption button
                  </p>
                </div>
                {/* <div className="border-l-[1.5rem] border-yellow-200 px-4 py-2 rounded-l">
                  <p>To change your plan you can</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
