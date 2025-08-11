"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadStatus } from "@/types/globals";
import { useUser } from "@clerk/nextjs";
import { SubscribedUserProp } from "@/types/subscribedUser";
import axios from "axios";
import { toast } from "sonner";

export default function ResumeUpload2() {
  
  const [file, setFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("");
  const [status, setStatus] = useState<UploadStatus>("idle");

  // user states
  const { user } = useUser();
  const [loggedUser, setLoggedUser] = useState<SubscribedUserProp | undefined>(undefined);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
    //     setFile(e.target.files[0]);
    //     setResumeName(e.target.files[0].name)
        if(e.target.files[0].size > 2 * 1024 * 1024){
            toast.warning("Selected resume file is too big, it should be less than 2MB")
        }else{

        setFile(e.target.files[0]);
        setResumeName(e.target.files[0].name)
        }
    }
  }

  async function handleResumeUpload() {
    setStatus("uploading");
    try {
      if (loggedUser !== undefined && file !== null && (user!=undefined ||user!=null)) {
          const formData=new FormData()
          
          formData.append("id",String(loggedUser.id))
          formData.append("status",loggedUser.status)
          formData.append("subscriptionPlan",loggedUser.subscriptionPlan)
          formData.append("career",String(loggedUser.career))
          formData.append("email",user.primaryEmailAddress?.emailAddress || "")
          formData.append("password",loggedUser.password || "")
          formData.append("firstName",loggedUser.firstName)
          formData.append("lastName",loggedUser.lastName)
          formData.append("phoneNumber", loggedUser.phoneNumber || "")
          formData.append("AttachmentName",resumeName)
          formData.append("file",file)
          formData.append("ImageUrl",loggedUser.imageUrl ||"")
          formData.append("isActive",String(loggedUser.isActive))
          formData.append("isDeleted",String(loggedUser.isDeleted))
          
          const result = await axios.put(`https://efmsapi-staging.azurewebsites.net/api/BydUsers/updateUserDetails?email=${user?.primaryEmailAddress?.emailAddress}`,
          formData,
          {headers:{"Content-Type":"multipart/form-data"}}
        );
        console.log("UPLOAD RESUME FUNCYION", result.data);
        if(result.data.errorMessage=="Update Done Affected Rows : 1"){toast.success(`Resume has been uploaded`)}
        if(result.data.errorMessage=="Update Done But No Matching Records Found"){toast.error(`Error, resume can't be uploaded, try again later`)}
        setFile(null)
        setStatus("idle")

      }
    } catch (error) {
        setStatus("error")
        toast.error(`Error on uploading file, please try again later`)
      console.log("Cannot upload users resume", error);
    }
  }
  useEffect(() => {
    async function getLoggedUserData() {
      try {
        const result = await axios.get<SubscribedUserProp>(
          `https://efmsapi-staging.azurewebsites.net/api/BydUsers/getUserDetailsByEmail?email=${user?.primaryEmailAddress?.emailAddress}`
        );
        setLoggedUser(result.data);
      } catch (error) {
        console.log(
          "Error Getting logged User subscription information in resume upload",
          error
        );
      }
    }

    if (user?.primaryEmailAddress?.emailAddress) {
      getLoggedUserData();
    }
  }, [user?.primaryEmailAddress?.emailAddress,file]);
  return (
    <>
      {/* <section className="py-10 ml-0 lg:-ml-32"> */}
      <section className="py-10 ml-0 lg:ml-10">
        <div className="min-h-[35vh]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full md:w-[28rem]">
          <p className="font-semibold text-xl">Resume Upload</p>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="file:bg-sky-300 file:px-12 file:pt-4 file:pb-4 file:-mt-4 file:rounded-lg bg-slate-50 py-12 rounded-lg"
          />
          {file && (
            <>
            
            <div className="flex gap-2 justify-between items-end bg-bts-BrownTwo p-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-sm pb-2">Selected Document</p>
                <span className="text-xs">{resumeName}</span>
              </div>
              <Button
                variant="outline"
                type="submit"
                onClick={handleResumeUpload}
              >
                {status == "uploading" &&("Uploading...")}
                {status == "idle" &&("Upload")}
                
              </Button>
            </div>
            </>
          )}
          <hr className="border-2 border-y-bts-BrownOne" />
          {(loggedUser!=undefined && loggedUser.attachmentName!="") &&
          (<div className="flex flex-col gap-2">
            <p className="font-semibold text-">Uploaded Resume File</p>
            <p className="font-light">{loggedUser.attachmentName}</p>
            </div>)}
          {/* {status==="error" && (<p className="text-red-300 tex-center text-sm">error, please try again later</p>)} */}
        </div>
      </section>
    </>
  );
}
