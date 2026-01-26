"use client";

import dynamic from "next/dynamic";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";


const EventForm = dynamic(() => import("@/components/eventsPage/EventForm"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <>
      {/* <section className="bg-[url('https://res.cloudinary.com/dh8qlzbzk/image/upload/v1768987452/BTS_March_Mixer_Event_ltsihc.jpg')] bg-cover bg-center bg-no-repeat pt-40"> */}
      <section className=" relative bg-gradient-to-tr from-bts-GreenOne  via-bts-GreenOne/20 to-bts-GreenOne/5 ">
        
        <div className=" container mx-auto min-h-[80dvh] flex flex-col justify-center  gap-12  px-4">
          <h1 className="text-5xl md:text-7xl max-w-4xl z-20 text-slate-900 font-bold">
            Remote & Ready:<br/> A Remote Work Mixer
          </h1>
          <EventForm />
        </div>
          <DisplayImageFromNextCloudinary
            src="hero-img_f9cfrb"
            alt="Lorraine, Beyond The Savannah Founder"
            height={800}
            width={630}
            classname=" absolute hidden lg:block top-0 right-1 z-10 object-cover "
          />
      </section>
    </>
  );
}
