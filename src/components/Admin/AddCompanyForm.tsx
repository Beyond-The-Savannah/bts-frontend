'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { CompanyFormSchema } from "@/formSchemas/jobListingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components//ui/input";
import { Button } from "@/components/ui/button";

export default function AddCompanyForm() {

    const form=useForm<z.infer<typeof CompanyFormSchema>>({
        resolver:zodResolver(CompanyFormSchema),
        defaultValues:{
            companyName:"",
            companyHeadQuaters:"",
            companyContactEmail:"",
            companyContactPhone:"",
            companyDescription:"",
            location:"",
            imageUrl:"",
        }
    })

    function onSubmit(data:z.infer<typeof CompanyFormSchema>){
        alert(JSON.stringify(data))
    }
  
    return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
                control={form.control}
                name="companyName"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="companyHeadQuaters"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Company HeadQuaters</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="companyContactEmail"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Company Contact Email</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="companyContactPhone"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Company Contact Phone</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="companyDescription"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="location"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="imageUrl"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Image Url</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            <Button  type="submit" className="bg-bts-BrownThree hover:bg-green-800">Add Company</Button>
        </form>
    </Form>
    </>
  )
}
