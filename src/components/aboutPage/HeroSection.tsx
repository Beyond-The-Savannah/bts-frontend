import React from "react";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import PostHogClient from "@/lib/postHogServerPage";

export default async function HeroSection() {
  const posthog = PostHogClient();
  await posthog?.shutdown();
  return (
    <>
      {/* <section className="container mx-auto mt-5 md:-mt-10 lg:pt-40 lg:mb-20 px-2 md:px-4 min-h-[100vh] flex flex-col justify-center"> */}
      {/* <section className="container mx-auto mt-5 md:-mt-10 lg:pt-40 lg:mb-20 px-2 md:px-4xs:min-h-[99dvh] md:min-h-[90dvh] lg:min-h-[90dvh] xl:min-h-[80dvh] 2xl:min-h-[55dvh] flex flex-col justify-center"> */}
      {/* <section className="container mx-auto mt-5 md:-mt-10 lg:pt-40 lg:mb-20 px-2 md:px-4 xs:min-h-[99dvh] md:min-h-[90dvh] lg:min-h-[90dvh] xl:min-h-[90dvh] 2xl:min-h-[90dvh] flex flex-col justify-center"> */}
      <section className="container mx-auto mt-5 md:-mt-10 lg:pt-20 lg:mb-20 px-2 md:px-4 xs:min-h-[99dvh] md:min-h-[90dvh] lg:min-h-[90dvh] xl:min-h-[90dvh] 2xl:min-h-[90dvh] flex flex-col justify-center">
        <div className=" text-balance space-y-4  max-w-7xl mx-auto">
          <h1 className="capitalize text-center text-3xl lg:text-5xl text-balance text-bts-GreenOne font-bold ">
            Beyond the Savannah
          </h1>
          <p className="text-lg lg:text-lg w-11/12 md:w-8/12 text-center mx-auto">
            At Beyond the Savannah, where we empower professionals to embrace
            the future of work through remote opportunities. Our mission is to
            connect talented individuals with fulfilling remote roles from
            around the globe, enabling them to achieve a balanced and rewarding
            career
          </p>
          <div>
            <DisplayImageFromNextCloudinary
              src="remote_bento_1_transparent_ots5xr"
              height={400}
              width={1200}
              priority
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
              alt="Beyond the savannah about hero image"
              // classname="object-cover h-[30rem] md:h-full w-full"
              classname="object-contain h-[30rem] md:h-[70dvh] w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
