import { Link } from "next-view-transitions";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="min-h-screen">
      <div className="min-h-[90dvh] flex flex-wrap md:flex-nowrap justify-between  gap-4 ">
        <div className="w-full md:w-6/12 px-4 md:px-12 flex flex-col justify-center items-start  gap-12">
          <h1 className="text-3xl md:text-5xl text-bts-GreenOne font-bold">
            Partnership that Empower
          </h1>
          <p className="text-lg text-balance leading-7 ">
            We collaborate with organizations committed to empowering global
            talent and transforming remote opportunities into thriving careers.
          </p>
          <Link href="mailto:info@beyondthesavannah.co.ke">
            <Button
              size="lg"
              className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
            >
              Start the Conversation
            </Button>
          </Link>
        </div>
        <div className="w-full md:w-6/12 -z-10">
          <DisplayImageFromNextCloudinary
            src="partnership_Hero_Image_ozntgb"
            height={800}
            width={800}
            alt="partnership hero image"
            classname="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
