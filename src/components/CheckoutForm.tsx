"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import { Button } from "./ui/button"

const checkOutFormSchema=z.object({
    email:z.string().trim().email({ message:"Invalid Email"})
})


export default function CheckoutForm() {

    const form =useForm<z.infer<typeof checkOutFormSchema>>({
        resolver:zodResolver(checkOutFormSchema),
        defaultValues:{
            email:""
        }
    })
    function onSumbit(values: z.infer<typeof checkOutFormSchema>){
        console.log(values)
    }
    
  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email Address </FormLabel>
                            <FormControl><Input placeholder="email@mail.com" {...field}/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type='submit' size='lg' className="bg-green-400 hover:bg-green-500">Pay</Button>
            </form>
        </Form>
    </>
  )
}
