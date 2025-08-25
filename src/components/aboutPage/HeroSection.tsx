import React from "react";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import PostHogClient from "@/lib/postHogServerPage";

export default async function HeroSection() {
  const posthog = PostHogClient();
  await posthog?.shutdown();
  return (
    <>
      <section className="container mx-auto mt-5 md:-mt-10 lg:pt-40 lg:mb-20 px-2 md:px-4 min-h-[100vh] flex flex-col justify-center">
        <div className=" text-balance space-y-4  max-w-7xl mx-auto">
          <h1 className="capitalize text-center text-3xl lg:text-5xl text-balance text-bts-GreenOne font-bold ">
            Beyond the Savannah
          </h1>
          <p className="text-lg lg:text-xl w-11/12 md:w-10/12 text-center mx-auto">
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
              alt="Beyond the savannah about hero image"
              // classname="object-contain h-full w-full"
              classname="object-cover h-[30rem] md:h-full w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
