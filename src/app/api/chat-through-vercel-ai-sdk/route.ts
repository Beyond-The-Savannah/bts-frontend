import { streamText, tool } from "ai";
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
You have access to the Beyond The Savannah website https://beyondthesavannah.co.ke, from where you can recommend relevant information to users questions.
You have access to paystack's fraud block error support article https://support.paystack.com/en/articles/2125058, from where you can help users with paystack transaction errors.
Don't share the paystack's fraud block error article website link  when answering or when you can't answer's a users questions around transaction issues or and errors.
You have access to the Beyond The Savannah Catalog.pdf document, however don't state that you referenced it when fetching information to the user.
When asked about our services (ATS CV writing, LinkedIn Optimization, Introductory Video, and Interview Preparation), give them tips and pointers then go ahead and recommend them to purchase the service from the site for a more proffessional and tailored result.
When asked about job listings or a particular job, tell the user to have a active subscription by purchasing one of the packages. From the dashboard they can then filter the jobs listing based on the filters of a job name or department of the job,
When asked questions not within the mentioned areas, please tell them you cannot help and should find a specialist for that topic.`;

const webSearchTool=tool({
  description:"Search the Beyond The Savannah website for up to date information",
  parameters:z.object({
    query:z.string().describe('The URL to crawl https://beyondthesavannah.co.ke')
  }),
  execute:async ({query})=>{
    const {results}=await exa.searchAndContents(query,{livecrawl:'always', numResults:3})
    return results.map((result)=>({title:result.title,url:result.url, content:result.text}))
  }
})




export async function POST(request: Request){

  // const subscriptionPackagesPath=path.join(process.cwd(), 'public', 'docs', 'Subscription Packages.pdf')
  // const servicesCatalogPath=path.join(process.cwd(), 'public', 'docs', 'Services Catalog.pdf')
  const beyondthesavannahCatalogPath=path.join(process.cwd(),'public','docs','Beyond The Savannah Catalog.pdf')

  if (!fs.existsSync(beyondthesavannahCatalogPath)) {
    console.error('One of the Files are missing:', );
    return new Response('PDF file(s) not found', { status: 404 });
  }

  const beyondTheSavannahFileData = fs.readFileSync(beyondthesavannahCatalogPath)
  // const subscriptionPackagesFileData = fs.readFileSync(subscriptionPackagesPath)
  // const servicesCatalogFileData = fs.readFileSync(servicesCatalogPath)

  try {
    const body = await request.json();
    const { messages } = body;
// Get the latest user message text
    const latestUserMessage = messages
      .filter((msg: { role: string; }) => msg.role === 'user')
      .pop();
    
    const userText = latestUserMessage?.content || '';

    const result = streamText({
      // model: openai("gpt-4.1-mini"),
      model: openai("gpt-4.1-mini-2025-04-14"),
      temperature:0,
      system: KazinaTemplate,
      // messages,
      tools:{webSearchTool},
      messages:[
        {
          role:"user",
          content:[
            {
              type:'text',
              text: typeof userText === 'string' ? userText : JSON.stringify(userText)
            },
            {
              type:'file',
              data:beyondTheSavannahFileData,
              mimeType:'application/pdf',
            },
            // {
            //   type:'file',
            //   data:servicesCatalogFileData,
            //   mimeType:'application/pdf',
            // },
          ],
        },
      ],
      maxSteps:4,
      
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error from chat end-point:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
