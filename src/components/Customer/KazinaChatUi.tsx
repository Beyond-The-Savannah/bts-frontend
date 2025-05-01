"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function KazinaChatUi() {
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
    api: "/api/chat",
  });
  return (
    <>
      <section className="h-full mt-10">
        <div className=" w-[75vw] mx-auto flex flex-col justify-between items-center gap-4 bg- rounded-lg px-4 py-10">
          <div className="w-10/12 h-[60vh] overflow-y-scroll bg-slate-500/30 rounded-lg px-4 py-8">
            {messages.length > 0 ? (
              <>
                {/* show kazina messages  */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-2 bg-stone-100 rounded-lg px-4 py-1 mb-4"
                  >
                    <span className="text-xs rounded-lg bg-stone-200 px-4">
                      {/* {message.role === "user" ? "you" : (<><p>&#128105;</p></>)} */}
                      {message.role === "user" ? (
                        <div className="w-10 h-10 grid place-content-center text-center">
                          you
                        </div>
                      ) : (
                        <div className="w-10">
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
                    <p className="text-sm leading-7">{message.content}</p>
                  </div>
                ))}
              </>
            ) : (
              // show the default message to user about kazina when no message exist
              <>
                <div className="bg-slate-300 px-4 py-8 rounded-lg">
                  <p className="leading-8">
                    Ask any question you might have in regards to remote work
                    and Beyond The Savannah website
                  </p>
                </div>
              </>
            )}
            {/* provide processing user input and provide means to interupt kazina response */}
            {(status === "submitted" || status === "streaming") && (
              <div>
                {status == "submitted" && <p>processing...</p>}
                <Button variant="outline" type="button" onClick={() => stop()}>
                  Stop
                </Button>
              </div>
            )}
            {/* handle errors when they occur  */}
            {error && (
              <>
                <div className=" bg-red-200 rounded-lg px-4 text-sm">
                  An error occured
                </div>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => reload()}
                >
                  Retry
                </Button>
              </>
            )}
          </div>
          <div className="w-8/12 mx-auto border border-stone-400 px-4 py-12 rounded-lg ">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-evenly items-center gap-2">
                <Input
                  name="prompt"
                  value={input}
                  placeholder="Ask me a question"
                  onChange={handleInputChange}
                />
                <Button type="submit" className="">
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
