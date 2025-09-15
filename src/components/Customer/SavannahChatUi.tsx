"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "../ui/button";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { useEffect, useRef } from "react";
// import { useUser } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
// import { Input } from "../ui/input";

export default function SavannahChatUi() {
  const chatContainer = useRef<HTMLDivElement>(null);
  const { user } = useUser();
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
    api: "/api/chat-through-vercel-ai-sdk",
    // api: "/api/chat-with-lang-chain",
  });

  useEffect(() => {
    const chatDiv = chatContainer.current;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <section className="h-full mb-2">
        {/* <div className="w-full lg:w-[70vw] mx-auto flex flex-col justify-between items-center gap-4 bg-bts-BrownTwo rounded-lg px-1 md:px-4 py-10"> */}
        {/* <div className="w-full lg:w-11/12 mx-auto flex flex-col justify-between items-center gap-4 bg-bts-BrownTwo rounded-lg px-1 md:px-4 py-10"> */}
        <div className="w-full lg:w-12/12 mx-auto flex flex-col justify-between items-center gap-4  rounded-lg px-1 py-10">
          <div
            // className="w-full lg:w-11/12 h-[60dvh] lg:h-[68dvh] overflow-y-auto bg-slate-500/3000 rounded-lg px-4 py-8"
            // className="w-full lg:w-11/12 h-[60dvh] lg:h-[68dvh] overflow-y-auto bg-slate-500/3000 rounded-lg px-2 lg:px-4 py-8"
            // className="w-[95dvw] md:w-[70vw] sm:w-11/12 h-[60dvh] lg:h-[68dvh] overflow-y-auto bg-slate-500/3000 rounded-lg px-2 lg:px-4 py-8"
            // className="w-12/12  sm:w-11/12 md:w-full lg:w-12/12 h-[60dvh] lg:h-[68dvh] overflow-y-auto bg-slate-500/3000 rounded-lg px-2 lg:px-0 py-8"
            className="w-12/12  sm:w-11/12 md:w-full lg:w-12/12 max-h-64 xl:max-h-96 overflow-y-auto bg-slate-500/3000 rounded-lg px-2 lg:px-0 py-8"
            ref={chatContainer}
          >
            {messages.length > 0 ? (
              <>
                {/* show kazina messages  */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex flex-wrap md:flex-nowrap items-start gap-2 bg-stone-100 rounded-lg px-2  md:px-3 py-4 mb-4"
                  >
                    <span className="text-xs rounded-lg bg-stone-200 p-1">
                      {message.role === "user" ? (
                        <div className="w-5  md:w-10 h-5 md:h-10 grid place-content-center text-center">
                          {/* you */}
                          {user?.imageUrl !==undefined ? (
                             <Image
                            src={user.imageUrl}
                            height={400}
                            width={400}
                            alt="users image"
                            className="object-contain rounded-lg"
                          />
                          )
                          :
                          (<p className="text-sm">You</p>)
                          }
                         
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
                    <div className="prose-sm prose-a:underline-offset-1 prose-a:text-blue-600">
                      <ReactMarkDown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkDown>
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
                {status == "submitted" && (
                  // <p className="animate-pulse">
                  //   processing
                  //   {[1, 2, 3].map((_, index) => (
                  //     <span
                  //       key={index}
                  //       className="animate-ping h-10 w-5 rounded-full"
                  //     >
                  //       &middot;
                  //     </span>
                  //   ))}
                  // </p>
                <div className="flex items-center justify-center gap-2">
                  <p>Processing</p>
                  <svg
                    className="text-gray-300 animate-spin"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                  >
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-bts-GreenOne"
                    ></path>
                  </svg>
                </div>
                )}
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
          
          {/* <div className="w-full lg:w-8/12 mx-auto  px-4 py-2 rounded-lg "> */}
          <div className="w-full xl:w-10/12 mx-auto  px-1 xl:px-4 py-2 rounded-lg ">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap md:flex-nowrap justify-end md:justify-evenly items-center gap-2">
                <Textarea
                  name="prompt"
                  value={input}
                  placeholder="Type your question here."
                  onChange={handleInputChange}
                  onKeyDown={async (event)=>{
                    if(event.key ==='Enter'&& !event.shiftKey){
                      event.preventDefault()
                      const form = event.currentTarget.form;
                      if (form) {
                        handleSubmit(new Event('submit'));
                      }
                    }
                  }}
                />
                {/* <Input
                  name="prompt"
                  value={input}
                  placeholder="Type your question here"
                  onChange={handleInputChange}
                  className="min-h-12"
                /> */}
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
