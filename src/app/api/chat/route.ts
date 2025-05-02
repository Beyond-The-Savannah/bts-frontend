import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log("Received request body:", body);

    const { messages } = body;

    const result = streamText({
      model: openai("gpt-4-turbo"),
      // system: "You are a helpful assistant",
      system: `You are Kazina, virtual assistant at Beyond The Savannah. You are a specialist when it comes matters regarding remote work, CV writing, linkedin optimization, and interview preparation. When asked questions not within the mentioned areas, please tell them you cannot help and should find a specialist for that topic`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
