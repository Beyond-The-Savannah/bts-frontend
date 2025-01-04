import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <>
      <section className="container mx-auto px-4 h-screen">
        <div className=" text-balance space-y-4  max-w-7xl mx-auto">
          <h1 className="capitalize text-center text-3xl lg:text-5xl text-balance font-bold">
            Beyond the Savannah
          </h1>
          <p className="text-lg lg:text-xl w-10/12 text-center mx-auto">
            At Beyond the Savannah, where we empower professionals to
            embrace the future of work through remote opportunities. Our mission
            is to connect talented individuals with fulfilling remote roles from
            around the globe, enabling them to achieve a balanced and rewarding
            career
          </p>
          <div>
            <Image
              src="/images/remote bento 1 transparent.png"
              height={400}
              width={1200}
              alt="bento remote image"
              className="object-contain h-full w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
