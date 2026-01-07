import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetEmpolyerJobs } from "@/db/queries/employerQuries";
import { CalendarOff, CalendarPlus } from "lucide-react";
import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";

// import Link from "next/link";

export default async function Jobs() {
  const newJobs = await GetEmpolyerJobs();
  return (
    <>
      {newJobs.map((job) => (
        <div
          key={job.id}
          className="bg-bts-BrownOne rounded-md px-3 py-6 flex justify-between items-center border my-2 "
        >
          <div className="flex flex-col">
            <p className="c">{job.role}</p>
            <p className="text-xs">{job.department}</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Job Details</Button>
            </DialogTrigger>
            <DialogContent className="w-full md:max-w-[1200px] max-h-[70dvh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-center">{job.role}</DialogTitle>
                <DialogDescription className="text-center">
                  @ {job.companyName}
                </DialogDescription>
              </DialogHeader>
              <div className="my-10">
                <div className="flex items-center justify-between">
                  <div className=" px-3 py-1 flex items-center gap-2 ">
                    {/* Created on {job.createdAt.toLocaleDateString()} */}
                    <CalendarPlus size={24} className="text-green-400"/> 
                    <p className="flex-col">
                      <span className="text-xs block">Created on</span>
                      {new Date(job.createdAt).toDateString()}
                    </p>
                  </div>
                  <div className=" px-3 py-1 flex items-center gap-2 ">
                    {/* Created on {job.createdAt.toLocaleDateString()} */}
                    <CalendarOff size={24} className="text-red-400"/> 
                    <p className="flex-col">
                      <span className="text-xs block">Deadline on</span>
                      {new Date(job.deadLine).toDateString()}
                    </p>
                  </div>
                  {/* <p className="border rounded-xl px-3 py-1">
                    Deadline on {job.createdAt.toLocaleDateString()}
                  </p> */}
                </div>
                <div className="my-10 flex items-center justify-between">
                  {/* <p className="c">Department Hiring :{job.department}</p> */}
                   <p className="flex-col border rounded-lg px-3 py-1 w-[30%]">
                      <span className="text-xs block">Department:</span>
                      {job.department}
                    </p>
                  {/* <p className="c">Job Type :{job.jobType}</p> */}
                   <p className="flex-col border rounded-lg px-3 py-1 w-[30%]">
                      <span className="text-xs block">Job type:</span>
                      {job.jobType}
                    </p>
                  {/* <p className="c">Work Mode :{job.workMode}</p> */}
                   <p className="flex-col border rounded-lg px-3 py-1 w-[30%]">
                      <span className="text-xs block">Work mode:</span>
                      {job.workMode}
                    </p>
                  {/* <p className="text-xs">Job Posted by :{job.author}</p> */}
                   {/* <p className="flex-col">
                      <span className="text-xs block">Posted by:</span>
                      {job.author}
                    </p> */}
                </div>
                <div className=" max-w-5xl mx-auto  px-2 py-3 prose prose-sm">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {job.jobDetails}
                  </ReactMarkdown>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </>
  );
}
