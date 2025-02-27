"use client";

import { Button } from "../ui/button";

export default function ManageSubscription({ code }: { code: string }) {
  async function handleManageSubscription() {
    "use server";
    const response = await fetch(
      `http://localhost:3000/api/managesubscriptions`,
      {
        method: "GET",
        headers: { "Content-Type": "appplication/json" },
        body: JSON.stringify({
          code,
          //   code: responseData.data[0].plan.subscription_code,
          // token: responseData.data[0].email_token,
        }),
      }
    );
    const response2 = await response.json();
    console.log(response2);
  }
  return (
    <>
      <form action={handleManageSubscription}>
        <Button variant="outline" size="sm" type="submit">
          Manage your Subscrption
        </Button>
      </form>
    </>
  );
}
