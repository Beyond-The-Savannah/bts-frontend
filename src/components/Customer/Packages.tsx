"use client";
import { SubscriptionPackages } from "@/staticData/packages";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs/server";

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


  async function handlePurchasePackage(subscriptionOptions: subScriptionProps) {
    const generateLink = async () => {
      try {
        const response = await fetch("/api/generate-expiration-link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user?.user?.id }),
        });
  
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("expiringLink", data.expiringLink);
          return data.expiringLink; 
        } else {
          console.error(data.error);
          return null; 
        }
      } catch (error) {
        console.error("Error generating expiration link:", error);
        return null;
      }
    };
  
    const handleSubscription = async () => {
      try {
        const expiringLink = await generateLink(); 
  
        const response = await axios.post(`/api/subscriptions`, {
          email: subscriptionOptions.email,
          amount: subscriptionOptions.amount,
          plan: subscriptionOptions.plan,
          name: subscriptionOptions.name,
          firstName: user.user?.firstName,
          whatsAppExpiringLink: expiringLink, 
        });
  
        const authorizationUrl =
          response.data?.initialResponse.data?.authorization_url;
        // console.log("CREATE SUB RESPONSE->", response);
  
        if (!authorizationUrl) {
          console.error("Authorization URL is missing!", response.data);
          return;
        }
        return { authorizationUrl };
      } catch (error) {
        console.log(error);
      }
    };
  
    toast.promise(handleSubscription, {
      loading: "Processing...",
      success: (data) => {
        router.push(data?.authorizationUrl);
        return `Redirecting to Paystack`;
      },
      error: "Error, please try again later",
    });
  }
  

  return (
    <>
      <div className="flex flex-wrap gap-x-2 gap-y-4 items-center justify-evenly pt-12">
        {SubscriptionPackages.map((sub) => (
          <div
            key={sub.id}
            className="min-h-96 w-64 border bg-bts-BrownOne rounded-lg space-y-4 px-4 py-6 flex flex-col justify-between"
          >
            <div className="flex flex-wrap gap-4 items-center  justify-evenly">
              <p className="font-semibold">{sub.packageName}</p>
              <p className="font-semibold">
                <span className="text-xs mr-1 ">KSH</span>
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
