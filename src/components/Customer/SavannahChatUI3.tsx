"use client";

import { Fragment, useState } from "react";
import { Conversation, ConversationContent, ConversationScrollButton } from "../ai-elements/conversation";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { useChat } from "@ai-sdk/react";
import { PromptInput, PromptInputMessage, PromptInputSubmit, PromptInputTextarea } from "../ai-elements/prompt-input";
import { Message, MessageAction, MessageActions, MessageContent, MessageResponse } from "../ai-elements/message";
import { Copy, RefreshCcw } from "lucide-react";
import { DefaultChatTransport } from "ai";

export default function SavannahChatUI3() {
    const[input,setInput]=useState("")
    const{messages, sendMessage,status,regenerate}=useChat({
        transport: new DefaultChatTransport({ api: "/api/chat-through-vercel-ai-sdk",}),
    })
    const handleSubmit=(message:PromptInputMessage)=>{
        if(message.text.trim()){
            sendMessage({text:message.text})
            setInput("")
        }
    }
  return (
    <>
      <section className="pt-4 px-4 pb-2 ">
        {/* <div className="pl-0 md:pl-5">
          <div className="flex items-center gap-1">
            <h2 className="text-lg md:text-xl">Hi, I&apos;Am Savannah </h2>
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={400}
              width={400}
              alt="kazina beyond the savannah ai assisant"
              classname="object-contain size-12"
            />
          </div>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-xl md:text-3xl font-bold text-bts-GreenOne mt-2">
            Your remote work assistant v3
          </p>
        </div> */}
        {/* start of chat ui  */}
        <div className="c">
            {/* <div className="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-150"> */}
            <div className="max-w-4xl mx-auto pb-2 relative size-full  rounded-lg h-[60dvh] md:h-[65dvh] lg:h-[73dvh]">
                <div className="flex flex-col h-full">
                    <Conversation>
                        <ConversationContent>
                            {messages.map((message , messageIndex)=>(
                                <Fragment key={message.id}>
                                    {message.parts.map((part, i)=>{
                                        switch(part.type){
                                            case "text":
                                                const lastMessage=messageIndex===messages.length-1;
                                                return(
                                                    <Fragment key={`${message.id} -${i}`}>
                                                        <Message from={message.role}>
                                                            <MessageContent>
                                                                <MessageResponse>{part.text}</MessageResponse>
                                                            </MessageContent>
                                                        </Message>
                                                        
                                                        {message.role==="assistant" && lastMessage &&(
                                                        <MessageActions>
                                                            <MessageAction onClick={()=>regenerate()} label="Retry">
                                                                <RefreshCcw className="size-3"/>
                                                            </MessageAction>
                                                         
                                                        </MessageActions>)}
                                                    </Fragment>
                                                )
                                                default:
                                                    return null
                                        }
                                    })}
                                </Fragment>
                            ))}
                        </ConversationContent>
                        <ConversationScrollButton/>
                    </Conversation>
                    <PromptInput onSubmit={handleSubmit} className="mt-4 w-full max-w-2xl mx-auto relative">
                        <PromptInputTextarea
                            value={input}
                            placeholder="what question do you want answered..."
                            onChange={(e)=>setInput(e.currentTarget.value)}
                            className="pr-12"
                        />
                        <PromptInputSubmit 
                            status={status==="streaming"?"streaming":"ready"}
                            disabled={!input.trim()}
                            className="absolute bottom-1 right-1"
                        />
                    </PromptInput>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
