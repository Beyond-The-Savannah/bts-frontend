"use client"

import { AddAndUpdateUsersResume } from "@/app/actions/viewJobSubscriptionAction"
import { UploadButton } from "@/lib/uploadthing"
import { ResumeUploadedProps } from "@/types/globals"
import clsx from "clsx"
import { File } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



export default function ResumeUpload3({userId, resumeData}:{userId:string,resumeData:ResumeUploadedProps}) {
  const router=useRouter()
  return (
    <>
    <section className={clsx("py-10")}>
      
        <div className="min-h-[20.3rem]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg ">
          <p className="font-semibold text-xl">Resume Upload</p>
         
          <p className=" text-xs">Ensure that your resume file is less than 1MB and that the file format is pdf</p>
          <UploadButton
          endpoint="imageUploader"
          onUploadBegin={()=>{
            toast.message("Uploading resume...")
          }
          }
          onClientUploadComplete={async(res)=>{
            const uploadedFile = res?.[0];
            try {
             const result= await AddAndUpdateUsersResume({userId,data:{name:uploadedFile.name,ufsUrl:uploadedFile.ufsUrl,key:uploadedFile.key}})
             if(result.success==true){
               //  console.log("UPLOADED RESUME FILES", res)
               toast.success("Resume uploaded")
               router.push("/Customer")
               
              }else{
                toast.error("Failed to upload resume")
              }
              

             
              
            } catch (error) {
              console.log("Failed to add resume", error)
            }
          }}
          onUploadError={(error:Error)=>{
              console.log("FAILED TO UPLOAD RESUME FILES", error)
              toast.error("Failed to upload resume")
          }}
          />

          <hr className="border-2 border-y-bts-BrownOne mt-10 " />
            
          {resumeData?.resumeName!=null && (
          <div className="flex flex-row items-center gap-2 border border-dotted bg-amber-100 max-w-lg rounded-lg py-1 pl-2">
              <p className="font-light text-xs">Uploaded : </p>
            <div className="flex">
              <File/>
              <p className="font-semibold">{resumeData.resumeName}</p>
            </div>
            </div>

          )}
        </div>
      </section>
    </>
  )
}
