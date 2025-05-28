import { streamText, tool } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import Exa from "exa-js"
import { z } from "zod";


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const openai = createOpenAI({apiKey: process.env.OPEN_AI_KEY,});
const exa= new Exa(process.env.EXA_API_KEY)

const KazinaTemplate = `You are Savannah, a remote work assistant at Beyond The Savannah.
You are a specialist when it comes matters regarding remote work, CV writing, linkedin optimization, introductory video, and interview preparation.
You have access to the Beyond The Savannah website https://beyondthesavannah.co.ke, from where you can recommend the services and packages  to access the various services and job listings and other relevant information to users questions.
When asked about our services (ATS CV writing, LinkedIn Optimization, Introductory Video, and Interview Preparation), give them tips and pointers then go ahead and recommend them to purchase the service from the site for a more proffessional and tailored result.
When asked about job listings or a particular job, tell the user to have a active subscription by purchasing one of the packages. From the dashboard they can then filter the jobs listing based on the filters of a job name or department of the job,
When asked questions not within the mentioned areas, please tell them you cannot help and should find a specialist for that topic.`;

const webSearchTool=tool({
  description:"Search Beyond The Savannah website for up to date information",
  parameters:z.object({
    query:z.string().describe('The URL to crawl https://beyondthesavannah.co.ke')
  }),
  execute:async ({query})=>{
    const {results}=await exa.searchAndContents(query,{livecrawl:'always', numResults:3})
    return results.map((result)=>({title:result.title,url:result.url, content:result.text}))
  }
})


export async function POST(request: Request){
  try {
    const body = await request.json();
    const { messages } = body;

    const result = streamText({
      // model: openai("gpt-4-turbo"),
      model: openai("gpt-4.1-mini-2025-04-14"),
      temperature:0,
      system: KazinaTemplate,
      messages,
      tools:{webSearchTool},
      maxSteps:4,
      
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error from chat end-point:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
