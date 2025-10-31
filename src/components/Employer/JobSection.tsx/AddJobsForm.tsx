"use client";

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
import { formats2, modules2 } from "@/lib/reactQuilSettings";
import {
  useGetJobCategoryDropDownList,
  useGetJobSubCategoryDropDownList,
} from "@/remoteData/getData";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import {  useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";
import z from "zod";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <RichEditorLoader />,
});

export default function AddJobs() {
  const [] = useState("");
  // const [createdJobDate, setCreatedJobDate] = useState<Date | undefined>(new Date())
  const [deadLineDate, setDeadLineDate] = useState<Date>();
  const [jobDetailsValue, setJobDetailsValue] = useState("");
  const { data: jobCategories } = useGetJobCategoryDropDownList();
  const { data: jobSubCategories } = useGetJobSubCategoryDropDownList();

  const jobsFormSchema = z.object({
    companyName: z.string(),
    workLocation: z.string(),
    role: z.string(),
    location: z.string(),
    department: z.string(),
    deadLineDate: z.date(),
    jobDetails: z.string(),
  });
  type jobsFormFields = z.infer<typeof jobsFormSchema>;

  const { handleSubmit, register,formState:{isSubmitting} } = useForm<jobsFormFields>({
    resolver: zodResolver(jobsFormSchema),
  });
  //   const {formState}=form

  // const{fields,append,remove}=useFieldArray({name:"jobsDetailSections", control:form.control})
  async function formSubmit(data:jobsFormFields) {
    await new Promise((resolve)=>setTimeout(resolve,200))
    alert(data)
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
                    {...register("companyName")}
                    type="text"
                    name="companyName"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    {...register("role")}
                    type="text"
                    id="role"
                    name="role"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories?.map((location) => (
                        <SelectItem
                        {...register('workLocation')}
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobSubCategories?.map((departmentName) => (
                        <SelectItem
                        {...register('department')}
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
                      {...register('deadLineDate')}
                        mode="single"
                        selected={deadLineDate}
                        onSelect={setDeadLineDate}
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
                  onChange={setJobDetailsValue}
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
