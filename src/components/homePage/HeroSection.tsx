import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-screen grid grid-cols-1 md:grid-cols-2 pt-40 md:pt-0 items-center gap-4">
        <div className=" space-y-6   capitalize">
          <h1 className=" text-3xl lg:text-5xl text-balance font-bold">
            Empowering your career journey through seamless connections.
          </h1>
          <p className="text-lg lg:text-xl w-4/5">
            Explore a world of remote opportunities and level up your career
            with Beyond the Savannah!
          </p>
          <Link href='/#services'>
            <Button size='lg' className="my-8 font-semibold text-black bg-amber-400 hover:bg-amber-500 hover:scale-105 transition duration-500 text-base">
              View our Services
            </Button>
          </Link>
        </div>
        <div className="relative -mt-12 lg:-mt-0">
          <div className="size-48 md:size-96 rounded-md  bg-amber-600 absolute top-80 left-40 -z-10"></div>
          <div className="size-32 md:size-64 rounded-md  bg-amber-400 absolute top-40 md:top-64 -z-10"></div>
          <div className="size-32 md:size-64 rounded-md  bg-amber-400 absolute bottom-12 md:bottom-24 -z-10"></div>
          <Image
            src={
              "https://i.postimg.cc/V6JsZmXH/DSC-0811-copyk-removebg-preview.png"
            }
            width={800}
            height={800}
            alt="LORRAINE founder of beyond the savannah"
            className="object-conver h-full w-full  lg:-mt-48"
          />
        </div>
      </section>
    </>
  );
}
