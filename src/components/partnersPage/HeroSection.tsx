import { Link } from "next-view-transitions";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function HeroSection() {
  return (
    <section className="">
      
      <div className="xs:min-h-[99dvh] md:min-h-[90dvh] bg-[url('https://res.cloudinary.com/dh8qlzbzk/image/upload/v1781432193/partner-hero-bg-1_boujin.png')] bg-contain bg-no-repeat bg-center lg:min-h-[99dvh] xl:min-h-[99dvh] 2xl:min-h-[99dvh]   flex flex-wrap-reverse md:flex-nowrap justify-between  gap-4 ">
        {/* <div className="w-full md:w-6/12 px-4 md:px-12 flex flex-col justify-center items-start pb-10 pt-4 md:pt-2  xl:pt-80 gap-12"> */}
        <div className="w-full lg:w-8/12 mx-auto text-center px-4 md:px-12 flex flex-col justify-center items-center pb-10 pt-4 md:pt-2  xl:pt-80 gap-12">
          <h1 className="text-3xl md:text-5xl text-bts-GreenOne font-bold mt-20 xl:-mt-80">
            Partnership That<br/> Empower Companies
          </h1>
          <p className="w-full lg:w-8/12 mx-auto text-lg text-balance font-medium leading-7 sm:my-10 lg:my-0 ">
            {/* We collaborate with organizations committed to empowering global
            talent and transforming remote opportunities into thriving careers. */}
            Connecting your business with the precise talent needed to drive growth, innovation, and long-term success.
          </p>
        <div className="flex flex-wrap items-center justify-center  gap-x-2 gap-y-4">
           <Dialog>
              <DialogTrigger asChild>
                <Link
                  href="https://calendly.com/beyondthesavannah-info/partner-discovery-call"
                  target="partners-calendarly-page-show"
                >
                  <Button
                    size="lg"
                    className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
                  >
                    Start The Conversation
                  </Button>
                </Link>
              </DialogTrigger>
              <DialogContent className="min-h-[80dvh] max-w-[99dvw] md:max-w-[70dvw]">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                  <iframe
                    name="partners-calendarly-page-show"
                    src="https://calendly.com/beyondthesavannah-info/partner-discovery-call"
                    className="h-full w-full"
                  ></iframe>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          <Button variant="outline" size="lg" asChild>
            <Link href="/Employer" className="w-[15.4rem]">
                Sign In As Employer
            </Link>
          </Button>
        </div>
        </div>
        {/* <div className="w-full md:w-6/12 2xl:max-h-[75dvh] -z-10"> */}
        <div className="w-full md:w-6/12 2xl:max-h-[90dvh] -z-10 hidden">
          <DisplayImageFromNextCloudinary
            src="partnership_Hero_Image_ozntgb"
            height={800}
            width={800}
            priority
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
            alt="partnership hero image"
            classname="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
