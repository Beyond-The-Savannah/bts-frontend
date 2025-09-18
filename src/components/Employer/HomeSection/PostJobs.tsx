import { Button } from "@/components/ui/button";
import { jobEntries } from "../../../staticData/JobsPage/entries";

export default function PostJobs() {
  return (
    <div className="container mt-20 mx-auto">
      {jobEntries.map((job, index) => (
        <div
          key={index}
          className="flex justify-between items-center border rounded-md px-4 py-2 my-2"
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
          <Button variant="outline"> View Applicants</Button>
        </div>
      ))}
    </div>
  );
}
