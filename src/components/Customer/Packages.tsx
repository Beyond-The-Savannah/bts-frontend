"use client";
import { SubscriptionPackages } from "@/staticData/packages";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export interface subScriptionProps {
  email: string;
  amount: string;
  plan: string;
  name: string;
  firstName: string;
}
export default function Packages({ email }: { email: string }) {
  const pathName = usePathname();
  const router = useRouter();
  const user = useUser();
  const userFirstName = user.user?.firstName as string;
  console.log(router);

  async function handlePurchasePackage(subscriptionOptions: subScriptionProps) {
    // alert(JSON.stringify(subscriptionOptions));
    try {
      const response = await axios.post(`/api/subscriptions`, {
        email: subscriptionOptions.email,
        amount: subscriptionOptions.amount,
        plan: subscriptionOptions.plan,
        name: subscriptionOptions.name,
        firstName: user.user?.firstName,
      });
      // window.location.href = response.data.authorization_url;
      const authorizationUrl = response.data?.data?.authorization_url;

      if (!authorizationUrl) {
        console.error("Authorization URL is missing!", response.data);
        return;
      }
      if (authorizationUrl) {
        toast.info(`Check your email ${email}`);
      }
      router.push(authorizationUrl);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex gap-4 items-center justify-evenly">
        {SubscriptionPackages.map((sub) => (
          <div
            key={sub.id}
            className="min-h-96 border bg-bts-BrownOne rounded-lg space-y-4 px-4 py-6 flex flex-col justify-between"
          >
            <div className="flex flex-wrap gap-4 items-center  justify-evenly">
              <p>{sub.packageName}</p>
              <p>
                {" "}
                <span className="text-xs mr-1">KSH</span>
                {sub.packagePrice}
              </p>
            </div>
            <div>
              <div className="flex flex-col items-start min-h-40 gap-4  mt-1  px-4">
                {sub.packageGoods.map((good, index) => (
                  <ul key={index} className="list-disc">
                    <li>{good}</li>
                  </ul>
                ))}
              </div>
            </div>
            {pathName == "/packages" && (
              <Button asChild className="bg-bts-GreenOne hover:bg-green-900">
                <Link href={sub.link}>Get Package</Link>
              </Button>
            )}
            {pathName != "/packages" && (
              <Button
                onClick={() =>
                  handlePurchasePackage({
                    email: email,
                    amount: sub.packagePrice,
                    plan: sub.packagePlanCode,
                    name: sub.packageName,
                    firstName: userFirstName,
                  })
                }
                className="bg-bts-GreenOne hover:bg-green-900"
              >
                Purchase
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
