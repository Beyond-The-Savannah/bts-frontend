import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import SavannahChatUi from "./SavannahChatUi";

export default function SavannahChatUI2() {
  return (
    <>
      <Popover>
        <PopoverTrigger className="flex items-center justify-center hover:scale-110 transition ease-in">
          <p className="font-semibold text-white">Savannah</p>
          <DisplayImageFromNextCloudinary
            src="kazina_upvlpf"
            height={100}
            width={100}
            sizes="(max-width:768px) 10vw,(max-width:1200px) 10vw, 10vw"
            alt="savannah avatar"
            classname="size-12"
          />
        </PopoverTrigger>
        <PopoverContent className="min-w-[98dvw] md:min-w-[75dvw] lg:min-w-[50dvw] ">
          <div className="flex items-center gap-1">
            <span className="text-lg md:text-xl">Hi, I&apos;Am Savannah </span>
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={400}
              width={400}
              alt="kazina beyond the savannah ai assisant"
              classname="object-contain size-12"
            />
          </div>
          <div className="c">
            <span className="border-2 rounded-md block border-bts-BrownThree w-36"></span>
              <span className="capitalize text-sm lg:text-xl font-bold text-bts-GreenOne mt-2">
                Your remote work assistant
              </span>
          </div>
          <div className="c">
            <SavannahChatUi />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
