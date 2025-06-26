import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SavannahChatUi from "./SavannahChatUi";

export default function SavannahChatUI1() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center justify-center hover:scale-110 transition ease-in">
            <p className="font-semibold text-black">Savannah</p>
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={800}
              width={800}
              alt="savannah avatar"
              classname="size-12"
            />
          </div>
        </SheetTrigger>
        <SheetContent className="max-w-[800px] md:max-w-[65%] lg:max-w-[45%] min-h-[80dvh]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-1">
              <span className="text-xl">Hi, I&apos;Am Savannah </span>
              <DisplayImageFromNextCloudinary
                src="kazina_upvlpf"
                height={400}
                width={400}
                alt="kazina beyond the savannah ai assisant"
                classname="object-contain size-12"
              />
            </SheetTitle>
            <SheetDescription>
              <span className="border-2 rounded-md block border-bts-BrownThree w-36"></span>
              <p className="capitalize text-xl md:text-3xl font-bold text-bts-GreenOne mt-2">
                Your remote work assistant
              </p>
            </SheetDescription>
          </SheetHeader>
          <div className="">
            <SavannahChatUi />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="bg-bts-BrownThree hover:bg-bts-GreenOne hover:text-white"
              >
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
