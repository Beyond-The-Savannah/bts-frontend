'use client '

import { Dispatch, SetStateAction, useState } from "react";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SingleRemoteJob } from "@/types/remoteJobsListing";

interface ResumeAnaylseProp{
    loggedUser:SubscribedUserProp,
    singleJob:SingleRemoteJob[],
    generation:string
    setGeneration:Dispatch<SetStateAction<string>>
}
export default function ResumeAnalyseBtn({loggedUser,singleJob,generation, setGeneration}:ResumeAnaylseProp) {

    const [isAnalyzing, setIsAnalyzing] = useState(false);
  return (
    <>
      <Button
        onClick={async () => {
          setIsAnalyzing(true);

          try {
            const response = await fetch("/api/analyse-job-and-recommend", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                question: {
                  resume: loggedUser.imageUrl,
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

                buffer += decoder.decode(value, {
                  stream: true,
                });

                // Parse the AI SDK stream format
                const lines = buffer.split("\n");
                buffer = lines.pop() || ""; // Keep incomplete line in buffer

                for (const line of lines) {
                  if (line.startsWith('0:"')) {
                    // Extract text from format: 0:"text"
                    const match = line.match(/0:"(.*)"/);
                    if (match && match[1]) {
                      const text = match[1]
                        .replace(/\\n/g, "\n")
                        .replace(/\\"/g, '"')
                        .replace(/\\\\/g, "\\");

                      setGeneration(
                        (currentGeneration) => currentGeneration + text
                      );
                    }
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
        className="bg-bts-GreenOne hover:scale-105 transition duration-500 rounded  md:w-[19rem] flex"
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
  );
}
