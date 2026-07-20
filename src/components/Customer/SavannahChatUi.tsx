"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

// import { Button } from "../ui/button";
// import ReactMarkDown from "react-markdown";
// import remarkGfm from "remark-gfm";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import React, { useEffect, useRef, useState } from "react";

// import { useUser } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
// import { Textarea } from "../ui/textarea";
import { Wifi } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "../ai-elements/message";
import {
  PromptInput,
  // PromptInputActionAddAttachments,
  PromptInputActionMenu,
  // PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../ai-elements/prompt-input";
// import { SpeechInput } from "../ai-elements/speech-input";

export default function SavannahChatUi() {
  const chatContainer = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
  const { user } = useUser();
  const {
    messages,
    status,
    sendMessage,
    // handleInputChange,
    // input,
    // handleSubmit,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat-through-vercel-ai-sdk",}),
    // api: "/api/chat-through-vercel-ai-sdk",
    // api: "/api/chat-with-lang-chain",
  });

  const handlePromptSubmit = (message:PromptInputMessage) => {
    if(message.text.trim()){
      sendMessage({text:message.text})
      setInput("")
    }
  };

  useEffect(() => {
    const chatDiv = chatContainer.current;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* <section className="relative flex size-full flex-col divide-y overflow-hidden"> */}
      <section className="relative max-h-[48dvh] md:h-[65dvh] w-full flex flex-col divide-y mt-4 overflow-hidden">
        <div ref={chatContainer} className="flex-1 overflow-y-auto min-h-0">
          <Conversation>
            <ConversationContent>
              {messages.map((message) => (
                
                    <Message
                      key={message.id}
                      from={message.role === "user" ? "user" : "assistant"}
                      className="flex flex-row gap-x-3"
                    >
                      {message.role === "user" ? (
                        <div className="w-5  md:w-10 ml-auto h-5 md:h-10 grid place-content-center text-center  text-xs">
                          {/* you */}
                          {user?.imageUrl !== undefined ? (
                            <Image
                              src={user.imageUrl}
                              height={400}
                              width={400}
                              alt="users image"
                              className="object-contain rounded-lg"
                            />
                          ) : (
                            <p className="text-xs">You</p>
                          )}
                        </div>
                      ) : (
                        <div className="w-5 md:w-10 h-5 md:h-10 ">
                          <DisplayImageFromNextCloudinary
                            src="kazina_upvlpf"
                            height={400}
                            width={400}
                            alt="beyond the savannah ai assisant"
                            classname="object-cover w-5 md:w-10 h-5 md:h-10"
                          />
                        </div>
                      )}
                      {/* <div className="prose-sm prose-a:underline-offset-1 prose-a:text-blue-600"> */}
                      <div className="">
                        <MessageContent >
                        {message.parts.map((part, i) => {

                            //  if (part.type === "text") {
                            //   return <MessageResponse key={`${message.id}-${i}`}>{part.text}</MessageResponse>;
                            // }
                            // if (part.type === "reasoning") {
                            //   return <p key={`${message.id}-${i}`} className="text-sm text-blue-300">reasoning...</p>;
                            // }
                            // if (part.type === "tool-invocation") {
                            // // if (part.type === "tool-webSearchTool") {
                            //   return (
                            //     <p key={`${message.id}-${i}`} className="text-sm text-blue-300 flex items-center">
                            //       <Wifi className="text-blue-400 animate-pulse" /> searching web...
                            //     </p>
                            //   );
                            // }
                            // return null;
  
                          switch (part.type){
                            case "text":
                              return (<MessageResponse key={`${message.id}-${i}`} className="text-xs prose prose-sm">{part.text}</MessageResponse>)
                          }
                          switch (part.type){
                            case "reasoning":
                              return (<p key={`${message.id}-${i}`} className="text-sm text-blue-300">reasoning...</p>)
                          }
                          switch (part.type){
                            case "tool-webSearchTool":
                              return (<p key={`${message.id}-${i}`} className="text-sm text-blue-300 flex gap-1 items-end"><Wifi className="text-blue-400 animate-pulse"/> searching web...</p>)
                          }
                          
                        })}
                        </MessageContent>
                      </div>
                    </Message>
                
              ))}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
        <div className="grid shrink-0 gap-4 pt-4">
          <div className="w-full px-4 pb-4">
            <PromptInput globalDrop multiple onSubmit={handlePromptSubmit}>
              <PromptInputHeader></PromptInputHeader>
              <PromptInputBody>
                <PromptInputTextarea
                  onChange={(e)=>setInput(e.currentTarget.value)}
                  value={input}
                  placeholder="Welcome, enter your question here"
                />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools>
                  <PromptInputActionMenu>
                    <PromptInputActionMenuTrigger />
                    {/* <PromptInputActionMenuContent>
                      <PromptInputActionAddAttachments disabled />
                    </PromptInputActionMenuContent> */}
                  </PromptInputActionMenu>
                  {/* <SpeechInput className="shrink-0" onTranscriptionChange={} size="sm" variant="ghost"/> */}
                </PromptInputTools>
                <PromptInputSubmit status={status} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      </section>
    </>
  );
}
