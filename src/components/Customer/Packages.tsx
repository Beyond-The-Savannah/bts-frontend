"use client";
import {
  AnualSubscriptionPackages,
  SubscriptionPackages,
} from "@/staticData/packages";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { BadgeAlert, Check } from "lucide-react";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCurrencyBasedOnLocation } from "@/hooks/useCurrencyBasedOnLocation";
// import { currentUser } from "@clerk/nextjs/server";

export interface subScriptionProps {
  email: string;
  // amount: string;
  amount: number;
  plan: string;
  name: string;
  currency:string;
  firstName: string;
}
export default function Packages({ email }: { email: string }) {
  const pathName = usePathname();
  const router = useRouter();
  const currencyValue=useCurrencyBasedOnLocation()
  const [anual, setAnual] = useState(false);
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
          // amount: subscriptionOptions.amount,
          amount: subscriptionOptions.amount,
          plan: subscriptionOptions.plan,
          firstName: user.user?.firstName,
          currency:currencyValue,
          // name: subscriptionOptions.name,
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
    <div className="w-full flex items-center justify-end gap-1 ">
    Annual charges
    <Switch checked={anual} onCheckedChange={()=>setAnual(!anual)} className="accent-emerald-400"/>
    </div>
      {anual ? (
        <>
          <div className="flex flex-wrap xl:flex-nowrap gap-x-2 gap-y-4 items-center justify-evenly pt-12">
            {AnualSubscriptionPackages.map((sub) => (
              <div
                key={sub.id}
                className="min-h-[25rem] w-full md:w-64 lg:w-64 xl:w-full border bg-bts-BrownOne rounded-lg space-y-4 px-4 py-6 flex flex-col justify-between"
              >
                {/* <div className="flex flex-wrap gap-4 items-center  justify-evenly"> */}
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                  <p className="font-semibold w-full">{sub.packageName}</p>
                  <p className="font-semibold w-full">
                    {currencyValue=="KES" ? (<>
                     <span className="text-xs mr-1 ">KSH</span>
                    {sub.packagePriceKE}
                    </>):(<>
                     <span className="text-xs mr-1 ">$ </span>
                    {sub.packagePriceUSD}
                    </>)}
                     {/* <span className="text-xs mr-1 ">KSH</span> */}
                    {/* {sub.packagePrice} */}
                    <span className="font-normal"> / year</span>
                  </p>
                </div>
                <div>
                  <div className="flex flex-col items-start min-h-40 gap-4  mt-1 ">
                    {sub.packageGoods.map((good, index) => (
                      <ul
                        key={index}
                        className="flex gap-1 items-center text-sm"
                      >
                        <Check className="size-4" />
                        <li>{good}</li>
                        {(good=='Unlimited Private Email Coaching'|| good=='Limited Private Email Coaching')  && (<>
                        <Popover>
                          <PopoverTrigger><BadgeAlert size={16}/></PopoverTrigger>
                          <PopoverContent className="text-xs">Please email us about what you want to coached about in order for us to best carter to your unique challenges and need</PopoverContent>
                          </Popover></>)}
                      </ul>
                    ))}
                  </div>
                </div>
                {pathName == "/packages" && (
                  <Button
                    asChild
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    <Link href={sub.link}>Get Package</Link>
                  </Button>
                )}
                {pathName != "/packages" && (
                  <>
                  {currencyValue=='KES' ? 
                  (<Button
                    onClick={() =>
                      handlePurchasePackage({
                        email: email,
                        amount: sub.packageFigureKE,
                        plan: sub.packagePlanCodeKE,
                        name: sub.packageName,
                        currency:'KES',
                        firstName: userFirstName,
                      })
                    }
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    Purchase
                  </Button>)
                  :
                  (<Button
                    onClick={() =>
                      handlePurchasePackage({
                        email: email,
                        amount: sub.packageFigureUSD,
                        plan: sub.packagePlanCodeUSD,
                        name: sub.packageName,
                        currency:'USD',
                        firstName: userFirstName,
                      })
                    }
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    Purchase
                  </Button>)
                  }
                  
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap xl:flex-nowrap gap-x-2 gap-y-4 items-center justify-evenly pt-12">
            {SubscriptionPackages.map((sub) => (
              <div
                key={sub.id}
                className="min-h-[25rem] w-full md:w-64 lg:w-64 xl:w-full border bg-bts-BrownOne rounded-lg space-y-4 px-4 py-6 flex flex-col justify-between"
              >
                {/* <div className="flex flex-wrap gap-4 items-center  justify-evenly"> */}
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                  <p className="font-semibold w-full">{sub.packageName}</p>
                  <p className="font-semibold w-full">
                      {currencyValue=="KES" ? (<>
                     <span className="text-xs mr-1 ">KSH </span>
                    {sub.packagePriceKE}
                    </>):(<>
                     <span className="text-xs mr-1 ">$ </span>
                    {sub.packagePriceUSD}
                    </>)}
                    {/* <span className="text-xs mr-1 ">KSH</span>
                    {sub.packagePrice} */}
                    <span className="font-normal"> / month</span>
                  </p>
                </div>
                <div>
                  <div className="flex flex-col items-start min-h-40 gap-4  mt-1  ">
                    {sub.packageGoods.map((good, index) => (
                      <ul
                        key={index}
                        className="flex gap-1 items-center text-sm"
                      >
                        <Check className="size-4" />
                        <li>{good}</li>
                         {(good=='Unlimited Private Email Coaching'|| good=='Limited Private Email Coaching')  && (<>
                        <Popover>
                          <PopoverTrigger><BadgeAlert size={16} /></PopoverTrigger>
                          <PopoverContent className="text-xs">Please email us about what you want to coached about in order for us to best carter to your unique challenges and need</PopoverContent>
                          </Popover></>)}
                      </ul>
                    ))}
                  </div>
                </div>
                {pathName == "/packages" && (
                  <Button
                    asChild
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    <Link href={sub.link}>Get Package</Link>
                  </Button>
                )}
                {pathName != "/packages" && (
                  <>
               {currencyValue=='KES' ? 
                  (<Button
                    onClick={() =>
                      handlePurchasePackage({
                        email: email,
                        amount: sub.packageFigureKE,
                        plan: sub.packagePlanCodeKE,
                        name: sub.packageName,
                        currency:'KES',
                        firstName: userFirstName,
                      })
                    }
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    Purchase
                  </Button>)
                  :
                  (<Button
                    onClick={() =>
                      handlePurchasePackage({
                        email: email,
                        amount: sub.packageFigureUSD,
                        plan: sub.packagePlanCodeUSD,
                        name: sub.packageName,
                        currency:'USD',
                        firstName: userFirstName,
                      })
                    }
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    Purchase
                  </Button>)
                  }
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
