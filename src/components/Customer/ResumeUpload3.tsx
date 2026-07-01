"use client";

import {
  AddAndUpdateUsersResume,
  RemoveUserResume,
} from "@/app/actions/viewJobSubscriptionAction";
import { UploadButton } from "@/lib/uploadthing";
import { ResumeUploadedProps } from "@/types/globals";
import clsx from "clsx";
import { File, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
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
} from "../ui/alert-dialog";

export default function ResumeUpload3({
  userId,
  resumeData,
}: {
  userId: string;
  resumeData: ResumeUploadedProps;
}) {
  const router = useRouter();
  const handleDeleteResume = (fileKey: string) => {
    toast.promise(RemoveUserResume(fileKey), {
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
  };
  return (
    <>
      <section className={clsx("py-10")}>
        <div className="min-h-[20.3rem]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg ">
          <p className="font-semibold text-xl">Resume Upload</p>

          <p className=" text-xs">
            Ensure that your resume file is less than 1MB and that the file
            format is pdf
          </p>
          {resumeData?.resumeName == null ? (
            <>
              <UploadButton
                endpoint="imageUploader"
                onUploadBegin={() => {
                  toast.message("Uploading resume...");
                }}
                onClientUploadComplete={async (res) => {
                  const uploadedFile = res?.[0];
                  try {
                    const result = await AddAndUpdateUsersResume({
                      userId,
                      data: {
                        name: uploadedFile.name,
                        ufsUrl: uploadedFile.ufsUrl,
                        key: uploadedFile.key,
                      },
                    });
                    if (result.success == true) {
                      //  console.log("UPLOADED RESUME FILES", res)
                      toast.success("Resume uploaded");
                      router.push("/Customer");
                    } else {
                      toast.error("Failed to upload resume");
                    }
                  } catch (error) {
                    console.log("Failed to add resume", error);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.log("FAILED TO UPLOAD RESUME FILES", error);
                  toast.error("Failed to upload resume");
                }}
              />
              <hr className="border-2 border-y-bts-BrownOne mt-10 " />
            </>
          ) : (
            <>
              <hr className="border-2 border-y-bts-BrownOne mt-28 " />

              {resumeData?.resumeName != null && (
                <div className="flex items-center gap-2">
                  <div className="flex flex-row items-center gap-2 border border-dotted bg-amber-100 max-w-lg rounded-lg py-1 pl-2">
                    <p className="font-light text-xs">Uploaded : </p>
                    <div className="flex items-center gap-2">
                      <File />
                      <p className="font-semibold">{resumeData.resumeName}</p>
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
                            handleDeleteResume(resumeData.fileKey as string)
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
          )}
        </div>
      </section>
    </>
  );
}
