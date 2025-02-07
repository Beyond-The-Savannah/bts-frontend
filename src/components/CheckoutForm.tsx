"use client"
import {usePaystackPayment} from "react-paystack"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import axios from "axios"
import { toast } from "sonner"




const checkOutFormSchema=z.object({
    email:z.string().trim().email({ message:"Invalid Email"}),
    firstName:z.string().trim(),
    lastName:z.string().trim(),
    
})



export default function CheckoutForm(amount:{amount:number}) {
    
    const payStackKey=process.env.NEXT_PUBLIC_PS_KEY
    if(!payStackKey){ throw new Error('PS key is missing')}
    const amountInCents=amount.amount*100
    const form =useForm<z.infer<typeof checkOutFormSchema>>({
        resolver:zodResolver(checkOutFormSchema),
        defaultValues:{
            email:"",
            firstName:"",
            lastName:"",
        }
    })
    const {watch} =form
    const email=watch('email')
    const config = {
        reference: (new Date()).getTime().toString(),
        email,
        amount: amountInCents,
        currency:'KES',
        publicKey:payStackKey,
    };

    
      const onSuccess = async() => {
        await axios.get(`/api/send`)
        toast.info(`Please check your email, "${email}" for more instructions`,{duration:16000})
      }
    //   const onClose = () => {
    //     console.log('closed')
    //   }
      const initializePayment = usePaystackPayment(config);

    function onSumbit(values: z.infer<typeof checkOutFormSchema>){
        initializePayment({onSuccess})
        console.log(values)
        console.log(amountInCents)
    }
    
    
  return (
    <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email Address </FormLabel>
                            <FormControl>
                                <Input placeholder="email@mail.com" {...field} required/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>First Name </FormLabel>
                            <FormControl>
                                <Input placeholder="Imani" {...field} required/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Last Name </FormLabel>
                            <FormControl>
                                <Input placeholder="Lulu" {...field} required/></FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                </div>
                <Button type='submit' size='lg' 
                    // className="w-full bg-green-400 hover:bg-green-500"
                    className="w-full bg-bts-GreenOne hover:bg-green-500"
                >
                    Start payment process</Button>
            </form>
        </Form>
    </>
  )
}
