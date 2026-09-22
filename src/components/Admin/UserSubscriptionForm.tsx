'use client'

import { Controller, useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toast } from "sonner"

const userSubcriptionFormSchema=z.object({
    firstName:z.string().trim().min(2,"First Name must be at least 2 characters"),
    lastName:z.string().trim().min(2,"Last Name must be at least 2 characters"),
    emailAddress:z.string().trim().min(1,"Email Address cannot be empty").email('Please enter a valid email')
    
})

export default function UserSubscriptionForm() {
    const form=useForm<z.infer<typeof userSubcriptionFormSchema>>({
        resolver:zodResolver(userSubcriptionFormSchema),
        defaultValues:{
            firstName:"",
            lastName:"",
            emailAddress:"",
        }
    })
    function onSumbit(data:z.infer<typeof userSubcriptionFormSchema>){
        toast("",{
            description:(<pre><code>{JSON.stringify(data, null, 2)}</code></pre>),
            duration:8000
        })
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                            </div>
                            <div className="c">
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
                                                required
                                            />
                                            {fieldState.invalid &&(<FieldError errors={[fieldState.error]}/>)}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="w-full flex justify-center">
                    <Field orientation="horizontal">
                        <Button type="submit" disabled={form.formState.isSubmitting} form="userSubscriptionForm" >
                            {form.formState.isSubmitting ?"Adding...":"Add"}
                        </Button>
                    </Field>
                </CardFooter>
        </Card>
    </div>
    </>
  )
}
