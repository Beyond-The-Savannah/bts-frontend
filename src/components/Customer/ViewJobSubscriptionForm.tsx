"use client";

import { usePaystackPayment } from "react-paystack";
import { Button } from "../ui/button";
import { AddUserAndSubscriptionToDb } from "@/app/actions/viewJobSubscriptionAction";
import { referenceProp, ViewJobSubscriptionFormProps } from "@/types/globals";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SendWhatsApplinkForPremiumUsers } from "@/app/actions/SendWhatsAppLinkForPremiumUsers";


const payStackKey = process.env.NEXT_PUBLIC_PS_KEY!;
if (!payStackKey) throw new Error("PS key is missing");



export default function ViewJobSubscriptionForm({
  email,
  amount,
  planTier,
  planType,
  currencyValue,
  firstName,
  lastName,
  
}: ViewJobSubscriptionFormProps) {

  const router=useRouter()
  
  
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100,
    currency: currencyValue,
    publicKey: payStackKey,
    metadata: {
      custom_fields: [
        {
          display_name: "First Name",
          variable_name: "first_name",
          value: firstName,
        },
        {
          display_name: "Last Name",
          variable_name: "last_name",
          value: lastName,
        },
        {
          display_name: "Plan Tier",
          variable_name: "plan_tier",
          value: planTier,
        },
        {
          display_name: "Plan Type",
          variable_name: "plan_type",
          value: planType,
        },
      ],
    },
  };
  const endDate=planType ==="annually"? new Date(Date.now()+365 *24*60*60*1000):new Date(Date.now()+30 *24*60*60*1000)

  const onSuccess = async (reference:referenceProp) => {
    console.log("Payment successful",reference);
    const userData={
      firstName,
      lastName,
      emailAddress:email
    }
    const subscriptionData={
      subscriptionTransactionReference:reference.reference,
      subcriptionTierName:planTier,
      subcriptionTierType:planType,
      subscriptionPrice:String(amount),
      subscriptionStatus:"active",
      subscriptionCanceledAt:null,
      subscriptionPaymentChannel:null,
      subscriptionStartDate:new Date(),
      subscriptionEndDate:endDate,
    }
    await AddUserAndSubscriptionToDb(userData, subscriptionData)
    toast.info("Refreshing page....")
    if(amount===1500||amount===18000||amount===300) await SendWhatsApplinkForPremiumUsers(firstName,email)
  
    router.refresh()
  };
  

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Button
        onClick={() => {
          initializePayment({onSuccess});
        }}
        className="bg-bts-GreenOne hover:bg-green-900"
      >
        Purchase
      </Button>
    </>
  );
}
