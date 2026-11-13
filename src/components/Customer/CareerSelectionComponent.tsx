"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, TriangleAlertIcon } from "lucide-react";
import { useGetJobSubCategoryDropDownList } from "@/app/dal/remoteData/getData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import clsx from "clsx";
import { axiosInstance } from "@/app/dal/remoteData/mutateData";


import {
  UpdateUsersEmailNotification,
  UpdateUsersJobEmailNotificationCareer,
} from "@/app/actions/viewJobSubscriptionAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
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
import { SubscribedUserProp } from "@/types/subscribedUser";
import { useUser } from "@clerk/nextjs";

export default function CareerSelectionComponent({
  userEmailAddress,
}: {
  userEmailAddress?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [emailNotificationState, setEmailNotificationState] = useState<boolean>(false);
  const [selectedCareerDepartmentValue, setSelectedCareerDepartmentValue] =useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<SubscribedUserProp | undefined>(undefined,);
  // const [currentCareer, setCurrentCareer] = useState(career);

  const router = useRouter();
  const { user } = useUser();

  const { data: jobDepartments } = useGetJobSubCategoryDropDownList();


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
  }, [user?.primaryEmailAddress?.emailAddress]);

  const handleEmailNotificationChange = async () => {
    toast.message("Updating career email notification...");
    try{
      if (
        loggedUser !== undefined &&
        (user != undefined || user != null)
      ) 
      
      {
        // setEmailNotificationState(!loggedUser.acceptEmailNotification);
        setEmailNotificationState(!emailNotificationState);
    

        const updatePayload1 = {
          id: loggedUser.id,
          status: loggedUser.status,
          subscriptionPlan: loggedUser.subscriptionPlan,
          career: Number(loggedUser.career),
          email: user.primaryEmailAddress?.emailAddress || loggedUser.email,
          currentOrganization:loggedUser.currentOrganization,
          fileKey:loggedUser.fileKey==null ?"":loggedUser.fileKey ,
          acceptEmailNotification: emailNotificationState,
          password: loggedUser.password==null? "":loggedUser.password,
          firstName: loggedUser.firstName==null ?"":loggedUser.firstName,
          lastName: loggedUser.lastName ==null ?"":loggedUser.lastName,
          phoneNumber: loggedUser.phoneNumber==null ?"":loggedUser.phoneNumber ,
          attachmentName: loggedUser.attachmentName==null?"":loggedUser.attachmentName,
          file: loggedUser.file==null ?"":"",
          imageUrl:loggedUser.imageUrl ,
          isActive: Boolean(loggedUser.isActive),
          isDeleted: Boolean(loggedUser.isDeleted)
        }; 

        const result = await axiosInstance.put(
          `api/BydUsers/updateUser?id=${loggedUser.id}`,
          updatePayload1,
          { headers: { "Content-Type": "application/json" } },
          // { headers: { "Content-Type": "multipart/form-data" } },
        );
        // console.log("UPLOAD RESUME FUNCYION", result.data);
        if (result.data.errorMessage == "Update Done Affected Rows : 1") {
          toast.success(`Career email notification has been updated`);
          // router.refresh()
          router.push("/Customer");
        }
        if (
            result.data.errorMessage ==
            "Update Done But No Matching Records Found"
        ) {
            toast.error(`Error, career email notification can't be updated, try again later`);
        }
        
        console.log("UPLOAD Career Email Notification FUNCTION", updatePayload1);
      }
  }
    catch(error){
      console.log("Error updating career email notification",error);
      toast.error("Failed to update career email notification");
    }
  };

  const handleSetNotification = async () => {
    toast.message("Updating career...");
    try{
 if (
        loggedUser !== undefined &&
        (user != undefined || user != null)
      ) {
       

        const updatePayload = {
          id: loggedUser.id,
          status: loggedUser.status,
          subscriptionPlan: loggedUser.subscriptionPlan,
          career: value || Number(loggedUser.career),
          email: user.primaryEmailAddress?.emailAddress || loggedUser.email,
          currentOrganization:loggedUser.currentOrganization,
          fileKey:loggedUser.fileKey==null ?"":loggedUser.fileKey ,
          acceptEmailNotification: Boolean(loggedUser.acceptEmailNotification),
          password: loggedUser.password==null? "":loggedUser.password,
          firstName: loggedUser.firstName==null ?"":loggedUser.firstName,
          lastName: loggedUser.lastName ==null ?"":loggedUser.lastName,
          phoneNumber: loggedUser.phoneNumber==null ?"":loggedUser.phoneNumber ,
          attachmentName: loggedUser.attachmentName==null?"":loggedUser.attachmentName,
          file: loggedUser.file==null ?"":"",
          imageUrl:loggedUser.imageUrl ,
          isActive: Boolean(loggedUser.isActive),
          isDeleted: Boolean(loggedUser.isDeleted)
        };      

        const result = await axiosInstance.put(
          `api/BydUsers/updateUser?id=${loggedUser.id}`,
          updatePayload,
          { headers: { "Content-Type": "application/json" } },
          // { headers: { "Content-Type": "multipart/form-data" } },
        );
        // console.log("UPLOAD RESUME FUNCYION", result.data);
        if (result.data.errorMessage == "Update Done Affected Rows : 1") {
          toast.success(`Career has been updated`);
        }
        if (
            result.data.errorMessage ==
            "Update Done But No Matching Records Found"
        ) {
            toast.error(`Error, career can't be updated, try again later`);
        }
        
      //   router.refresh()
      // router.push("/Customer");
        console.log("UPLOAD Career FUNCTION", updatePayload);
    }}
    catch(error){
      console.log("Error updating career",error);
      toast.error("Failed to update career");
    }
  };

  
  const selectedCareer = jobDepartments?.find(
    // (department) => department.value == Number(selectedCareerDepartmentValue),
    (department) => department.value == Number(loggedUser?.career),
  );
  return (
    <>
  

       <section className="py-10">
              <div className=" space-y-6  px-4 py-8 min-h-[20.3rem] md:min-h-113 bg-bts-BrownOne/50 rounded-lg ">
                <div className="space-y-4">
                  <p className="font-semibold text-xl">Career Selection</p>
                </div>
                <p className="text-xs">
                  Please select a career category that best matches your career to get
                  the right email notification
                </p>
                <div className="space-y-4">
                  <div className="m">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          // className="w-full md:min-w-[380px] justify-between"
                          className="w-full  justify-between"
                        >
                          {value !== null
                            ? jobDepartments?.find(
                                (department) => department.value === value,
                              )?.label
                            : "Type & Select Career"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-95 p-0">
                        <Command>
                          <CommandInput placeholder="Search Career Name..." />
                          <CommandList>
                            <CommandEmpty>Career not found</CommandEmpty>
                            <CommandGroup>
                              {jobDepartments?.map((department, index) => (
                                <CommandItem
                                  key={index}
                                  value={department.label}
                                  onSelect={(selectedLabel) => {
                                    const selectedDepartment = jobDepartments.find(
                                      (department) =>
                                        department.label == selectedLabel,
                                    );
                                    setValue(
                                      selectedDepartment
                                        ? selectedDepartment.value
                                        : null,
                                    );
      
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={clsx(
                                      value == department.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {department.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {value && (
                      <Button
                        // onClick={handleSetNotification}
                        onClick={()=>handleSetNotification()}
                        className="bg-green-700 mt-4 hover:bg-green-600 text-slate-100"
                      >
                        Confirm selection
                      </Button>
                    )}
                  </div>
                  <hr className="border-2 border-y-bts-BrownOne mt-12 " />
                  {/* {selectedCareer?.value && ( */}
                  {loggedUser?.career ? (
                    <div className=" rounded-lg px-4 text-start bg-amber-100 max-w-sm border- border-dotted">
                      <p className="text-xs py-2 space-y-2">
                        <span className="block text-[0.6rem]">Selected Career :</span>
                        <span className="block font-semibold text-base pl">
                          {selectedCareer?.label}
                        </span>{" "}
                      </p>
                    </div>
                  ): null}
                  <div className="flex items-center gap-2 w-full ">
                    <p className="text-xs">
                      Get email notification for new jobs postings
                    </p>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Input
                          type="checkbox"
                          readOnly
                          // checked={emailNotificationState as boolean}
                          checked={loggedUser!=undefined && loggedUser.acceptEmailNotification}
                          name="acceptEmailNotification"
                          className=" w-4 accent-lime-300"
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-center">
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center">
                            {/* {emailNotificationState === true */}
                            {loggedUser?.acceptEmailNotification === true
                              ? "You will no longer receive email notifications for new job postings."
                              : "You will start receiving email notifications for new job postings."}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-center gap-4 pr-28">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            // onClick={handleEmailNotificationChange}
                            onClick={ ()=> handleEmailNotificationChange()}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            I confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </section>
    </>
  );
}
