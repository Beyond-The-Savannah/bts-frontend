import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { experimental_createMCPClient as createMCPClient } from 'ai';


// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const dynamic = "force-dynamic";


const openai=createOpenAI({apiKey:process.env.OPEN_AI_KEY})

const KazinaTemplate = `You are Savannah, a remote work assistant at Beyond The Savannah.
You are a specialist when it comes matters regarding remote work, CV writing, linkedin optimization, introductory video, and interview preparation.
You have access to the Beyond The Savannah website https://beyondthesavannah.co.ke, from where you can recommend relevant information to users questions.
When asked about our services (ATS CV writing, LinkedIn Optimization, Introductory Video, and Interview Preparation), give them tips and pointers then go ahead and recommend them to purchase the service from the site for a more proffessional and tailored result.
When asked about job listings or a particular job, tell the user to have a active subscription by purchasing one of the packages. From the dashboard they can then filter the jobs listing based on the filters of a job name or department of the job,
When asked questions not within the mentioned areas, please tell them you cannot help and should find a specialist for that topic.`;






export async function POST(request:Request){

    const mcpClient= await createMCPClient({
        transport:{
            type:'sse',
            url:'https://beyondthesavannah.co.ke',
        }
    })

    const body=await request.json()
    const {messages}=body

    try {
        const result=streamText({
            model:openai("gpt-4.1-mini"),
            temperature:0,
            system:KazinaTemplate,
            tools:await mcpClient.tools(),
            messages
        })

        return result.toDataStreamResponse()

    } catch (error) {
        console.log("Error in chat-through-vercel-ai-sdk-mcp",error)
        return new Response("Server error", {status:500})
    }
}