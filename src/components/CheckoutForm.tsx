"use client"
import {usePaystackPayment} from "react-paystack"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"




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
    const config = {
        reference: (new Date()).getTime().toString(),
        email: `gitonga1993@gmail.com`,
        amount: 2000000,
        currency:'KES',
        publicKey:"pk_test_83ea57747e15eb6b35096660d6b6517d3d57c706"
        // publicKey: `${process.env.NEXT_PUBLIC_PS_KEY}`,
    };

    // const onSuccess = (reference:any) => {
    //     console.log(reference);
    //   };
      const onClose = () => {
        console.log('closed')
      }
      const initializePayment = usePaystackPayment(config);

    function onSumbit(values: z.infer<typeof checkOutFormSchema>){
        initializePayment({onClose})
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
