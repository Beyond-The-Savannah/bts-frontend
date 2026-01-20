"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
// import axios from "axios";
import { usePaystackPayment } from "react-paystack";

const paystackKey=process.env.NEXT_PUBLIC_PS_KEY!


export default function EventForm() {
    const [open, setOpen] = useState(false);
    
    
    const config={
        reference:new Date().getTime().toString(),
        email:"test@mail.com",
        amount:400000,
        currency:"KES",
        publicKey:paystackKey,
        metaData:{
            custom_fields:[
                {
                    display_name:"First Name",
                    variable_name:"first_name",
                    value:"Test First Name"
                },
                {
                    display_name:"Last Name",
                    variable_name:"last_name",
                    value:"Test Last Name"
                }
            ],
        }
    }
    const eventPayment= async()=>{
        try {
            // await axios.post(`/api/send`,{
            //     email:config.email,
            //     fristName:config.metaData.custom_fields[0].value,
            //     amount:config.amount,
            //     serviceName:"BTS March Mixer Event"
            // })
            toast.info(`Please check your email for more instrustions`,{duration:16000})
        } catch (error) {
            console.log("Error in the eventPayment function",error)
        }
    }
    const initializeEventPayment=usePaystackPayment(config)

  async function handleEventRegistraion(e: FormEvent) {
    e.preventDefault();
    initializeEventPayment({onSuccess:eventPayment})
    setOpen(!open);
    // toast.success("Registration was successful", {
    //   description: "this is the first implementation",
    //   duration: 10000,
    // });
  }
  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            size="lg"
            className="w-56 text-xl bg-bts-BrownThree hover:bg-bts-BrownFour hover:scale-105 transition ease-in duration-300"
          >
            Register for Event
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-xl mx-auto pt-10 px-4">
          <DrawerHeader>
            <DrawerTitle className="text-center">Registration Form</DrawerTitle>
            <DrawerDescription className="text-center">
              Please fill in all the fields
            </DrawerDescription>
          </DrawerHeader>
          <div className="c">
            <form onSubmit={handleEventRegistraion}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Your First Name"
                      required
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="lasttName">Last Name</Label>
                    <Input
                      type="text"
                      name="lasttName"
                      placeholder="Your Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder="Your Email" required/>
                  </div>
                  <div className="">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="phone"
                      name="phone"
                      placeholder="0700 000 000"
                      required
                    />
                  </div>
                </div>
                <div className="grid ">
                  <Button
                    type="submit"
                    className="w-48 mx-auto bg-green-700 hover:bg-green-600 hover:scale-105 transition ease-in duration-300"
                  >
                    Start Payment Process
                  </Button>
                </div>
              </div>
            </form>
          </div>

          <DrawerFooter className="mt-10">
            <DrawerClose asChild>
              <Button variant="outline" className="w-28 mx-auto">
                <X />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
