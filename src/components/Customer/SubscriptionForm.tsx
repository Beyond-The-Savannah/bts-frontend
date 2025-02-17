"use client";
// import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// const SubscriptionFormSchema=z.object({
//     email:z.string().trim().email(),
//     amount:z.string().trim(),
//     plan:z.string().trim()
// })

export default function SubscriptionForm() {
  const [subcriptionFormData, setSubscriptionFormData] = useState({
    email: "",
    amount: "",
    plan: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubscriptionFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function formSubmit(){
    alert(JSON.stringify(subcriptionFormData))
  }
  return (
    <>
      <form onSubmit={formSubmit} className="space-y-4 my-10">
        <Input
          type="email"
          name="email"
          value={subcriptionFormData.email}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="amount"
          value={subcriptionFormData.amount}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="plan"
          value={subcriptionFormData.plan}
          onChange={handleInputChange}
        />
        <Button variant="outline" className="">
          Start process
        </Button>
      </form>
    </>
  );
}
