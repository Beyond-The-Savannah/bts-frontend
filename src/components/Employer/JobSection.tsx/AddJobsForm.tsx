"use client";

import { AddNewJobForm } from "@/app/actions/EmployerForms";
import RichEditorLoader from "@/components/Loaders/RichEditorLoader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
// import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { db } from "@/db/db";
// import { jobsTable } from "@/db/schema";
import { formats2, modules2 } from "@/lib/reactQuilSettings";
import {
  useGetJobCategoryDropDownList,
  useGetJobSubCategoryDropDownList,
} from "@/remoteData/getData";
// import { newJobPositiings } from "@/staticData/Employer/entries";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import {  useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import z from "zod";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <RichEditorLoader />,
});

export default function AddJobs() {
  const [deadLineDate, setDeadLineDate] = useState<Date>();
  const [jobDetailsValue, setJobDetailsValue] = useState("");
  const { data: jobCategories } = useGetJobCategoryDropDownList();
  const { data: jobSubCategories } = useGetJobSubCategoryDropDownList();

  const jobsFormSchema = z.object({
    companyName: z.string(),
    role: z.string(),
    workMode: z.string(),
    department: z.string(),
    deadLineDate: z.string(),
    jobDetails: z.string(),
  });
  type jobsFormFields = z.infer<typeof jobsFormSchema>;

  const { handleSubmit,setValue, register, reset, formState:{isSubmitting} } = useForm<jobsFormFields>({
    resolver: zodResolver(jobsFormSchema),
  });
  
  async function formSubmit(data:jobsFormFields) {
    console.log('Add Job Form Data', data)
    const jobId= await AddNewJobForm(data)
    if(jobId!=undefined){
      reset()
      toast.success('New Job Added')
    }
    // try {
      // newJobPositiings.push(...newJobPositiings, data)
      // await db.insert(jobsTable).values({
      //   role:data.role,
      //   workMode:data.workMode,
      //   jobType:'Full Time',
      //   department:data.department,
      //   author:'current-loged-user',
      //   deadLine:data.deadLineDate,
      //   jobDetails:data.jobDetails,
      //   applicationLink:''
      // }).returning({jobId:jobsTable.id})
    //   reset()
    //   toast.success('New Job Added')
    // } catch (error) {
    //   console.error('Error adding new Job Details', error)
    // }
    // if(errors){console.error('Form errors', errors)}
  }

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="addJob1">
          <TabsList className="w-full">
            <TabsTrigger value="addJob1">Add Job Openning</TabsTrigger>
          </TabsList>
          <TabsContent value="addJob1">
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="flex items-center gap-8 my-10">
                <div className="flex-1">
                  <label htmlFor="companyName">Company Name</label>
                  <Input
                    {...register("companyName", {required:'Company Name is required'})}
                    type="text"
                    name="companyName"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    {...register("role", {required:'Role is required'})}
                    type="text"
                    id="role"
                    name="role"
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="location">Location</Label>
                  <Select onValueChange={(value)=>{ setValue('workMode',value)}} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories?.map((location) => (
                        <SelectItem
                          key={location.label}
                          value={String(location.value)}
                        >
                          {location.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-8 my-10">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="department">Department</label>
                  <Select onValueChange={(value)=>{setValue('department',value)}} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobSubCategories?.map((departmentName) => (
                        <SelectItem
                          key={departmentName.label}
                          value={String(departmentName.value)}
                          
                        >
                          {departmentName.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                        onSelect={(value)=>{
                          setDeadLineDate(value)
                          if(value){
                            setValue('deadLineDate',value.toString())
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
                  onChange={(value)=>{
                    setJobDetailsValue(value)
                    setValue('jobDetails',value)
                  }}
                  modules={modules2}
                  formats={formats2}
                />
              </div>
              <Button disabled={isSubmitting} type='submit' className="bg-green-300 hover:bg-green-500">
                {isSubmitting? 'Adding new job...':'Add new job'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
