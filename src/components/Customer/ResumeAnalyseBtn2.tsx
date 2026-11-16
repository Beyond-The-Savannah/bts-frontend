'use client'

import { Dispatch, SetStateAction, useState } from "react";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SingleRemoteJob } from "@/types/remoteJobsListing";
import { useObject } from "@ai-sdk/react";
import { resumeSchema } from "@/schemas/resumeSchema";

interface ResumeAnaylseProp{
    loggedUser?:SubscribedUserProp,
    userResumeUrl:string
    singleJob:SingleRemoteJob[],
    generation:string
    setGeneration:Dispatch<SetStateAction<string>>
}
export default function ResumeAnalyseBtn2({loggedUser,userResumeUrl,singleJob,generation, setGeneration}:ResumeAnaylseProp) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const {submit,object}=useObject({
        api:"/api/analyse-job-and-recommend-2",
        schema:resumeSchema
    })
  return (
    
    <>
    <Button
    onClick={async()=>{
        submit({
            question: {
                      resume: loggedUser? loggedUser.imageUrl:userResumeUrl,
                      role: singleJob.map((listing) => listing.sectionDescription),
                    },
        })
    }}>
         {isAnalyzing
              ? "Analysing your resume please wait..."
              : "Analyse my resume for this role"}
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={800}
              width={800}
              alt="savannah avatar"
              classname="size-12 -mt-10"
            />
    </Button>
    <br />
    <br />
    <br />
    <div className="px-4 py-8 border rounded-md my-4">
        <p className="text-center capitalize">{object?.resume?.mainHeaderSection?.firstName} {object?.resume?.mainHeaderSection?.lastName}</p>
        <p className="text-center">{object?.resume?.mainHeaderSection?.profession}</p>
        <hr />
        <p className="flex justify-center gap-1">
            <span className="c">{object?.resume?.subHeaderSection?.phoneNumber}</span>|
            <span className="c">{object?.resume?.subHeaderSection?.emailLink}</span>|
            <span className="c">{object?.resume?.subHeaderSection?.linkedInLink}</span>|
            <span className="c">{object?.resume?.subHeaderSection?.githubLink}</span>|
            <span className="c">{object?.resume?.subHeaderSection?.portfolioLink}</span>
        </p>
        <br />
        <br />
        <p className="text font-bold mt-4">Professional Summary:</p>
        <p className="c">{object?.resume?.professionalSummary}</p>
        <p className="text font-bold mt-4">Techinical Skills:</p>
        <ul className="list-disc">{object?.resume?.technicallSkills?.map((skill,index)=>(
            <li key={index}>{skill}</li>
        ))}</ul>
        <p className="text font-bold mt-4">Profession Experience:</p>
        {object?.resume?.professionalExperience?.map((exp,index)=>(
            <div key={index} className="c">
                <p className="font-semibold pb-2 pt-4"><span className="">{exp?.role}</span> | <span className="c">{exp?.company}</span> ( <span className="c">{exp?.duration}</span>)</p>
                <ul className="list-disc">{exp?.responsibilies?.map((work,index)=>(
                    <li className="c">{work}</li>
                ))}</ul>
            </div>
        ))}
        <p className="c"></p>
        <p className="text font-bold mt-4">Education:</p>
         <ul className="list-disc">{object?.resume?.education?.map((education,index)=>(
            <li key={index}>{education}</li>
        ))}</ul>
        <p className="text font-bold mt-4">Certifications:</p>
         <ul className="list-disc">{object?.resume?.certifications?.map((certificate,index)=>(
            <li key={index}>{certificate}</li>
        ))}</ul>



    </div>
          <Button
            onClick={async () => {
              setIsAnalyzing(true);
    
              try {
                const response = await fetch("/api/analyse-job-and-recommend-2", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    question: {
                      resume: loggedUser? loggedUser.imageUrl:userResumeUrl,
                      role: singleJob.map((listing) => listing.sectionDescription),
                    },
                  }),
                });
    
                if (!response.ok) {
                  throw new Error("Failed to analyze resume");
                }
                
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
    
                if (reader) {
                  let buffer = "";
    
                  while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
    
                    buffer += decoder.decode(value, { stream: true });
    
                    const lines = buffer.split("\n");
                    buffer = lines.pop() || "";
    
                    for (const line of lines) {
                      if (!line.startsWith("data: ")) continue;
    
                      const payload = line.slice(6).trim();
                      if (payload === "[DONE]") continue;
    
                      try {
                        const chunk = JSON.parse(payload);
                        if (chunk.type === "text-delta" && chunk.delta) {
                          setGeneration((current) => current + chunk.delta);
                        }
                      } catch {
                        // ignore partial/non-JSON lines
                      }
                    }
                  }
                }
    
               
              } catch (error) {
                console.log("Error analysing resume Button Call->", error);
              } finally {
                setIsAnalyzing(false);
              }
            }}
            disabled={isAnalyzing || generation != ""}
            className="bg-bts-GreenOne hover:scale-105 transition duration-500 rounded  md:w-76 flex"
          >
            {isAnalyzing
              ? "Analysing your resume..."
              : "Analyse my resume for this role"}
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={800}
              width={800}
              alt="savannah avatar"
              classname="size-12 -mt-10"
            />
          </Button>

        </>
  )
}
