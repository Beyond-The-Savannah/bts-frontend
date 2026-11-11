"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadStatus } from "@/types/globals";
import { useUser } from "@clerk/nextjs";
import { SubscribedUserProp, UploadResult } from "@/types/subscribedUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import clsx from "clsx";
import { axiosInstance } from "@/app/dal/remoteData/mutateData";
import { UploadButton } from "@/lib/uploadthing";
import { File, Trash2 } from "lucide-react";
import { RemoveUserResume1 } from "@/app/actions/viewJobSubscriptionAction";
import { useRouter } from "next/navigation";

export default function ResumeUpload2() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("");
  const [status, setStatus] = useState<UploadStatus>("idle");

  const [fileKey, setFileKey] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const router = useRouter();

  // user states
  const { user } = useUser();
  const [loggedUser, setLoggedUser] = useState<SubscribedUserProp | undefined>(
    undefined,
  );

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      //     setFile(e.target.files[0]);
      //     setResumeName(e.target.files[0].name)
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        toast.warning(
          "Selected resume file is too big, it should be less than 2MB",
        );
      } else {
        setFile(e.target.files[0]);
        setResumeName(e.target.files[0].name);
      }
    }
  }
  async function handleResumeUpload1(upload:UploadResult) {
     try {
      if (
        loggedUser !== undefined &&
        (user != undefined || user != null)
      ) {
       

        const updatePayload = {
          id: loggedUser.id,
          status: loggedUser.status,
          subscriptionPlan: loggedUser.subscriptionPlan,
          career: Number(loggedUser.career),
          email: user.primaryEmailAddress?.emailAddress || loggedUser.email,
          currentOrganization: loggedUser.currentOrganization || "",
          fileKey: upload.fileKey || loggedUser.fileKey || "",
          acceptEmailNotification: Boolean(loggedUser.acceptEmailNotification),
          password: loggedUser.password || "",
          firstName: loggedUser.firstName,
          lastName: loggedUser.lastName,
          phoneNumber: loggedUser.phoneNumber || "",
          AttachmentName: upload.fileName,
          file: "",
          ImageUrl: upload.fileUrl || loggedUser.imageUrl || "",
          isActive: Boolean(loggedUser.isActive),
          isDeleted: Boolean(loggedUser.isDeleted)
        };      

        // const result = await axios.put(`https://efmsapi-staging.azurewebsites.net/api/BydUsers/updateUserDetails?email=${user?.primaryEmailAddress?.emailAddress}`,
        const result = await axiosInstance.put(
          `api/BydUsers/updateUser?id=${loggedUser.id}`,
          // `api/BydUsers/updateUserDetails?email=${loggedUser.email}`,
          updatePayload,
          // { headers: { "Content-Type": "application/json" } },
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        // console.log("UPLOAD RESUME FUNCYION", result.data);
        if (result.data.errorMessage == "Update Done Affected Rows : 1") {
          toast.success(`Resume has been uploaded`);
        }
        if (
          result.data.errorMessage ==
          "Update Done But No Matching Records Found"
        ) {
          toast.error(`Error, resume can't be uploaded, try again later`);
        }

        console.log("UPLOAD RESUME FUNCTION", updatePayload);
        
      }
    } catch (error) {
      // setStatus("error");
      toast.error(`Error on uploading file, please try again later`);
      console.log("Cannot upload users resume", error);
    }
  }

  const handleDeleteResume1 = (fileKey: string) => {
    if(loggedUser !== undefined){
      toast.promise(RemoveUserResume1(fileKey,loggedUser), {
        loading: "Deleting resume...",
        success: () => {
          router.refresh();
          router.push("/Customer");
          return "Resume deleted";
        },
        error: (err) => {
          console.log("Failed to delete resume", err);
          return "Failed to delete resume";
        },
      });
    }
    };

  // async function handleResumeUpload() {
  //   setStatus("uploading");
  //   try {
  //     if (
  //       loggedUser !== undefined &&
  //       file !== null &&
  //       (user != undefined || user != null)
  //     ) {
  //       const formData = new FormData();

  //       formData.append("id", String(loggedUser.id));
  //       formData.append("status", loggedUser.status);
  //       formData.append("subscriptionPlan", loggedUser.subscriptionPlan);
  //       formData.append("career", String(loggedUser.career));
  //       formData.append("email", user.primaryEmailAddress?.emailAddress || "");
  //       formData.append("password", loggedUser.password || "");
  //       formData.append("firstName", loggedUser.firstName);
  //       formData.append("lastName", loggedUser.lastName);
  //       formData.append("phoneNumber", loggedUser.phoneNumber || "");
  //       formData.append("AttachmentName", resumeName);
  //       formData.append("file", file);
  //       formData.append("ImageUrl", loggedUser.imageUrl || "");
  //       formData.append("isActive", String(loggedUser.isActive));
  //       formData.append("isDeleted", String(loggedUser.isDeleted));

  //       // const result = await axios.put(`https://efmsapi-staging.azurewebsites.net/api/BydUsers/updateUserDetails?email=${user?.primaryEmailAddress?.emailAddress}`,
  //       const result = await axiosInstance.put(
  //         `api/BydUsers/updateUserDetails?email=${user?.primaryEmailAddress?.emailAddress}`,
  //         formData,
  //         { headers: { "Content-Type": "multipart/form-data" } },
  //       );
  //       // console.log("UPLOAD RESUME FUNCYION", result.data);
  //       if (result.data.errorMessage == "Update Done Affected Rows : 1") {
  //         toast.success(`Resume has been uploaded`);
  //       }
  //       if (
  //         result.data.errorMessage ==
  //         "Update Done But No Matching Records Found"
  //       ) {
  //         toast.error(`Error, resume can't be uploaded, try again later`);
  //       }
  //       setFile(null);
  //       setStatus("idle");
  //     }
  //   } catch (error) {
  //     setStatus("error");
  //     toast.error(`Error on uploading file, please try again later`);
  //     console.log("Cannot upload users resume", error);
  //   }
  // }

  useEffect(() => {
    async function getLoggedUserData() {
      try {
        const result = await axiosInstance.get(
          `/api/BydUsers/getUserDetailsByEmail?email=${user?.primaryEmailAddress?.emailAddress}`,
        );
        setLoggedUser(result.data);
      } catch (error) {
        console.log(
          "Error Getting logged User subscription information in resume upload",
          error,
        );
      }
    }

    if (user?.primaryEmailAddress?.emailAddress) {
      getLoggedUserData();
    }
  }, [user?.primaryEmailAddress?.emailAddress, file]);
  return (
    <>
      <section
        className={clsx("py-10", loggedUser == undefined ? "hidden" : "block")}
      >
        {/* <div className="min-h-[20.3rem]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg ">
          <p className="font-semibold text-xl">Resume Upload</p>
          <Input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf"
            className="file:bg-sky-300 file:px-12 file:pt-4 file:pb-4 file:-mt-4 file:rounded-lg bg-slate-50 py-12 rounded-lg"
          />
          {file && (
            <>
              <div className="flex gap-2 justify-between items-end bg-bts-BrownTwo p-2">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-sm pb-2">
                    Selected Document
                  </p>
                  <span className="text-xs">{resumeName}</span>
                </div>
                <Button
                  variant="outline"
                  type="submit"
                  onClick={handleResumeUpload}
                >
                  {status == "uploading" && "Uploading..."}
                  {status == "idle" && "Upload"}
                </Button>
              </div>
            </>
          )}
          <hr className="border-2 border-y-bts-BrownOne" />
          {loggedUser != undefined && loggedUser.attachmentName != "" && (
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-">Uploaded Resume File</p>
              <p className="font-light">{loggedUser.attachmentName}</p>
            </div>
          )}
        </div> */}

        <div className="min-h-[20.3rem]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg mt- ">
          <p className="font-semibold text-xl">Resume Upload</p>
          <p className=" text-xs">
            Ensure that your resume file is less than 1MB and that the file
            format is pdf
          </p>
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={() => {
              toast.message("Uploading resume...");
            }}
            onClientUploadComplete={async (res) => {
              const uploadedFile = res?.[0];
              setFileKey(uploadedFile.key);
              setFileUrl(uploadedFile.ufsUrl);
              setFileName(uploadedFile.name);
              try {
                await handleResumeUpload1({
                  fileKey: uploadedFile.key,
                  fileUrl: uploadedFile.ufsUrl,
                  fileName: uploadedFile.name,
                });
              } catch (error) {
                console.log("Error on uploading resume", error);
              }
            }}
            onUploadError={(error: Error) => {
              console.log("FAILED TO UPLOAD RESUME FILES", error);
              toast.error("Failed to upload resume");
            }}
          />
          <hr className="border-2 border-y-bts-BrownOne mt-10 " />

          <>
              <hr className="border-2 border-y-bts-BrownOne mt-28 " />

              {/* {resumeData?.resumeName != null && ( */}
              {loggedUser?.fileKey != null && (
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-start gap-2 border border-dotted bg-amber-100 max-w-lg rounded-lg py-4 px-4 ">
                    <p className="font-light text-[0.6rem]">Uploaded : </p>
                    <div className="flex items-center gap-2">
                      <File />
                      <p className="font-semibold">{loggedUser.attachmentName}</p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {/* <Button variant="link" className=" bg-red-100 hover:scale-110 duration-700 hover:cursor-pointer" onClick={()=>handleDeleteResume(resumeData.fileKey as string)}> */}
                      <Button
                        variant="link"
                        className=" bg-red-100 hover:scale-110 duration-700 hover:cursor-pointer"
                      >
                        <Trash2 className="text-red-400 hover:text-red-600" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader >
                        <AlertDialogTitle className="text-center">
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex justify-center items-center gap-4 w-full  pr-20">
                        <AlertDialogCancel className=" ">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                      className="bg-red-500 hover:bg-red-600 "
                          onClick={() =>
                            // handleDeleteResume(resumeData.fileKey as string)
                            handleDeleteResume1(loggedUser.fileKey)
                          }
                        >
                          Yes, delete resume
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </>
        </div>
      </section>
    </>
  );
}
