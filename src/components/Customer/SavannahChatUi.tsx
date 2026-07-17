"use client";

import { useChat } from "@ai-sdk/react";
// import { Button } from "../ui/button";
// import ReactMarkDown from "react-markdown";
// import remarkGfm from "remark-gfm";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import React, { useEffect, useRef } from "react";

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
  MessageBranch,
  MessageBranchContent,
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
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../ai-elements/prompt-input";
// import { SpeechInput } from "../ai-elements/speech-input";

export default function SavannahChatUi() {
  const chatContainer = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const {
    messages,
    input,
    handleInputChange,
    status,
    // stop,
    // error,
    // reload,
    handleSubmit,
  } = useChat({
    api: "/api/chat-through-vercel-ai-sdk",
    // api: "/api/chat-with-lang-chain",
  });

  const handlePromptSubmit = (
    _message: unknown,
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    handleSubmit(event);
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
      <section className="relative h-[65dvh] w-full flex flex-col divide-y overflow-hidden">
        <div ref={chatContainer} className="flex-1 overflow-y-auto min-h-0">
          <Conversation>
            <ConversationContent>
              {messages.map((message) => (
                <MessageBranch defaultBranch={0} key={message.id}>
                  <MessageBranchContent>
                    <Message
                      from={message.role}
                      key={message.id}
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
                        {message.parts.map((part, i) => {
                          if (part.type === "text") {
                            return (
                              <MessageContent key={i}>
                                {/* <ReactMarkDown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkDown> */}
                                {/* <MessageResponse className="border  px-2 rounded-lg py-4"> */}
                                <MessageResponse className="">
                                  {message.content}
                                </MessageResponse>
                              </MessageContent>
                            );
                          }
                          if (part.type === "tool-invocation") {
                            const { toolName, state } = part.toolInvocation;
                            if (
                              toolName === "webSearchTool" &&
                              state !== "result"
                            ) {
                              return (
                                <div
                                  key={i}
                                  className="flex gap-1 items-center flex-row-reverse"
                                >
                                  <p className="text-blue-300">
                                    searching web...
                                  </p>
                                  <Wifi className="text-blue-400 animate-pulse" />
                                </div>
                              );
                            }
                            return null;
                          }
                          return null;
                        })}
                      </div>
                    </Message>
                  </MessageBranchContent>
                </MessageBranch>
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
                  onChange={handleInputChange}
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
