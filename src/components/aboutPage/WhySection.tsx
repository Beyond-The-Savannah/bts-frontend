import React from "react";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";


export default function WhySection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-[40vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Our Unique Factor</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            Who We Are
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 items-center justify-center space-y-8 pb-20 pt-0 md:pt-20">
          <div className="col-span-12 md:col-start-2 col-end-8">
            {/* <p className="text-lg">
              At Beyond the Savannah, we understand that the landscape of work
              is changing. With the rise of remote work, professionals now have
              the chance to explore roles that were once confined to specific
              locations.
              <br />
              <br /> Our team is dedicated to helping you navigate this new
              terrain, offering a range of services designed to enhance your
              employability and streamline your job search.
            </p> */}
            <p className="text-lg">
              At Beyond the Savannah, we know that building a distributed
              workforce requires more than just posting a job online. True
              success lies in finding the right cultural and technical fit
              across different time zones and regions.
              <br />
              <br /> Our team is dedicated to streamlining this process for you.
              By combining local market insights with a deep understanding of
              remote work dynamics, we handle the heavy lifting of talent
              acquisition—ensuring you only meet pre-screened professionals who
              are ready to deliver results on day one.
            </p>
          </div>
          <div className="col-span-12 md:col-start-9 col-end-12">
            {/* <Link href="\#services">
              <Button
                size="lg"
                className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
              >
                Try Our Services
              </Button>
            </Link> */}
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
          {/* <Button variant="outline" size="lg" asChild>
            <Link href="/Employer" className="w-[15.4rem]">
                Sign In As Employer
            </Link>
          </Button> */}
        </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
