import Image from "next/image";
import React from "react";

export default function WhySection() {
  return (
    <>
      <section className="container mx-auto px-4 flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Our Unique Factor</h2>
          <div className="border-2 rounded-md border-amber-200 w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">Who We Are</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">
          <div className="c">
            <p className="c">
              At Beyond the Savannah, we understand that the landscape of work
              is changing. With the rise of remote work, professionals now have
              the chance to explore roles that were once confined to specific
              locations. Our team is dedicated to helping you navigate this new
              terrain, offering a range of services designed to enhance your
              employability and streamline your job search.
            </p>
          </div>
          <div className="c">
            <Image
              src="/images/remote bento.png"
              height={400}
              width={1200}
              alt="bento remote image"
              className="object-contain h-48 w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
