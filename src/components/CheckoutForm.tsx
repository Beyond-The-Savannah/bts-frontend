"use client";
import { usePaystackPayment } from "react-paystack";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
// import { publicIpv4, IpNotFoundError } from "public-ip";

const checkOutFormSchema = z.object({
  email: z.string().trim().email({ message: "Invalid Email" }),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

// export default function CheckoutForm(amount: { amount: number }, currencyValue:string) {
export default function CheckoutForm({amount, currencyValue,serviceName }:{amount:number, currencyValue?:string, serviceName?:string}) {
  const payStackKey = process.env.NEXT_PUBLIC_PS_KEY;
  // const ipInfoToken = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
  if (!payStackKey) {
    throw new Error("PS key is missing");
  }
  // const amountInCents = amount.amount * 100;
  const amountInCents = amount * 100;

  const form = useForm<z.infer<typeof checkOutFormSchema>>({
    resolver: zodResolver(checkOutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });
  const { watch } = form;
  const email = watch("email");
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  console.log(currencyValue)

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amountInCents,
    serviceName:serviceName,
    currency: "KES",
    // currency:currencyValue,
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
      ],
    },
  };


  const onSuccess = async () => {
    await axios.post(`/api/send`, {
      email: config.email,
      firstName: config.metadata.custom_fields[0].value,
      amount: amountInCents,
      serviceName:config.serviceName
    });
    toast.info(`Please check your email, "${email}" for more instructions`, {
      duration: 16000,
    });
  };

  const initializePayment = usePaystackPayment(config);

  function onSumbit(values: z.infer<typeof checkOutFormSchema>) {
    initializePayment({ onSuccess });
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address </FormLabel>
                <FormControl>
                  <Input placeholder="email@mail.com" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-center">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Imani" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Lulu" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            // className="w-full bg-green-400 hover:bg-green-500"
            className="w-full bg-bts-GreenOne hover:bg-green-500"
          >
            Start payment process
          </Button>
        </form>
      </Form>
    </>
  );
}
