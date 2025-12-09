import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function HeroSection() {
  return (
    <>
      {/* <section className="container mx-auto px-4 xs:min-h-[99dvh] md::min-h-[99dvh] lg::min-h-[99dvh] xl::min-h-[99dvh]   grid grid-cols-1 md:grid-cols-2  md:pt-0  gap-4"> */}
      <section className="container mx-auto px-4 xs:min-h-[99dvh] md:min-h-[90dvh] lg:min-h-[90dvh] xl:min-h-[80dvh] 2xl:min-h-[55dvh]    grid grid-cols-1 md:grid-cols-2  md:pt-0  gap-4">
        <div className=" space-y-6 mt-40 md:mt-64 capitalize">
          <h1 className=" text-3xl lg:text-5xl text-balance text-bts-GreenOne font-bold">
            Empowering your career journey through seamless connections.
          </h1>
          <p className="text-lg lg:text-xl w-4/5">
            Explore a world of remote opportunities and level up your career
            with Beyond the Savannah!
          </p>
          <Link href="/#services">
            <Button
              size="lg"
              className="my-8 font-semibold text-black bg-bts-BrownFour hover:bg-bts-BrownThree hover:text-white hover:scale-105 transition duration-500 text-base"
            >
              View our Services
            </Button>
          </Link>
        </div>
        <div className=" 2xl:max-h-[75dvh]">
          <DisplayImageFromNextCloudinary
            src="hero-img2_s7awvs"
            height={800}
            width={800}
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
            alt="Lorraine founder of beyond the savannah"
            classname="object-cover h-full w-full"
            priority
          />
        </div>
      </section>
    </>
  );
}
