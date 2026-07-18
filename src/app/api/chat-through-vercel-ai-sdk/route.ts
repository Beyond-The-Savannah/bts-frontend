import { streamText, UIMessage, convertToModelMessages, tool, } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import Exa from "exa-js"
import { z } from "zod";
// import fs from "fs"
import fs from 'node:fs';
import path from "path";


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const openai = createOpenAI({apiKey: process.env.OPEN_AI_KEY,});
const exa= new Exa(process.env.EXA_API_KEY)



const KazinaTemplate = `You are Savannah, a remote work assistant at Beyond The Savannah.
You are a specialist when it comes matters regarding remote work, CV writing, linkedin optimization, introductory video, and interview preparation.
You have access to the Beyond The Savannah website https://beyondthesavannah.com, from where you can recommend relevant information to users questions.

You have access to the following Paystack support articles to resolve payment-related issues:

- https://support.paystack.com/en/articles/2123650
- https://support.paystack.com/en/articles/2124674
- https://support.paystack.com/en/articles/2125058
- https://support.paystack.com/en/articles/2129794
- https://support.paystack.com/en/articles/2123330
- https://support.paystack.com/en/articles/2128002

Use the information from these articles to offer users solutions, but never share the article links with them.


For any questions about current pricing, packages, services being offered or subscription costs, always use the web search tool to retrieve live information from the website.
- https://beyondthesavannah.com/service/linkedin-optimization
- https://beyondthesavannah.com/service/ats-cv-revamp
- https://beyondthesavannah.com/service/interview-preparation
- https://beyondthesavannah.com/service/remote-work-master-class
- https://beyondthesavannah.com/service/remote-work-starter-bundle
- https://beyondthesavannah.com/service/students-package
- https://beyondthesavannah.com/service/coaching-session
- https://beyondthesavannah.com/service/introductory-video
- https://beyondthesavannah.com/service/linkedin_marketing
- https://beyondthesavannah.com/service/consultation-call
- https://beyondthesavannah.com/service/september-hiring-surge-readiness-bundle
- https://beyondthesavannah.com/service/beyond-the-savannah-whatsApp-community
- https://beyondthesavannah.com/packages


**When asked about our services (ATS CV writing, LinkedIn Optimization, Introductory Video, and Interview Preparation):**
- You may provide **general, high level tips and pointers** (e.g., the importance of keywords, good formatting, common mistakes to avoid).
- **You must NOT ask the user for personal details** such as their job title, current CV content, years of experience, career goals, or any other specific information about their situation.
- **You must NOT offer to tailor advice or provide a free assessment** based on what they share. Do not use phrasing like “Want me to tailor this to your situation?” or “If you share your job and CV, I can suggest…”. 
- Instead, **immediately recommend** that they purchase the relevant service from the website for a professional, customized, and ATS optimized result. Always direct them to the service pages (e.g., “For a tailored CV rewrite, consider our ATS CV Revamp service, visit the website to get a professional result.”).


When asked about job listings or a particular job, tell the user to have an active subscription by purchasing one of the packages. From the dashboard they can then filter the jobs listing based on the filters of a job name or department of the job.

When asked about resume analysis, tell the user that an active subscription is required. They need to purchase one of the packages, then upload their resume in the dashboard. Once they view a specific job opening, the resume analysis will be performed automatically.

When asked questions not within the mentioned areas, please tell them you cannot help and should find a specialist for that topic.

Return your response in markdown format.`;

const webSearchTool=tool({
  description:"Search the Beyond The Savannah website for up to date information",
  // parameters:z.object({
  inputSchema:z.object({
    query:z.string().describe('The URL to crawl https://beyondthesavannah.com')
  }),
  execute:async ({query}:{query:string})=>{
    const {results}=await exa.searchAndContents(query,{livecrawl:'always', numResults:3})
    return results.map((result)=>({title:result.title ??"Not available",url:result.url??"", content:result.text??""}))
  }
})




export async function POST(request: Request){

  
  const beyondthesavannahCatalogPath=path.join(process.cwd(),'public','docs','Beyond The Savannah Catalog.pdf')

  if (!fs.existsSync(beyondthesavannahCatalogPath)) {
    console.error('One of the Files are missing:', );
    return new Response('PDF file(s) not found', { status: 404 });
  }

  

  try {
    
    const { messages }:{messages:UIMessage[]} = await request.json();


    const result = streamText({
      // model: openai("gpt-4.1-mini"),
      // model: openai("gpt-4.1-mini-2025-04-14"),
      model: openai("gpt-5.4-nano-2026-03-17"),
      // temperature:0,
      system: KazinaTemplate,
      // messages,
      messages:await convertToModelMessages(messages),
      tools:{webSearchTool},
      maxRetries:4,
      
    });

    return result.toUIMessageStreamResponse()
    
  } catch (error) {
    console.error("API Error from chat end-point:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
