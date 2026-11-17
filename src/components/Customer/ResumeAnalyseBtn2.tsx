'use client'

import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";
import { SubscribedUserProp } from "@/types/subscribedUser";
import { SingleRemoteJob } from "@/types/remoteJobsListing";
import { useObject } from "@ai-sdk/react";
import { resumeSchema2 } from "@/schemas/resumeSchema2";
import { Download } from "lucide-react";

interface ResumeAnalyseProp {
  loggedUser?: SubscribedUserProp;
  userResumeUrl: string;
  singleJob: SingleRemoteJob[];
}

export default function ResumeAnalyseBtn2({ loggedUser, userResumeUrl, singleJob }: ResumeAnalyseProp) {
  // requirement text -> details the user typed (only filled in if they truly have it)
  const [additions, setAdditions] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);


  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });



  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/analyse-job-and-recommend-2",
    schema: resumeSchema2,
  });

  const resumeUrl = loggedUser ? loggedUser.imageUrl : userResumeUrl;
  const jobDescription = singleJob.map((l) => l.sectionDescription).join("\n\n");

  const runAnalysis = (confirmedAdditions: string[] = []) =>
    submit({ question: { resume: resumeUrl, role: jobDescription, confirmedAdditions } });

  const rerunWithAdditions = () => {
    const confirmed = Object.entries(additions)
      .filter(([, detail]) => detail.trim().length > 0)
      .map(([requirement, detail]) => `${requirement}: ${detail.trim()}`);
    runAnalysis(confirmed);
  };

  const r = object?.regeneratedResume;

  const copyResume = async () => {
    if (!r) return;
    const text = [
      r.fullName,
      r.professionalTitle,
      [r.contact?.email, r.contact?.phone, ...(r.contact?.links ?? [])]
        .filter(Boolean)
        .join(" | "),
      "\nPROFESSIONAL SUMMARY\n" + (r.professionalSummary ?? ""),
      "\nTECHNICAL SKILLS\n" +
        (r.technicalSkills ?? [])
          .map((g) => `${g?.category ? g.category + ": " : ""}${(g?.skills ?? []).join(", ")}`)
          .join("\n"),
      "\nPROFESSIONAL EXPERIENCE\n" +
        (r.experience ?? [])
          .map((e) => `${e?.title} - ${e?.employer} (${e?.dates})\n${(e?.bullets ?? []).map((b) => "- " + b).join("\n")}`)
          .join("\n\n"),
      "\nEDUCATION\n" +
        (r.education ?? []).map((e) => `${e?.degree} - ${e?.institution} (${e?.dates})`).join("\n"),
      r.certifications?.length ? "\nCERTIFICATIONS\n" + r.certifications.map((c) => "- " + c).join("\n") : "",
    ]
      .filter(Boolean)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const breakdown = object?.scoreBreakdown;
  const breakdownRows: [string, number | undefined][] = [
    ["Required skills (35%)", breakdown?.requiredSkills],
    ["Experience relevance (30%)", breakdown?.experienceRelevance],
    ["Keyword coverage (15%)", breakdown?.keywordCoverage],
    ["Education & certifications (10%)", breakdown?.educationAndCertifications],
    ["ATS formatting of your original CV (10%)", breakdown?.atsFormatting],
  ];

  return (
    <>
      <div className="flex gap-2 ">
        <Button
          className="bg-bts-GreenOne hover:scale-105 transition duration-500 rounded md:w-76 flex hover:cursor-pointer"
          disabled={isLoading}
          onClick={() => runAnalysis()}
        >
          {isLoading ? "Analysing your resume please wait..." : "Analyse my resume for this role"}
          <DisplayImageFromNextCloudinary
            src="kazina_upvlpf"
            height={800}
            width={800}
            alt="savannah avatar"
            classname="size-12 -mt-10"
          />
        </Button>
        {isLoading && (
          <Button variant="outline" onClick={() => stop()}>
            Stop
          </Button>
        )}
      </div>

      {error && (
        <p className="text-red-600 my-4">
          Something went wrong analysing your resume. Please try again.
        </p>
      )}
      <div className="px-2 py-8 h-[75dvh] overflow-y-auto">

      {/* ---------- SCORE ---------- */}
      {object?.overallScore !== undefined && (
        <section className="border rounded-md p-4 my-6">
          <p className="text-4xl font-bold">
            {object.overallScore}
            <span className="text-lg font-normal">/100</span>
            {object.scoreLabel && <span className="text-lg font-semibold ml-3">{object.scoreLabel}</span>}
          </p>
          <p className="mt-2">{object.scoreJustification}</p>

          <ul className="mt-4 space-y-2">
            {breakdownRows.map(([label, value]) =>
              value === undefined ? null : (
                <li key={label}>
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-bts-GreenOne rounded" style={{ width: `${value}%` }} />
                  </div>
                </li>
              )
            )}
          </ul>
        </section>
      )}

      {/* ---------- STRENGTHS ---------- */}
      {!!object?.strengths?.length && (
        <section className="my-6">
          <h3 className="font-bold">Strengths</h3>
          <ul className="list-disc pl-5">
            {object.strengths.map((s, i) => (
              <li key={i}>
                {s?.strength}
                {s?.evidence && <span className="block text-sm italic text-gray-600">{s.evidence}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- GAPS + CONFIRM ---------- */}
      {!!object?.missingRequirements?.length && (
        <section className="border rounded-md p-4 my-6">
          <h3 className="font-bold">Gaps found</h3>
          <p className="text-sm text-gray-600 mb-3">
            If you genuinely have any of these, describe it briefly and regenerate. Leave blank
            anything that isn&apos;t true, and it will not be added to your CV.
          </p>
          <ul className="space-y-4">
            {object.missingRequirements.map((m, i) => {
              if (!m?.requirement) return null;
              return (
                <li key={i}>
                  <p className="font-semibold">
                    {m.requirement}
                    {m.importance && (
                      <span className="ml-2 text-xs uppercase text-gray-500">
                        {m.importance.replace("_", " ")}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{m.howToAddIfTrue}</p>
                  <input
                    className="mt-1 w-full border rounded px-2 py-1 text-sm"
                    placeholder="I have this: where/how did you use it?"
                    value={additions[m.requirement] ?? ""}
                    onChange={(e) =>
                      setAdditions((prev) => ({ ...prev, [m.requirement!]: e.target.value }))
                    }
                  />
                </li>
              );
            })}
          </ul>
          <Button className="mt-4" disabled={isLoading} onClick={rerunWithAdditions}>
            Regenerate with my additions
          </Button>
        </section>
      )}

{!!object?.itemsToAddManually?.length && (
        <section className="my-6">
          <h3 className="font-bold">Items to add manually</h3>
          <ul className="list-disc pl-5">
            {object.itemsToAddManually.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>
      )}
      f
      {!!object?.atsFormatIssues?.length && (
        <section className="my-6">
          <h3 className="font-bold">ATS formatting issues in your original CV</h3>
          <ul className="list-disc pl-5">
            {object.atsFormatIssues.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </section>
      )}
      

      {object?.summary && (
        <section className="my-6">
          <h3 className="font-bold">Summary</h3>
          <p>{object.summary}</p>
          {object.cvRevampRecommended && (
            <a
              className="underline text-bts-GreenOne"
              href="https://beyondthesavannah.co.ke/service/ats-cv-revamp"
              target="_blank"
              rel="noreferrer"
            >
              Explore the CV Revamp service
            </a>
          )}
        </section>
      )}

      {/* ---------- REGENERATED RESUME ---------- */}
      {r && (
        <>
          <div className="flex items-center justify-between mt-8">
            <div className="hidden">
              <h3 className="font-bold">Your ATS-optimised resume</h3>
              <Button variant="outline" onClick={copyResume} disabled={isLoading}>
                {copied ? "Copied!" : "Copy as text"}
              </Button>
            </div>
            <Button onClick={reactToPrintFn} className="gap-2 hover:scale-105 transition hover:bg-lime-900 duration-500 hover:cursor-pointer">Download Your Optimized Resume <Download/></Button>
          </div>

          <div ref={contentRef} className="px-4 py-8 border rounded-md my-4">
            <p className="text-center text-xl font-bold">{r.fullName}</p>
            {/* {r.professionalBackground && <p className="text-center">{r.professionalBackground}</p>} */}
            {r.professionalTitle && <p className="text-center">{r.professionalTitle}</p>}
            <hr className="my-2" />
            <p className="flex flex-wrap justify-center gap-1 text-sm">
              {[r.contact?.email, r.contact?.phone, ...(r.contact?.links ?? [])]
                .filter(Boolean)
                .map((item, i, arr) => (
                  <span key={i}>
                    {item}
                    {i < arr.length - 1 && " |"}
                  </span>
                ))}
            </p>

            <p className="font-bold mt-6">Professional Summary</p>
            <p>{r.professionalSummary}</p>

            <p className="font-bold mt-6">Technical Skills</p>
            <ul className="list-disc pl-5">
              {r.technicalSkills?.map((group, i) => (
                <li key={i}>
                  {group?.category && <span className="font-semibold">{group.category}: </span>}
                  {group?.skills?.join(", ")}
                </li>
              ))}
            </ul>

            <p className="font-bold mt-6">Professional Experience</p>
            {r.experience?.map((exp, i) => (
              <div key={i}>
                <p className="font-semibold pb-2 pt-4">
                  {exp?.title} | {exp?.employer} ({exp?.dates})
                </p>
                <ul className="list-disc pl-5">
                  {exp?.bullets?.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="font-bold mt-6">Education</p>
            <ul className="list-disc pl-5">
              {r.education?.map((ed, i) => (
                <li key={i}>
                  {ed?.degree} | {ed?.institution} ({ed?.dates})
                </li>
              ))}
            </ul>

            {!!r.certifications?.length && (
              <>
                <p className="font-bold mt-6">Certifications</p>
                <ul className="list-disc pl-5">
                  {r.certifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )}

      
      </div>
    </>
  );
}


// 'use client'

// import { Dispatch, SetStateAction, useState } from "react";
// import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
// import { Button } from "../ui/button";
// import { SubscribedUserProp } from "@/types/subscribedUser";
// import { SingleRemoteJob } from "@/types/remoteJobsListing";
// import { useObject } from "@ai-sdk/react";
// import { resumeSchema } from "@/schemas/resumeSchema";

// interface ResumeAnaylseProp{
//     loggedUser?:SubscribedUserProp,
//     userResumeUrl:string
//     singleJob:SingleRemoteJob[],
//     generation:string
//     setGeneration:Dispatch<SetStateAction<string>>
// }
// export default function ResumeAnalyseBtn2({loggedUser,userResumeUrl,singleJob,generation, setGeneration}:ResumeAnaylseProp) {
//     const [isAnalyzing, setIsAnalyzing] = useState(false);
//     const {submit,object}=useObject({
//         api:"/api/analyse-job-and-recommend-2",
//         schema:resumeSchema
//     })
//   return (
    
//     <>
//     <Button
//     className="hover:cursor-pointer"
//     onClick={()=>{
//         submit({
//             question: {
//                       resume: loggedUser? loggedUser.imageUrl:userResumeUrl,
//                       role: singleJob.map((listing) => listing.sectionDescription),
//                     },
//         })
//     }}>
//          {isAnalyzing
//               ? "Analysing your resume please wait..."
//               : "Analyse my resume for this role"}
//             <DisplayImageFromNextCloudinary
//               src="kazina_upvlpf"
//               height={800}
//               width={800}
//               alt="savannah avatar"
//               classname="size-12 -mt-10"
//             />
//     </Button>
//     <br />
//     <br />
//     <br />
//     <div className="px-4 py-8 border rounded-md my-4">
//         <p className="text-center capitalize">{object?.resume?.mainHeaderSection?.firstName} {object?.resume?.mainHeaderSection?.lastName}</p>
//         <p className="text-center">{object?.resume?.mainHeaderSection?.profession}</p>
//         <hr />
//         <p className="flex justify-center gap-1">
//             <span className="c">{object?.resume?.subHeaderSection?.phoneNumber}</span>|
//             <span className="c">{object?.resume?.subHeaderSection?.emailLink}</span>|
//             <span className="c">{object?.resume?.subHeaderSection?.linkedInLink}</span>|
//             <span className="c">{object?.resume?.subHeaderSection?.githubLink}</span>|
//             <span className="c">{object?.resume?.subHeaderSection?.portfolioLink}</span>
//         </p>
//         <br />
//         <br />
//         <p className="text font-bold mt-4">Professional Summary:</p>
//         <p className="c">{object?.resume?.professionalSummary}</p>
//         <p className="text font-bold mt-4">Techinical Skills:</p>
//         <ul className="list-disc">{object?.resume?.technicallSkills?.map((skill,index)=>(
//             <li key={index}>{skill}</li>
//         ))}</ul>
//         <p className="text font-bold mt-4">Profession Experience:</p>
//         {object?.resume?.professionalExperience?.map((exp,index)=>(
//             <div key={index} className="c">
//                 <p className="font-semibold pb-2 pt-4"><span className="">{exp?.role}</span> | <span className="c">{exp?.company}</span> ( <span className="c">{exp?.duration}</span>)</p>
//                 <ul className="list-disc">{exp?.responsibilies?.map((work,index)=>(
//                     <li className="c">{work}</li>
//                 ))}</ul>
//             </div>
//         ))}
//         <p className="c"></p>
//         <p className="text font-bold mt-4">Education:</p>
//          <ul className="list-disc">{object?.resume?.education?.map((education,index)=>(
//             <li key={index}>{education}</li>
//         ))}</ul>
//         <p className="text font-bold mt-4">Certifications:</p>
//          <ul className="list-disc">{object?.resume?.certifications?.map((certificate,index)=>(
//             <li key={index}>{certificate}</li>
//         ))}</ul>



//     </div>
//           <Button
//             onClick={async () => {
//               setIsAnalyzing(true);
    
//               try {
//                 const response = await fetch("/api/analyse-job-and-recommend-2", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({
//                     question: {
//                       resume: loggedUser? loggedUser.imageUrl:userResumeUrl,
//                       role: singleJob.map((listing) => listing.sectionDescription),
//                     },
//                   }),
//                 });
    
//                 if (!response.ok) {
//                   throw new Error("Failed to analyze resume");
//                 }
                
//                 const reader = response.body?.getReader();
//                 const decoder = new TextDecoder();
    
//                 if (reader) {
//                   let buffer = "";
    
//                   while (true) {
//                     const { done, value } = await reader.read();
//                     if (done) break;
    
//                     buffer += decoder.decode(value, { stream: true });
    
//                     const lines = buffer.split("\n");
//                     buffer = lines.pop() || "";
    
//                     for (const line of lines) {
//                       if (!line.startsWith("data: ")) continue;
    
//                       const payload = line.slice(6).trim();
//                       if (payload === "[DONE]") continue;
    
//                       try {
//                         const chunk = JSON.parse(payload);
//                         if (chunk.type === "text-delta" && chunk.delta) {
//                           setGeneration((current) => current + chunk.delta);
//                         }
//                       } catch {
//                         // ignore partial/non-JSON lines
//                       }
//                     }
//                   }
//                 }
    
               
//               } catch (error) {
//                 console.log("Error analysing resume Button Call->", error);
//               } finally {
//                 setIsAnalyzing(false);
//               }
//             }}
//             disabled={isAnalyzing || generation != ""}
//             className="bg-bts-GreenOne hover:scale-105 transition duration-500 rounded  md:w-76 flex"
//           >
//             {isAnalyzing
//               ? "Analysing your resume..."
//               : "Analyse my resume for this role"}
//             <DisplayImageFromNextCloudinary
//               src="kazina_upvlpf"
//               height={800}
//               width={800}
//               alt="savannah avatar"
//               classname="size-12 -mt-10"
//             />
//           </Button>

//         </>
//   )
// }
