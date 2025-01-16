// import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";

export default function WhySection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-[40vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Our Unique Factor</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">Who We Are</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 items-center justify-center space-y-8 pb-20 pt-0 md:pt-20">
          <div className="col-span-12 md:col-start-2 col-end-8">
            <p className="text-lg">
              At Beyond the Savannah, we understand that the landscape of work
              is changing. With the rise of remote work, professionals now have
              the chance to explore roles that were once confined to specific
              locations.<br/><br/> Our team is dedicated to helping you navigate this new
              terrain, offering a range of services designed to enhance your
              employability and streamline your job search.
            </p>
          </div>
          <div className="col-span-12 md:col-start-9 col-end-12">
          <Link href='\#services'>
            <Button
                  size="lg"
                  // className="text-base border-amber-400 bg-amber-400 text-black hover:bg-amber-300 hover:scale-105 transition duration-500"
                  className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
                >
                  Try Our Services
                </Button>
          </Link>
            {/* <Image
              src="/images/remote bento.png"
              height={400}
              width={1200}
              alt="bento remote image"
              className="object-contain h-48 w-full"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}
