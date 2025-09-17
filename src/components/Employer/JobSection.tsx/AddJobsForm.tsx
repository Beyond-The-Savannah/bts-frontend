"use client";

import RichEditorLoader from "@/components/Loaders/RichEditorLoader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formats2, modules2 } from "@/lib/reactQuilSettings";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import "react-quill-new/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <RichEditorLoader />,
});

export default function AddJobs() {
  
    const [] = useState("")
    const [createdJobDate, setCreatedJobDate] = useState<Date | undefined>(new Date())
    const [deadLineDate, setDeadLineDate] = useState<Date | undefined>(new Date())

    const form=useForm({
        defaultValues:{
            role:'',
            location:'',
            department:'',
            company:'',
            createdDate:'',
            deadLine:'',
            jobsDetailSections:[
                {
                    jobSectionTitle:'',
                    jobSectionDetails:''
                }
            ],
        }
    })
//   const {formState}=form
  
    const{fields,append,remove}=useFieldArray({name:"jobsDetailSections", control:form.control})

return (
    <>
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="addJob1">
          <TabsList className="w-full">
            <TabsTrigger value="addJob1">Add Job Openning</TabsTrigger>
          </TabsList>
          <TabsContent value="addJob1">
            <div className="flex items-center gap-8 my-10">
              <div className="flex-1">
                <Label htmlFor="role">Role</Label>
                <Input type="text" id="role" name="role" />
              </div>
              <div className="flex-1">
                <Label htmlFor="location">Location</Label>
                <Input type="text" id="location" name="location" />
              </div>
            </div>
            <div className="flex items-center gap-8 my-10">
              <div className="flex-1">
                <Label htmlFor="department">Department</Label>
                <Input type="text" id="department" name="department" />
              </div>
              <div className="flex-1">
                <Label htmlFor="company">Company</Label>
                <Input type="text" id="company" name="company" />
              </div>
            </div>
            <div className="flex items-center gap-8 my-10">
              <div className="flex-1">
                <Label htmlFor="createdDate">CreatedDate</Label>
                {/* <Input type="text" id="createdDate" name="createdDate" /> */}
                <Calendar mode='single' selected={createdJobDate} onSelect={setCreatedJobDate} className="rounded-lg border w-full grid place-content-center"/>
              </div>
              <div className="flex-1">
                <Label htmlFor="deadline">Deadline</Label>
                {/* <Input type="text" id="deadline" name="deadline" /> */}
                <Calendar mode='single' selected={deadLineDate} onSelect={setDeadLineDate} className="rounded-lg border w-full grid place-content-center"/>
              </div>
            </div>
            <div className="border rounded-lg p-4">
                    {fields.map((field,index)=>(
                    <div key={field.id} className="w-full mx-auto flex flex-col items-start gap-8 my-10">
                        <div className="flex-1">
                            <Label htmlFor="JobSectionTitle">Job Section Title</Label>
                            <Input type="text" id="JobSectionTitle" className="w-[55dvw] mx-auto" name="JobSectionTitle" />
                        </div>
                        <div className="c">
                            <Label htmlFor="JobSectionDetails">Job Section Details</Label>
                            <ReactQuill
                                theme="snow"
                                className="w-[55dvw] mx-auto rounded-lg border-2"
                                defaultValue={field.jobSectionTitle}
                                onChange={(value)=>form.setValue(`jobsDetailSections.${index}.jobSectionDetails`,value)}
                                modules={modules2}
                                formats={formats2}
                            />
                        </div>
                        <div className="c">
                            {index>0 && (<Button type='button' size='sm' variant='outline' onClick={()=>remove(index)}>Remove Section</Button>)}
                        </div>
                    </div>
                    ))}
                <div className="c"><Button variant='secondary' type="button" onClick={()=>append({jobSectionTitle:'',jobSectionDetails:''})}>Add New Section</Button></div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
