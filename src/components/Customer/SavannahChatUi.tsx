"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "../ui/button";
import ReactMarkDown from "react-markdown";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

export default function SavannahChatUi() {
  const chatContainer = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    status,
    stop,
    error,
    reload,
    handleSubmit,
  } = useChat({
    // api: "/api/chat",
    api: "/api/chat-with-lang-chain",
  });

  useEffect(() => {
    const chatDiv = chatContainer.current;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <section className="h-full mt-10">
        <div className="w-full lg:w-[70vw] mx-auto flex flex-col justify-between items-center gap-4 bg-bts-BrownTwo rounded-lg px-1 md:px-4 py-10">
          <div
            className="w-full lg:w-10/12 h-[55dvh] overflow-y-auto bg-slate-500/3000 rounded-lg px-4 py-8"
            ref={chatContainer}
          >
            {messages.length > 0 ? (
              <>
                {/* show kazina messages  */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex flex-wrap md:flex-nowrap items-start gap-2 bg-stone-100 rounded-lg px-2 md:px-3 py-4 mb-4"
                  >
                    <span className="text-xs rounded-lg bg-stone-200 px-1">
                      {message.role === "user" ? (
                        <div className="w-5 md:w-10 h-5 md:h-10 grid place-content-center text-center">
                          you
                        </div>
                      ) : (
                        <div className="w-5 md:w-10">
                          <DisplayImageFromNextCloudinary
                            src="kazina_upvlpf"
                            height={400}
                            width={400}
                            alt="kazina beyond the savannah ai assisant"
                            classname="object-contain "
                          />
                        </div>
                      )}
                    </span>
                    {/* <p className="text-sm leading-7">{message.content}</p> */}
                    <div className="prose-sm">
                      <ReactMarkDown>{message.content}</ReactMarkDown>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // show the default message to user about kazina when no message exist
              <>
                <div className="bg-slate-50 px-2 md:px-4 py-1 md:py-8 rounded-lg">
                  <p className="text-sm text-center text-balance leading-7">
                    Ask any question you might have in regards to remote work
                    and Beyond The Savannah.
                  </p>
                </div>
              </>
            )}
            {/* provide processing user input and provide means to interupt kazina response */}
            {(status === "submitted" || status === "streaming") && (
              <div className=" flex items-center gap-2 px-4">
                {status == "submitted" && <p>processing...</p>}
                <Button variant="outline" type="button" onClick={() => stop()}>
                  Stop
                </Button>
              </div>
            )}
            {/* handle errors when they occur  */}
            {error && (
              <>
                <div className=" max-w-lg mx-auto flex justify-between items-center gap-2 bg-red-200 rounded-lg px-4 py-1 text-xs">
                 <p> An error occured</p>
                <Button
                  variant="outline"
                  type="button"
                  className="text-sm"
                  onClick={() => reload()}
                >
                  Retry
                </Button>
                </div>
              </>
            )}
          </div>
          <div className="w-full lg:w-8/12 mx-auto border border-stone-400 px-4 py-12 rounded-lg ">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap md:flex-nowrap justify-end md:justify-evenly items-center gap-2">
                <Textarea
                  name="prompt"
                  value={input}
                  placeholder="Type your question here."
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  className="bg-bts-BrownOne text-black hover:bg-bts-BrownFour hover:text-slate-100 hover:scale-105"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
