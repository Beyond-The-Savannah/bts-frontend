import { Button } from "@/components/ui/button";

import { Link } from "next-view-transitions";

import { GetEmpolyerJobs } from "@/db/queries/employerQuries";
import { TimerIcon, TimerOff } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function PostJobs() {
  const { orgId } = await auth();

  const newJobs = await GetEmpolyerJobs(orgId!);
  return (
    <div className="container mt-20 mx-auto">
      {newJobs.length === 0 && (
        <p className="text-center c">No job postings found.</p>
      )}
      {newJobs.map((job) => (
        <div
          key={job.id}
          className="bg-bts-BrownOne rounded-md px-3 py-6 flex justify-between items-center border my-2 "
        >
          <div className="flex flex-col">
            <p className="c">{job.role}</p>
            <p className="text-xs">{job.department}</p>
            <p className="flex justify-center items-center mt-4 gap-4 text-xs">
              <span className="flex items-center">
                <TimerIcon size={20} className="text-green-400 inline " />:{" "}
                {new Date(job.createdAt).toDateString()}
              </span>{" "}
              <span className="flex items-center">
                <TimerOff size={20} className=" text-red-400 inline" />:{" "}
                {new Date(job.deadLine).toDateString()}
              </span>
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="hover:scale-105 duration-300 transition ease-in"
          >
            {/* <Link href={`Employer/jobs/${job.role}`} > */}
            <Link href={`/Employer/jobs/${job.role}?jobDepartment=${job.department}`}>View Applicants</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
