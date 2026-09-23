'use client'

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Calendar } from "../ui/calendar"
import { Separator } from "../ui/separator"
import { AddUserAndSubscriptionToDb } from "@/app/actions/viewJobSubscriptionAction"

const userSubcriptionFormSchema=z.object({
    firstName:z.string().trim().min(2,"First Name must be at least 2 characters"),
    lastName:z.string().trim().min(2,"Last Name must be at least 2 characters"),
    emailAddress:z.string().trim().min(1,"Email Address cannot be empty").email('Please enter a valid email'),
    subscriptionStatus:z.string().min(1,"Please select one status"),
    subscriptionType:z.string().min(1,"Please select one type"),
    subscriptionPrice:z.string().min(1,"Please select one Price"),
    subscriptionTierName:z.string().min(1,"Please select one Tier"),
    subscriptionStartDate:z.date({message:"Please select start date"}),
    subscriptionEndDate:z.date({message:"Please select end date"}),
    
})

export default function UserSubscriptionForm() {
    const [startDate,setStartDate]=React.useState<Date|undefined>( new Date())
    // const [endDate,setEndDate]=useState<Date|undefined>()

    const form=useForm<z.infer<typeof userSubcriptionFormSchema>>({
        resolver:zodResolver(userSubcriptionFormSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            emailAddress:"",
            subscriptionStatus:"",
            subscriptionType:"",
            subscriptionPrice:"",
            subscriptionTierName:"",
            subscriptionStartDate: startDate,
            // subscriptionEndDate:endDate,
            subscriptionEndDate:undefined,
        }
    })
    async function onSumbit(data:z.infer<typeof userSubcriptionFormSchema>){
        // toast("",{
        //     description:(<pre><code>{JSON.stringify(data, null, 2)}</code></pre>),
        //     duration:8000
        // })
        const userData={
            firstName:data.firstName,
            lastName:data.lastName,
            emailAddress:data.emailAddress
        }
        const subscriptionData={
      subscriptionTransactionReference:"",
      subcriptionTierName:data.subscriptionTierName,
      subcriptionTierType:data.subscriptionType,
      subscriptionPrice:data.subscriptionPrice,
      subscriptionStatus:data.subscriptionStatus,
      subscriptionCanceledAt:null,
      subscriptionPaymentChannel:null,
      subscriptionStartDate:data.subscriptionStartDate,
      subscriptionEndDate:data.subscriptionEndDate,
    }
        try {
            await AddUserAndSubscriptionToDb(userData,subscriptionData)
            toast.success("User record added")
        } catch (error) {
            toast.error("Error adding  user record")
        }
        form.reset()
    }
  return (
    <>
    <div className="container mx-auto">
        <Card className="c">
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="userSubscriptionForm" onSubmit={form.handleSubmit(onSumbit)}>
                        <FieldGroup>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Controller
                                    name="firstName"
                                    control={form.control}
                                    render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel id="userSubscriptionForm">First Name</FieldLabel>
                                            <Input
                                                {...field}
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Yuna"
                                                autoComplete="off"
                                                className=""
                                            />
                                            {fieldState.invalid &&(<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="lastName"
                                    control={form.control}
                                    render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel id="userSubscriptionForm">Last Name</FieldLabel>
                                            <Input
                                                {...field}
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Zawadi"
                                                autoComplete="off"
                                                className=""
                                            />
                                            {fieldState.invalid &&(<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}
                                />

                            {/* </div>
                            <div className=""> */}
                                <Controller
                                    name="emailAddress"
                                    control={form.control}
                                    render={({field, fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel id="userSubscriptionForm">Email Address</FieldLabel>
                                            <Input
                                                {...field}
                                                type="email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Zawadi"
                                                autoComplete="off"
                                                className=""
                                                // required
                                            />
                                            {fieldState.invalid &&(<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}
                                />
    
                            </div>
                            <div className="my-4"/>
                            <Separator/>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                
                                <Controller
                                    name="subscriptionStatus"
                                    control={form.control}
                                    render={({field,fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldContent>
                                                <FieldLabel>Subscription Status</FieldLabel>
                                            </FieldContent>
                                            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger id="userSubscriptionForm" aria-invalid={fieldState.invalid} className="w-full">
                                                    <SelectValue placeholder="select between the two states"/>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>

                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}          
                                />
                                <Controller
                                    name="subscriptionTierName"
                                    control={form.control}
                                    render={({field,fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldContent>
                                                <FieldLabel>Subscription Type</FieldLabel>
                                            </FieldContent>
                                            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger id="userSubscriptionForm" aria-invalid={fieldState.invalid} className="w-full">
                                                    <SelectValue placeholder="select subcription type"/>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="Basic">Basic</SelectItem>
                                                        <SelectItem value="Most Popular">Most Popular</SelectItem>
                                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                                        <SelectItem value="Premium">Premium</SelectItem>
                                                        <SelectItem value="Free">Free</SelectItem>

                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}          
                                />
                            {/* </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                                
                                <Controller
                                    name="subscriptionPrice"
                                    control={form.control}
                                    render={({field,fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldContent>
                                                <FieldLabel>Subscription Status</FieldLabel>
                                            </FieldContent>
                                            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger id="userSubscriptionForm" aria-invalid={fieldState.invalid} className="w-full">
                                                    <SelectValue placeholder="select between the two states"/>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="450">450</SelectItem>
                                                        <SelectItem value="750">750</SelectItem>
                                                        <SelectItem value="1100">1100</SelectItem>
                                                        <SelectItem value="1500">1500</SelectItem>
                                                        <SelectItem value="5400">5400</SelectItem>
                                                        <SelectItem value="9000">9000</SelectItem>
                                                        <SelectItem value="13200">13200</SelectItem>
                                                        <SelectItem value="18000">18000</SelectItem>
                                                        <SelectItem value="4.5">4.5</SelectItem>
                                                        <SelectItem value="7.5">7.5</SelectItem>
                                                        <SelectItem value="11">11</SelectItem>
                                                        <SelectItem value="15">15</SelectItem>
                                                        <SelectItem value="54">54</SelectItem>
                                                        <SelectItem value="90">90</SelectItem>
                                                        <SelectItem value="132">132</SelectItem>
                                                        <SelectItem value="180">180</SelectItem>
                                                        <SelectItem value="0">0</SelectItem>
                                                        

                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}          
                                />
                                <Controller
                                    name="subscriptionType"
                                    control={form.control}
                                    render={({field,fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldContent>
                                                <FieldLabel>Subscription Type</FieldLabel>
                                            </FieldContent>
                                            <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger id="userSubscriptionForm" aria-invalid={fieldState.invalid} className="w-full">
                                                    <SelectValue placeholder="select the tier Type"/>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                        <SelectItem value="annually">Annually</SelectItem>

                                                    </SelectContent>
                                                </SelectTrigger>
                                            </Select>
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}          
                                />
                            </div>
                            <div className="my-4"/>
                            <Separator/>
                            <div className="flex justify-center gap-4">
                                 <Controller
                                    name="subscriptionStartDate"
                                    control={form.control}
                                    render={({field,fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Subscription Start Date</FieldLabel>
                                           <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={setStartDate}
                                            captionLayout="dropdown"
                                            className="rounded-md border "
                                           />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}          
                                />
                                 <Controller
                                    name="subscriptionEndDate"
                                    control={form.control}
                                    render={({field,fieldState})=>(
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Subscription End Date</FieldLabel>
                                           <Calendar
                                            mode="single"
                                            // selected={endDate}
                                            // onSelect={setEndDate}
                                            selected={field.value}
                                            onSelect={(date)=>{field.onChange(date)
                                                if(date) form.clearErrors("subscriptionEndDate")
                                            }}
                                            captionLayout="dropdown"
                                            
                                            className="rounded-md border "
                                           />
                                            {fieldState.invalid && (<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}          
                                />
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="w-full flex justify-center">
                    <Field orientation="horizontal">
                        <Button type="submit" disabled={form.formState.isSubmitting} form="userSubscriptionForm" className="bg-green-400 hover:bg-green-600 transition-colors w-80 px-2 py-6" >
                            {form.formState.isSubmitting ?"Adding...":"Add"}
                        </Button>
                    </Field>
                </CardFooter>
        </Card>
    </div>
    </>
  )
}
