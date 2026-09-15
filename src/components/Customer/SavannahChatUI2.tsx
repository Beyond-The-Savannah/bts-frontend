import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SavannahChatUI3 from "./SavannahChatUI3";

export default function SavannahChatUI2() {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-center hover:scale-110 active:scale-95 transition ease-in touch-manipulation min-h-11 min-w-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full">
        <DisplayImageFromNextCloudinary
          src="kazina_upvlpf"
          height={100}
          width={100}
          sizes="(max-width:768px) 10vw,(max-width:1200px) 10vw, 10vw"
          alt="savannah avatar"
          classname="size-12"
        />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        collisionPadding={8}
        avoidCollisions
        // className="w-[calc(100vw-16px)] max-w-105 sm:w-95 md:w-105 h-[min(74dvh,600px)] max-h-[85dvh] p-0 flex flex-col overflow-hidden rounded-xl shadow-xl mr-2 md:mr-0 data-[state=open]:animate-in data-[state=closed]:animate-out"
        className="w-[calc(100vw-16px)] max-w-105 sm:w-95 md:w-105 h-[min(74dvh,600px)] max-h-[85dvh] p-0 flex flex-col overflow-hidden rounded-xl shadow-xl mr-2 md:mr-0 data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        {/* Header - shrink-0 so it never collapses */}
        <div className="shrink-0 p-4 border-b bg-popover">
          <div className="flex items-center gap-1">
            <span className="text-sm md:text-sm">Hi, I&apos;Am Savannah </span>
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={400}
              width={400}
              alt="kazina beyond the savannah ai assisant"
              classname="object-contain size-12"
            />
          </div>
          <div className="mt-1">
            <span className="border-2 rounded-md block border-bts-BrownThree w-36"></span>
            <span className="capitalize text-sm lg:text-xl font-bold text-bts-GreenOne mt-2 block">
              Your remote work assistant
            </span>
          </div>
        </div>
        {/* Chat body - flex-1 min-h-0 enables proper scrolling on mobile */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col bg-background">
          <SavannahChatUI3 />
        </div>
      </PopoverContent>
    </Popover>
  );
}
