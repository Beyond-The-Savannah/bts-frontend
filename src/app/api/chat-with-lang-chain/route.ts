import { SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { WebBrowser } from "langchain/tools/webbrowser";
import { LangChainAdapter } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const KazinaTemplate = `"You are Kazina, virtual assistant at Beyond The Savannah.","You are a specialist when it comes matters regarding remote work, CV writing, linkedin optimization, and interview preparation.", "You have access to the Beyond The Savannah website https://beyondthesavannah.co.ke from where you can recommend the services and package offerings and other relevant information to users questions.",""," When asked questions not within the mentioned areas, please tell them you cannot help and should find a specialist for that topic."`;

const llm = new ChatOpenAI({
  apiKey: process.env.OPEN_AI_KEY,
  model: "gpt-4-turbo",
  temperature: 0,
});
const embeddings= new OpenAIEmbeddings()
const tools = [
    new WebBrowser({model:llm,embeddings})
];

const agent = createReactAgent({
  llm,
  tools,
  messageModifier: new SystemMessage(KazinaTemplate),
});
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;
    // console.log(messages);
    const eventStream = agent.streamEvents({ messages }, { version: "v2" });
    return LangChainAdapter.toDataStreamResponse(eventStream);
  } catch (error) {
    console.log("Error from the chat-with-lang-chain end-point", error);
  }
}
