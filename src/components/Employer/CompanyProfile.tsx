"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import { ChangeEvent } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCompanyProfile } from "@/app/actions/EmployerForms";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function CompanyProfile() {

  const companyProfileFormSchema = z.object({
    name: z.string(),
    location: z.string(),
    // teamMembers: z.array(z.string()),
    companyLogo: z.string(),
    // companyLogo: z.instanceof(Buffer),
  });

  async function handleLogoUpload(e:ChangeEvent<HTMLInputElement>){
    if(e.target.files !=null){
        if(e.target.files[0].size>2*1024*1024){
            toast.warning('Selected Logo Image File is too big. It should be less than 2MB')
        }
        else{
            const file=e.target.files[0]
            const reader=new FileReader()
            // reader.readAsArrayBuffer(file)
            reader.readAsDataURL(file)
            reader.onloadend=function(){
                // const arrayBuffer=reader.result as ArrayBuffer
                // const buffer=Buffer.from(arrayBuffer)
                // setValue("companyLogo",buffer)
                const convertedFile=reader.result as string
                setValue('companyLogo',convertedFile)
            }
        }
    }

  }

  type companyProfileFields = z.infer<typeof companyProfileFormSchema>;

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<companyProfileFields>({resolver:zodResolver(companyProfileFormSchema)});
  
  async function formSubmit(data:companyProfileFields){
    try {
        await AddCompanyProfile(data)
        // await AddCompanyProfile({...data,companyLogo:Buffer.from(data.companyLogo).toString('base64')})
        // if(!response.ok){}
        toast.success("Profile Details Added")
        reset()
        
    } catch (error) {
        toast.error("Error in adding company profile, please try again later")
        console.error("Error Adding Company Profile",error)
    }
  }
  
  return (
    <>
<section className="px-4">
        <p className="font-bold text-3xl">Company Profile Form</p>
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="space-y-16 border rounded-lg p-4 my-10">
            <div className="flex flex-wrap items-center gap-8">
              <div className="w-full md:flex-1">
                <Label htmlFor="name">Company Name</Label>
                <Input type="text" {...register("name",{required:"Company Name is required"})} name="name"/>
                {errors.name && (<p className="text-sm text-red-500">errors.name.message</p>)}
              </div>
              <div className="w-full md:flex-1">
                <Label htmlFor="location">Location</Label>
                <Input type="text" {...register("location", {required:"Location is required"})} name="location"/>
                {errors.location && (<p className="text-sm text-red-500">errors.location.message</p>)}
              </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-8">
              {/* <div className="w-full md:flex-1">
                <Label htmlFor="teamMembers">Team Members(emails)</Label>
                <Input type="text" {...register("teamMembers")} name="teamMembers" hidden/>
                {errors.teamMembers && (<p className="text-sm text-red-500">errors.teamMembers.message</p>)}
              </div> */}
              <div className="w-full md:flex-1">
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input
                  type="file"
                  name="companyLogo"
                  accept="images/*"
                  onChange={handleLogoUpload}
                  required/>
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-green-400 hover:bg-green-600">
                {isSubmitting ?"Adding details....":"Add Details"}
            </Button>
          </div>
        </form>
      </div>

</section>
    </>
  );
}
