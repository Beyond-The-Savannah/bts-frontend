"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import clsx from "clsx";

import { AddAndUpdateUsersOrganisation } from "@/app/actions/viewJobSubscriptionAction";
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
} from "@/components/ui/alert-dialog";
import { kenyaOrganisations } from "@/staticData/Customer/dataInformation";
import { set } from "date-fns";
import { axiosInstance } from "@/app/dal/remoteData/mutateData";
import { useUser } from "@clerk/nextjs";
import { SubscribedUserProp } from "@/types/subscribedUser";

export default function OrganisationSelectionComponent2() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [organisation, setOrganisation] = useState("");
  const router = useRouter();
  const { user } = useUser();
  const [loggedUser, setLoggedUser] = useState<SubscribedUserProp | undefined>(undefined,);

  const handleSetOrganisation = async () => {
    toast.message("Updating organisation...");
    try{
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
          currentOrganization: organisation || value || loggedUser.currentOrganization,
          fileKey:loggedUser.fileKey ,
          acceptEmailNotification: Boolean(loggedUser.acceptEmailNotification),
          password: loggedUser.password ,
          firstName: loggedUser.firstName,
          lastName: loggedUser.lastName,
          phoneNumber: loggedUser.phoneNumber ,
          AttachmentName: loggedUser.attachmentName,
          file: loggedUser.file,
          ImageUrl:loggedUser.imageUrl ,
          isActive: Boolean(loggedUser.isActive),
          isDeleted: Boolean(loggedUser.isDeleted)
        };      

        const result = await axiosInstance.put(
          `api/BydUsers/updateUser?id=${loggedUser.id}`,
          updatePayload,
          // { headers: { "Content-Type": "application/json" } },
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        // console.log("UPLOAD RESUME FUNCYION", result.data);
        if (result.data.errorMessage == "Update Done Affected Rows : 1") {
          toast.success(`Organisation has been updated`);
        }
        if (
            result.data.errorMessage ==
            "Update Done But No Matching Records Found"
        ) {
            toast.error(`Error, organisation can't be updated, try again later`);
        }
        
        router.refresh()
      router.push("/Customer");
        console.log("UPLOAD Organisation FUNCTION", updatePayload);
    }}
    catch(error){
      console.log("Error updating organisation",error);
      toast.error("Failed to update organisation");
    }
   
  };

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
  return (
    <section className="py-10">
      <div className=" space-y-6  px-4 py-8 min-h-[20.3rem] md:min-h-113 bg-bts-BrownOne/50 rounded-lg ">
        <div className="space-y-4">
          <p className="font-semibold text-xl">Organisation Selection</p>
        </div>
        <p className="text-xs">
          What Organisation are you currently work for or studying at?
          <br />
          <br />
          Please select the organisation from the list below.
          <br />
          <br />
          <span className="">
            If your organisation is not listed, please provide the name of your
            organisation in the text field provided.
          </span>
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
                    ? kenyaOrganisations?.find(
                        (organisation) => organisation.name === value,
                      )?.name
                    : "Type & Select Organisation"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-95 p-0">
                <Command>
                  <CommandInput placeholder="Search Organisation Name..." />
                  <CommandList>
                    <CommandEmpty>Organisation not found</CommandEmpty>
                    <CommandGroup>
                      {kenyaOrganisations?.map((organisation, index) => (
                        <CommandItem
                          key={index}
                          value={organisation.name}
                          onSelect={(selectedName) => {
                            const selectedOrganisation =
                              kenyaOrganisations.find(
                                (organisation) =>
                                  organisation.name == selectedName,
                              );
                            setValue(
                              selectedOrganisation
                                ? selectedOrganisation.name
                                : null,
                            );

                            setOpen(false);
                          }}
                        >
                          <Check
                            className={clsx(
                              value == organisation.name
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {organisation.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {
              //   value==="" &&
              <Input
                placeholder="Enter Organisation Name"
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
                onChange={(e) => setValue(e.target.value)}
              />
            }
            {value && (
              <Button
                onClick={handleSetOrganisation}
                className="bg-green-700 mt-4 hover:bg-green-600 text-slate-100"
              >
                Confirm selection
              </Button>
            )}
          </div>
          <hr className="border-2 border-y-bts-BrownOne mt-12 " />
          {loggedUser?.currentOrganization != "" && (
            <div className=" rounded-lg px-4 text-start bg-amber-100 max-w-sm border- border-dotted">
              <p className="text-xs py-2 space-y-2">
                <span className="block text-[0.6rem]">
                  {" "}
                  Selected Organisation :
                </span>
                <span className="block font-semibold text-base pl">
                  {loggedUser?.currentOrganization}
                </span>{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
