"use client";

import { Fragment, useState } from "react";
import { Conversation, ConversationContent, ConversationScrollButton } from "../ai-elements/conversation";
import { useChat } from "@ai-sdk/react";
import { PromptInput, PromptInputMessage, PromptInputSubmit, PromptInputTextarea } from "../ai-elements/prompt-input";
import { Message, MessageAction, MessageActions, MessageContent, MessageResponse } from "../ai-elements/message";
import { RefreshCcw } from "lucide-react";
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
      <section className="flex flex-1 min-h-0 flex-col overflow-hidden bg-background">
        {/* Chat container - flex-1 min-h-0 is critical for mobile scrolling + keyboard handling */}
        <div className="flex flex-1 min-h-0 flex-col max-w-4xl mx-auto w-full relative overflow-hidden">
            <Conversation className="flex-1 min-h-0 overscroll-contain">
                <ConversationContent className="p-4 gap-4">
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
            {/* Input - shrink-0 + safe-area + sticky ensures keyboard visibility on iOS/Android */}
            <PromptInput onSubmit={handleSubmit} className="shrink-0 w-full p-3 mb-4 border-t bg-background pb-[env(safe-area-inset-bottom)]">
                <PromptInputTextarea
                    value={input}
                    placeholder="what question do you want answered..."
                    onChange={(e)=>setInput(e.currentTarget.value)}
                    className="min-h-11 max-h-24 resize-none text-base pr-12 field-sizing-content"
                    rows={1}
                />
                <PromptInputSubmit 
                    status={status==="streaming"?"streaming":"ready"}
                    disabled={!input.trim()}
                    className="absolute bottom-3 right-3 size-8 shrink-0"
                />
            </PromptInput>
        </div>
      </section>
  );
}
