"use client";
import { useQuery } from "@tanstack/react-query";

export default function JobsPage() {
  async function fetchRemoteJobsList() {
    const result =
      fetch(`https://efmsapi.azurewebsites.net/api/Jobs/getAllJobsByCompany?name=&jobCategoryId=0
`).then((res) => res.json());
    return result;
  }
  const remoteJobs = useQuery({
    queryKey: ["allJobs"],
    queryFn: fetchRemoteJobsList,
  });
  console.log("REMOTE LISTing", remoteJobs?.data);
  return (
    <>
      <section className="min-h-screen">
        {remoteJobs.data?.map((job,index)=>(
            <p key={index} className="c">{job.jobsId}:{job.jobName}</p>
        ))}
      </section>
    </>
  );
}
