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
import { AddEventToDb } from "@/app/actions/eventsForm";
import axios from "axios";

const paystackKey=process.env.NEXT_PUBLIC_PS_KEY!


export default function EventForm() {
    const [open, setOpen] = useState(false);
    const [emailAddress,setEamilAddress]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    
    
    const config={
        reference:new Date().getTime().toString(),
        email:emailAddress,
        amount:450000,
        currency:"KES",
        publicKey:paystackKey,
        metaData:{
            custom_fields:[
                {
                    display_name:"First Name",
                    variable_name:"first_name",
                    value:firstName
                },
                {
                    display_name:"Last Name",
                    variable_name:"last_name",
                    value:lastName
                }
            ],
        }
    }
    const eventPayment= async()=>{
        try {
            await axios.post(`/api/send-event-ticket`,{
                email:config.email,
                firstName:firstName,
                lastName:lastName,
                amount:config.amount,
                eventName:"Remote & Ready: A Remote Work Mixer"
            })
            toast.info(`Please check your email: ${emailAddress} for more instrustions`,{duration:16000})
        } catch (error) {
            console.log("Error in the eventPayment function",error)
        }
    }
    const initializeEventPayment=usePaystackPayment(config)

  async function handleEventRegistraion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData= new FormData(e.currentTarget)
    const formValues={
      eventName:formData.get('eventName') as string,
      firstName:formData.get('firstName') as string,
      lastName:formData.get('lastName') as string,
      email:formData.get('email') as string,
      phoneNumber:formData.get('phoneNumber') as string,
    }
    // initializeEventPayment({onSuccess:eventPayment})
    initializeEventPayment({onSuccess:()=>{
      eventPayment()
      AddEventToDb(formValues)
    }})
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
            // size="lg"
            className="w-64  py-10 text-2xl font-bold bg-bts-BrownThree hover:bg-bts-BrownFour hover:scale-105 transition ease-in duration-300"
          >
            Register for Event
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-2xl mx-auto px-4">
          <DrawerHeader>
            <DrawerTitle className="text-center">Ticket Registration Form</DrawerTitle>
            <DrawerDescription className="text-center">
              Please fill in all the fields
            </DrawerDescription>
          </DrawerHeader>
          <div className="py-10">
            <form onSubmit={handleEventRegistraion}>
              <div className="space-y-4 lg:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Nadai"
                      onChange={(e)=>setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Amali"
                      onChange={(e)=>setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder="yourEmailAddress@mail.com" onChange={(e)=>setEamilAddress(e.target.value)} required/>
                  </div>
                  <div className="">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      type="phone"
                      name="phoneNumber"
                      placeholder="0700 000 000"
                      required
                    />
                  </div>
                </div>
                <Input
                      type="text"
                      name="eventName"
                      defaultValue={"Beyond The Savannah March Mixer Event"}
                      hidden
                      className="hidden"
                    />
                <div className="grid  ">
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
