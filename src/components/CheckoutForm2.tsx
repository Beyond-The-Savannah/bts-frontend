"use client";

import { useState } from "react";
import { PaystackButton } from "react-paystack";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "sonner";

export default function CheckoutForm2({ amount }: { amount: number }) {
  const payStackKey = process.env.NEXT_PUBLIC_PS_KEY;
  const amountInCents=amount*100

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const componentProps = {
    email,
    amount:amountInCents,
    currency:'KES',
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
      ],
    },
    publicKey: payStackKey || "",
    text: "Start Payment rocess",
    onSuccess: async() =>{

        await axios.get(`/api/send`)
    toast.info(`Please check your ${email} for more instrustions`)
    },
    onClose: () =>{},
  };

  return (
    <>
      <div className="">
        <form className="space-y-4" onSubmit={(e)=>{e.preventDefault()}}>
          <div className="flex gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Imani"
                required
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Lulu"
                required
              />
            </div>
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremailaddress@mail.cim"
              required
            />
          </div>
        </form>
        <PaystackButton {...componentProps} className="w-full py-2 bg-bts-GreenOne hover:bg-green-500 rounded-md text-white my-4"/>
      </div>
    </>
  );
}
