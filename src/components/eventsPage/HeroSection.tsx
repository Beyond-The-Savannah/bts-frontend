"use client";

import dynamic from "next/dynamic";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import EventSoldOutButton from "./EventSoldOutButton";

const EventForm = dynamic(() => import("@/components/eventsPage/EventForm"), {
  ssr: false,
});

export default function HeroSection({
  eventAttendees,
}: {
  eventAttendees: number;
}) {
  return (
    <>
      <section className=" relative bg-gradient-to-tr from-bts-GreenOne  via-bts-GreenOne/20 to-bts-GreenOne/5 ">
        <div className=" container mx-auto min-h-[90dvh] flex flex-col justify-center  gap-12  px-4">
          <h1 className="text-5xl md:text-7xl max-w-4xl z-[1] text-slate-900 font-bold">
            Remote & Ready:
            <br /> A Remote Work Mixer
          </h1>
          {eventAttendees <= 60 ? <EventForm /> : <EventSoldOutButton />}
        </div>
        <DisplayImageFromNextCloudinary
          src="hero-img_f9cfrb"
          alt="Lorraine, Beyond The Savannah Founder"
          height={800}
          width={700}
          classname=" absolute hidden lg:block bottom-0 right-1 z object-cover "
        />
      </section>
    </>
  );
}
