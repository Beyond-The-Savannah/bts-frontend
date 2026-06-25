"use client";
import { useCurrencyBasedOnLocation } from "@/hooks/useCurrencyBasedOnLocation";
import { Switch } from "../ui/switch";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  AnualSubscriptionPackages,
  SubscriptionPackages,
} from "@/staticData/packages";
import { BadgeAlert, Check } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { usePathname } from "next/navigation";

import ViewJobSubscriptionForm from "./ViewJobSubscriptionForm";



export default function PackagesTwo() {
  const pathName = usePathname();
  // const [open, setOpen] = useState(false);
  //   const router = useRouter();
  const currencyValue = useCurrencyBasedOnLocation();
  const [anual, setAnual] = useState(false);
  const user = useUser();
  const userFirstName = user.user?.firstName as string;
  const userLastName = user.user?.lastName as string;
  const userEmail = user.user?.primaryEmailAddress?.emailAddress as string;
  const userId=user.user?.id as string

  
  return (
    // these subscriptions tiers aren't managed by paystack subscriptions
    <>
      <div className="w-full flex items-center justify-end gap-1 ">
        Annual charges
        <Switch
          checked={anual}
          onCheckedChange={() => setAnual(!anual)}
          className="accent-emerald-400"
        />
      </div>
      {anual ? (
        <>
          <div className="flex flex-wrap xl:flex-nowrap gap-x-2 gap-y-4 items-center justify-evenly pt-12">
            {AnualSubscriptionPackages.map((sub) => (
              <div
                key={sub.id}
                className="min-h-100 w-full md:w-64 lg:w-64 xl:w-full border bg-bts-BrownOne rounded-lg space-y-4 px-4 py-6 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                  <p className="font-semibold w-full">{sub.packageName}</p>
                  <p className="font-semibold w-full">
                    {currencyValue == "KES" ? (
                      <>
                        <span className="text-xs mr-1 ">KSH</span>
                        {sub.packagePriceKE}
                      </>
                    ) : (
                      <>
                        <span className="text-xs mr-1 ">$ </span>
                        {sub.packagePriceUSD}
                      </>
                    )}

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
                        {(good == "Unlimited Private Email Coaching" ||
                          good == "Limited Private Email Coaching") && (
                          <>
                            <Tooltip>
                              <TooltipTrigger>
                                <BadgeAlert
                                  size={16}
                                  className="cursor-pointer"
                                />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs max-w-xs mx-auto py-4">
                                {" "}
                                Please email us about what you want to coached
                                about in order for us to best carter to your
                                unique challenges and need
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
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
                    {currencyValue == "KES" ? (
                      <ViewJobSubscriptionForm
                        email={userEmail}
                        amount={sub.packageFigureKE}
                        planTier={sub.packageName}
                        planType="annually"
                        currencyValue={currencyValue}
                        firstName={userFirstName}
                        lastName={userLastName}
                        userId={userId}
                      />
                    ) : (
                      <ViewJobSubscriptionForm 
                        email={userEmail}
                        amount={sub.packageFigureUSD}
                        planTier={sub.packageName}
                        planType="annually"
                        currencyValue={currencyValue}
                        firstName={userFirstName}
                        lastName={userLastName}
                        userId={userId}
                      />
                    )}
                    
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
                className="min-h-100 w-full md:w-64 lg:w-64 xl:w-full border bg-bts-BrownOne rounded-lg space-y-4 px-4 py-6 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                  <p className="font-semibold w-full">{sub.packageName}</p>
                  <p className="font-semibold w-full">
                    {currencyValue == "KES" ? (
                      <>
                        <span className="text-xs mr-1 ">KSH </span>
                        {sub.packagePriceKE}
                      </>
                    ) : (
                      <>
                        <span className="text-xs mr-1 ">$ </span>
                        {sub.packagePriceUSD}
                      </>
                    )}

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
                        {(good == "Unlimited Private Email Coaching" ||
                          good == "Limited Private Email Coaching") && (
                          <>
                            <Tooltip>
                              <TooltipTrigger>
                                <BadgeAlert
                                  size={16}
                                  className="cursor-pointer"
                                />
                              </TooltipTrigger>
                              <TooltipContent className="text-xs max-w-xs mx-auto py-4">
                                {" "}
                                Please email us about what you want to coached
                                about in order for us to best carter to your
                                unique challenges and need
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
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
                    {currencyValue == "KES" ? (
                      <ViewJobSubscriptionForm
                        email={userEmail}
                        amount={sub.packageFigureKE}
                        planTier={sub.packageName}
                        planType="monthly"
                        currencyValue={currencyValue}
                        firstName={userFirstName}
                        lastName={userLastName}
                        userId={userId}
                      />
                    ) : (
                      <ViewJobSubscriptionForm 
                        email={userEmail}
                        amount={sub.packageFigureUSD}
                        planTier={sub.packageName}
                        planType="monthly"
                        currencyValue={currencyValue}
                        firstName={userFirstName}
                        lastName={userLastName}
                        userId={userId}
                      />
                    )}
                    
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="c">
            { }
          </div>
        </>
      )}
    </>
  );
}
