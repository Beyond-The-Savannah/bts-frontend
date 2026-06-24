"use client"

import { UploadButton } from "@/lib/uploadthing"
import clsx from "clsx"
import { toast } from "sonner"



export default function ResumeUpload3() {
  return (
    <>
    <section className={clsx("py-10")}>
      
        <div className="min-h-[20.3rem]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg ">
          <p className="font-semibold text-xl">Resume Upload</p>
         
            <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res)=>{
                console.log("UPLOADED RESUME FILES", res)
                toast.success("Resume uploaded")
            }}
            onUploadError={(error:Error)=>{
                console.log("FAILED TO UPLOAD RESUME FILES", error)
                toast.error("Failed to upload resume")
            }}
            />
          <hr className="border-2 border-y-bts-BrownOne" />
          
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-">Uploaded Resume File</p>
            <p className="font-light"></p>
            </div>
        </div>
      </section>
    </>
  )
}
