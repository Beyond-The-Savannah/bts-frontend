'use client'
import React, { useState } from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

export default function ResumeUpload() {
    // const ResumeSchema=z.object({
    //     userResume:z.string()
    // })

    // const form=useForm<z.infer<typeof ResumeSchema>>({
    //     resolver:zodResolver(ResumeSchema),
    //     defaultValues:{
    //         userResume:""
    //     }
    // })
        
    // function handleResumeUpload(e:React.ChangeEvent<HTMLInputElement>){
    //     if(e.target.files){
    //         const data=new FileReader()
    //         console.log("USER RESUME",data)
    //     }
    // }
    // async function handleResumeUpload(data:FormData){
    //     'use server'
    //     const resumeData=data.get('resumeFile') as unknown as File
    //     if(!resumeData){ console.log("No Resume File to upload")}
    //     const bytes= await resumeData.arrayBuffer()
    //     const buffer=Buffer.from(bytes)
    //     console.log("Resume Bufffer", buffer)
    // }

    const [resumeName,setResumeName]=useState("")
    const [resume, setResume]=useState<string|ArrayBuffer|null>(null)
    
    async function handleResumeSubmit(e:React.ChangeEvent<HTMLInputElement>){
        if(e.target.files != null){
            // const file=e.target.files[0]
            // const formData= new FormData()
            // formData.append('resume', file)
            // console.log("USER RESUME",formData)
            const data= new FileReader()
            data.addEventListener("load", ()=>{
                if(typeof data.result=="string"){
                    const commaIndex=data.result.indexOf(",")
                    const base64String=data.result.slice(commaIndex +1)
                    setResume(base64String)
                }
            })
            data.readAsDataURL(e.target.files[0])
            setResumeName(e.target.files[0].name)

            console.log("Resume Name", resumeName)
            console.log("Resume", resume)
        }

    }

  return (
    <section className="py-10 ml-0 lg:-ml-20">
      <div className="min-h-[30vh]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full">
        <p className="font-semibold text-xl">ResumeUpload</p>
        <div className="c">
            {/* <form action={handleResumeUpload} className="space-y-4">
                <Input required type="file" name="resumeFile"/>
                <Button type="submit">Upload</Button>
            </form> */}

            {/* <form onSubmit={handleResumeSubmit} className="space-y-4"> */}
            <form  className="space-y-4">
                <Input required type="file" name="resumeFile" onChange={handleResumeSubmit}/>
                {/* <Button type="submit">Upload</Button> */}
            </form>
            {/* <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name='userResume'
                    render={()=>(<FormItem>
                        <FormLabel>Your Resume</FormLabel>
                        <FormControl>
                            <Input className="" required type="file" accept="" onChange={handleResumeUpload}/>
                        </FormControl>
                    </FormItem>)}
                />
            </form> 

            </Form>*/}
        </div>
      </div>
    </section>
  );
}
