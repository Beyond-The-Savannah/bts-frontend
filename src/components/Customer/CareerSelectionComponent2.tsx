"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown,  } from "lucide-react";
import { useGetJobSubCategoryDropDownList } from "@/remoteData/getData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import clsx from "clsx";

import { UpdateUsersJobEmailNotificationCareer } from "@/app/actions/viewJobSubscriptionAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function CareerSelectionComponent({userId,career}: {userId: string;career:string| null}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const[currentCareer,setCurrentCareer]=useState(career)
  
  const router=useRouter()


  const { data: jobDepartments } = useGetJobSubCategoryDropDownList();

  
const handleSetNotification= async()=>{

    if (value!=null){
        // toast.promise(UpdateUsersJobEmailNotificationCareer({userId,career:value.toString()}),{
        //     loading:"Updating email notification... ",
        //     success:()=>{
              
        //       return "Update was successful"},
        //       error:"Update failed"
        //     })
        toast.message("Updating email notification...")
        const result=await UpdateUsersJobEmailNotificationCareer({userId,career:value.toString()})
        if(result.success===true){
          toast.success("Update was successful")
          setCurrentCareer(value.toString())
          setValue(null)
          router.refresh()
          router.push("/Customer")
        }else{
          toast.error("Update failed")
        }

        
      }
      
}

  
  const selectedCareer = jobDepartments?.find((department) => department.value == Number(currentCareer));
  return (
    <>
 
    <section className="py-10">
      <div className=" space-y-6  px-4 py-8 min-h-[20.3rem] bg-bts-BrownOne/50 rounded-lg ">
        <div className="space-y-4">
          <p className="font-semibold text-xl">Career Selection</p>
        </div>
          <p className="text-xs">
            Please select a career category that best matches your career to get the right email notification
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
                        (department) => department.value === value
                      )?.label
                    : "Type & Select A Career"}
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
                            const selectedDepartment = jobDepartments.find((department) => department.label == selectedLabel);
                            setValue(selectedDepartment ? selectedDepartment.value: null);
                            
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={clsx(
                              value == department.value
                                ? "opacity-100"
                                : "opacity-0"
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
            {value && 
            <Button onClick={handleSetNotification} className="bg-green-700 mt-4 hover:bg-green-600 text-slate-100">Confirm selection</Button>
            }
          </div>
          <hr className="border-2 border-y-bts-BrownOne mt-12 " />
          {selectedCareer?.value && (
            <div className=" rounded-lg px-4 text-start bg-amber-100 max-w-80 border- border-dotted">
                <p className="text-xs">
            Selected Career : 
            <span className="font-semibold text-base pl-2">
              {selectedCareer?.label}
            </span>{" "}
          </p>
            </div>
          )}
        </div>
         </div>
    </section>
      {/* )} */}
    </>
  );
}
