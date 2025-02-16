"use client";
import { SubscriptionPackages } from "@/staticData/packages";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import axios from "axios";

export interface subScriptionProps {
  email: string;
  amount: string;
  plan: string;
}
export default function Packages({email}:{email:string}) {
  const pathName = usePathname();

  async function handlePurchasePackage(subscriptionOptions: subScriptionProps) {
    // alert(JSON.stringify(subscriptionOptions));
    try {
        await axios.post(`/transaction/initialize`,{
          email:subscriptionOptions.email,
          amount:subscriptionOptions.amount,
          plan:subscriptionOptions.plan
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="flex gap-4 items-center justify-evenly">
        {SubscriptionPackages.map((sub) => (
          <div key={sub.id} className="border rounded-lg space-y-4 px-4 py-6">
            <div className="flex flex-wrap gap-4 items-center justify-evenly">
              <p>{sub.packageName}</p>
              <p>
                {" "}
                <span className="text-xs mr-1">KSH</span>
                {sub.packagePrice}
              </p>
            </div>
            <div>
              <div className="flex flex-col gap-4  mt-12 px-4">
                {sub.packageGoods.map((good, index) => (
                  <ul key={index} className="list-disc">
                    <li>{good}</li>
                  </ul>
                ))}
                {pathName == "/packages" && (
                  <Button
                    asChild
                    className="bg-bts-GreenOne hover:bg-green-900"
                  >
                    <Link href={sub.link}>Get Package</Link>
                  </Button>
                )}
                <Button
                  onClick={() =>
                    handlePurchasePackage({
                      email: email,
                      amount: sub.packagePrice,
                      plan: sub.packagePlanCode,
                    })
                  }
                  className="bg-bts-GreenOne hover:bg-green-900"
                >
                  Purchase
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
