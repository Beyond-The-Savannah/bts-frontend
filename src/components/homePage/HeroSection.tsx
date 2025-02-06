import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function HeroSection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-[99vh] grid grid-cols-1 md:grid-cols-2  md:pt-0  gap-4">
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
              // className="my-8 font-semibold text-black bg-amber-400 hover:bg-amber-500 hover:scale-105 transition duration-500 text-base"
              className="my-8 font-semibold text-black bg-bts-BrownFour hover:bg-bts-BrownThree hover:text-white hover:scale-105 transition duration-500 text-base"
            >
              View our Services
            </Button>
          </Link>
        </div>
        <div className="">
          
          <DisplayImageFromNextCloudinary
            // src="Loarraine_Laptop_Hero_Image_d9mk1t"
            src="hero-img_f9cfrb"
            height={800}
            width={800}
            alt="Lorraine founder of beyond the savannah"
            classname="object-cover h-full w-full"
          />
        </div>
      </section>
    </>
  );
}
