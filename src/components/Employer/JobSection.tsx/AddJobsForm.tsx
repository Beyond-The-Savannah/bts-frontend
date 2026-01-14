"use client";

import { AddNewJobForm } from "@/app/actions/EmployerForms";
import RichEditorLoader from "@/components/Loaders/RichEditorLoader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { formats2, modules2 } from "@/lib/reactQuilSettings";

import { Departments, JobTypes, workModes } from "@/staticData/Employer/entries";
import { useOrganization, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import z from "zod";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <RichEditorLoader />,
});

export default function AddJobs() {

  const {user}=useUser()
  const {organization}=useOrganization()
  // let currentUserEmail
  // if (user !=null && user !=undefined){currentUserEmail=user.emailAddresses[0].emailAddress}
  // const currentUserEmail=user?.emailAddresses[0].emailAddress

  const [deadLineDate, setDeadLineDate] = useState<Date>();
  const [jobDetailsValue, setJobDetailsValue] = useState("");
  const [jobTypeValue, setTypeValue] = useState("");
  const [workModeValue, setWorkModeValue] = useState("");
  const [departmentValue, setDepartmentValue] = useState("");

  const jobsFormSchema = z.object({
    
    role:z.string(),
    companyName:z.string(),
    companyOrganizationId:z.string(),
    companyLogo:z.string(),
    workMode:z.string(),
    department:z.string(),
    jobDetails:z.string(),
    jobType:z.string(),
    author:z.string(),
    deadLine:z.string(),
    applicationLink:z.string(),
  });
    
    
  type jobsFormFields = z.infer<typeof jobsFormSchema>;

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<jobsFormFields>({
    resolver: zodResolver(jobsFormSchema),
  });

  async function formSubmit(data: jobsFormFields) {
    // console.log('Add Job Form Data', data)
    try {
      await AddNewJobForm(data);
      reset();
      toast.success("New Job Add");
    } catch (error) {
      toast.error(`Cannot add new job:${error}`);
      console.log("Form errors:", errors);
    }
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        {/* <Tabs defaultValue="addJob1">
          <TabsList className="w-full">
            <TabsTrigger value="addJob1">Add Job Openning</TabsTrigger>
          </TabsList>
          <TabsContent value="addJob1"> */}
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="">
                <input type="text" {...register("author")} defaultValue={user?.emailAddresses[0].emailAddress} name="author" hidden/>
                <input type="text" {...register("applicationLink")} defaultValue={""} name="applicationLink"  hidden/>
                <input type="text" {...register("companyName")} defaultValue={organization?.name} name="companyName"  hidden/>
                <input type="text" {...register("companyOrganizationId")} defaultValue={organization?.id} name="companyOrganizationId"  hidden/>
                <input type="text" {...register("companyLogo")} defaultValue={organization?.imageUrl} name="companyLogo"  hidden/>
              </div>
              <div className="flex items-center gap-8 my-10">
                {/* <div className="flex-1">
                  <label htmlFor="companyName">Company Name</label>
                  <Input
                    {...register("companyName", {
                      required: "Company Name is required",
                    })}
                    type="text"
                    name="companyName"
                    defaultValue={organization?.name}
                    required
                  />
                </div> */}
             
                <div className="flex-1">
                  <Label htmlFor="role">Job Role</Label>
                  <Input
                    {...register("role", { required: "Role is required" })}
                    type="text"
                    id="role"
                    name="role"
                    required
                  />
                </div>
                <div className="flex-1">
                  {/* <Label htmlFor="location">Location</Label> */}
                  <Label htmlFor="work_mode">Work Mode</Label>
                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="flex justify-between mx-2 w-full md:w-[300px]"
                      >
                        {workModeValue
                          ? workModes.find(
                              (workMode) => workMode.value == workModeValue
                            )?.label
                          : "Select Work Mode"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full md:w-[300px]">
                      <Command>
                        <CommandInput placeholder="Search Work Mode" />
                        <CommandList>
                          <CommandEmpty>Work Mode Not Found</CommandEmpty>
                          <CommandGroup>
                            {workModes.map((workMode) => (
                              <CommandItem
                                key={workMode.value}
                                value={workMode.value}
                                onSelect={(currentValue) => {
                                  setWorkModeValue(currentValue == workModeValue? "": currentValue);
                                  // if(currentValue){setValue("workMode", currentValue)}
                                  setValue("workMode",currentValue)
                                }}
                              >
                                {workMode.label}
                                <Check
                                  className={clsx(
                                    "ml-auto",
                                    workModeValue == workMode.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
            
              </div>
              <div className="flex items-center gap-8 my-10">
                    <div className="flex-1">
                  {/* <Label htmlFor="location">Location</Label> */}
                  <Label htmlFor="work_mode">Job Type</Label>
                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="flex justify-between mx-2 w-full md:w-[300px]"
                      >
                        {jobTypeValue
                          ? JobTypes.find(
                              (jobType) => jobType.value == jobTypeValue
                            )?.label
                          : "Select Work Mode"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full md:w-[300px]">
                      <Command>
                        <CommandInput placeholder="Search Work Mode" />
                        <CommandList>
                          <CommandEmpty>Work Mode Not Found</CommandEmpty>
                          <CommandGroup>
                            {JobTypes.map((jobType) => (
                              <CommandItem
                                key={jobType.value}
                                value={jobType.value}
                                onSelect={(currentValue) => {
                                  setTypeValue(currentValue == jobTypeValue? "": currentValue);
                                  // if(currentValue){setValue("jobType", currentValue)}
                                  setValue("jobType",currentValue)
                                }}
                              >
                                {jobType.label}
                                <Check
                                  className={clsx(
                                    "ml-auto",
                                    jobTypeValue == jobType.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="department">Department</label>
              
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="flex justify-between w-full md:w-[500px]">
                        {departmentValue? Departments.find((depart)=>depart.value==departmentValue)?.label:"Select Department"}
                        <ChevronsUpDown className="opacity-50"/>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full md:w-[500px]">
                        <Command>
                          <CommandInput placeholder="Search Department" className=""/>
                          <CommandList>
                            <CommandEmpty>Department Not Found</CommandEmpty>
                            <CommandGroup>
                              {Departments.map((depart)=>(
                                <CommandItem 
                                  key={depart.value}
                                  value={depart.value}
                                  onSelect={(currentValue)=>{
                                    setDepartmentValue(currentValue==departmentValue ?"":currentValue)
                                    // if(currentValue){setValue("department",currentValue)}
                                    setValue("department",currentValue)
                                  }}
                                >
                                  {depart.label}
                                  <Check className={clsx("ml-auto",
                                    departmentValue==depart.value ?"opacity-100":"opacity-0")}/>
                                </CommandItem>
                              ))}
                            </CommandGroup>

                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="deadlineDate">Deadline</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!deadLineDate}
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal flex-1"
                      >
                        <CalendarIcon />
                        {deadLineDate ? (
                          format(deadLineDate, "PPP")
                        ) : (
                          <span>Pick Deadline Date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadLineDate}
                        required
                        onSelect={(value) => {
                          setDeadLineDate(value);
                          if (value) {
                            setValue("deadLine", value.toString());
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="border-none rounded-lg p-4">
                <p className="ml-10">Job Details Section</p>
                <ReactQuill
                  theme="snow"
                  className="w-[55dvw]  mx-auto rounded-lg border-2"
                  defaultValue={jobDetailsValue}
                  // onChange={setJobDetailsValue}
                  onChange={(value) => {
                    setJobDetailsValue(value);
                    setValue("jobDetails", value);
                  }}
                  modules={modules2}
                  formats={formats2}
                />
              </div>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-green-300 hover:bg-green-500"
              >
                {isSubmitting ? "Adding new job..." : "Add new job"}
              </Button>
            </form>
          {/* </TabsContent>
        </Tabs> */}
      </div>
    </>
  );
}
