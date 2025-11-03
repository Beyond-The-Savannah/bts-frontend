import { Button } from "@/components/ui/button";
import { jobEntries } from "../../../staticData/JobsPage/entries";
import { Link } from "next-view-transitions";
import { newJobPositiings } from "@/staticData/Employer/entries";

export default function PostJobs() {
  return (
    <div className="container mt-20 mx-auto">
      {newJobPositiings.map((job, index) => (
        <div
          key={index}
          className="flex justify-between items-center border rounded-md px-4 py-2 my-2 bg-slate-100"
        >
          <div className="flex flex-col">
            <p className="c">{job.role}</p>
            <p className="text-xs">{job.companyName}</p>
            <p className="flex justify-center items-center gap-4 text-xs">
              {" "}
              <span className="c">Created on: {}</span>{" "}
              <span className="c">Expires on: {job.deadLineDate}</span>
            </p>
          </div>
          <Button variant="outline" asChild> 
            <Link href={`Employer/jobs/${job.role}`}>
              View Applicants
            </Link>
          </Button>
        </div>
      ))}
      {jobEntries.map((job, index) => (
        <div
          key={index}
          className="flex justify-between items-center border rounded-md px-4 py-2 my-2 bg-slate-100"
        >
          <div className="flex flex-col">
            <p className="c">{job.jobName}</p>
            <p className="text-xs">{job.jobLocation}</p>
            <p className="flex justify-center items-center gap-4 text-xs">
              {" "}
              <span className="c">Created on: {job.createdDate}</span>{" "}
              <span className="c">Expires on: {job.deadlineDate}</span>
            </p>
          </div>
          <Button variant="outline" asChild> 
            <Link href={`Employer/jobs/${job.jobName}`}>
              View Applicants
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
