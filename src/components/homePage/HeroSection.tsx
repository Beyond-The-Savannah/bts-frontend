import { Button } from "../ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <div className=" space-y-4   capitalize">
          <h1 className=" text-3xl lg:text-5xl text-balance font-bold">
            Empowering your career journey through seamless connections.
          </h1>
          <p className="text-lg lg:text-xl w-4/5">
            {/* Seamless connections, soaring carrers, elevate yours with beyond the savannah! */}
            Explore a world of remote opportunities and level up your career
            with Beyond the Savannah!
          </p>
          <Button className="bg-amber-400 hover:bg-amber-500 text-base">
            View our Services
          </Button>
        </div>
        <div className=" bg-amber-50">
          <Image
            src={
              "https://i.postimg.cc/V6JsZmXH/DSC-0811-copyk-removebg-preview.png"
            }
            width={800}
            height={800}
            alt="LORRAINE founder of beyond the savannah"
            className="object-conver h-full w-full  -mt-48"
          />
        </div>
      </section>
    </>
  );
}
