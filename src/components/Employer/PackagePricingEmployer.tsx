"use client";
import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { subScriptionProps } from "../Customer/Packages";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "../Customer/UserSubscriptionInformation";

export default function PackagePricingEmployer() {
  const user = useUser();
  const router = useRouter();

  const email=user.user?.emailAddresses[0].emailAddress as string;
  const firstName=user.user?.firstName as string;
  const packagesList = [
    {
      id: 1,
      packageName: "Employer Starter",
      packagePriceKE: "3,000",
      packageFigureKE: 3000,
      packagePriceUSD: "15",
      packageFigureUSD: 15,
      packagePlanCodeKE: "PLN_n13c2lrs1j3kjxk",
      packagePlanCodeUSD: "",
      packageFeatures: [
        "Access To Listed Jobs",
        "NewsLetter",
        "Curated Job Search Alerts",
        "Unlimited Private Email Coaching",
      ],
      link: "/Employer",
    },
    {
      id: 2,
      packageName: "Employer Growth",
      packagePriceKE: "5,000",
      packageFigureKE: 5000,
      packagePriceUSD: "50",
      packageFigureUSD: 50,
      packagePlanCodeKE: "PLN_1ykvnbryfbyusxd",
      packagePlanCodeUSD: "",
      packageFeatures: [
        "Access To Listed Jobs",
        "NewsLetter",
        "Curated Job Search Alerts",
        "Unlimited Private Email Coaching",
        "Access To A Job Search Accountability Partner",
      ],
      link: "/Employer",
    },
  ];
  
  if(!user){ return}
// const employerSubscriptionDetails=async ()=>{
//     await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
// }
// console.log("EMPLOYER SUBSCRIPTION DETAILS:",employerSubscriptionDetails);
  async function handlePurchaseEmployerPackage(subscriptionOptions:subScriptionProps) {
    try {
        const response=await axios.post(`/api/subscriptions`,{
            email:subscriptionOptions.email,
            amount:subscriptionOptions.amount,
            plan:subscriptionOptions.plan,
            name:subscriptionOptions.name,
            currency:subscriptionOptions.currency,
            firstName:subscriptionOptions.firstName,
        })
        if(response.status !=200){toast.error("Error in processing payment, please try again later"); return;}
        console.log("Employer Subscription Payment Response:", response.data);
        if(response.data?.initialResponse?.data.authorization_url){
            toast.success("Redirecting to payment gateway...");
            router.push(response.data?.initialResponse?.data.authorization_url);
        }
        
        // if(response.status==200){redirect(`/Employer`)}
    } catch (error) {
        console.log("Error processing employer subscirption payemnet:", error);
        toast.error("An error occurred while processing your payment. Please try again.");
    }

    
  }
  return (
    <>
      <section className="px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-10">Package Pricing</h2>
          <p className="">Choose the right package for your hiring needs</p>
        </div>
            {/* {employerSubscriptionDetails!==null &&(<p className="text-green-600 font-medium">You have an active subscription</p>
            )} */}
        <div className="flex items-center justify-center w-full gap-4 mt-4">
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
          {packagesList.map((pckage) => (
            <div
              key={pckage.id}
              className="flex flex-col items-center justify-between min-h-[24rem] py-4 px-2 w-8/12 lg:w-5/12 border rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-center text-base font-medium">
                {pckage.packageName}
              </p>
              <p className="text-center text-xl font-bold">
                {pckage.packagePriceKE} /month
              </p>
              <ul className="list-disc my-10 px-4">
                {pckage.packageFeatures.map((feature, index) => (
                  <li key={`feature-${index}`}>{feature}</li>
                ))}
              </ul>
              <Button
                onClick={() =>
                  handlePurchaseEmployerPackage({
                    email,
                    amount: pckage.packageFigureKE,
                    plan: pckage.packagePlanCodeKE,
                    name: pckage.packageName,
                    currency: "KES",
                    firstName,
                  })
                }
                className="bg-bts-GreenOne w-full md:w-48 xl:w-80"
              >
                Purchase
              </Button>
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto my-10">
          <div className="c rounded-lg bg-amber-50 px-3 py-6 flex flex-col gap-4 items-start">
            <AlertCircle className="size-4" />
            <p className="text-xs">
              Please note that any payments for the packages are non-refundable
              once processed
            </p>
            <p className="text-xs">
              To prevent subsequent charges, use the manage subscription button
              in the dashboard
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
