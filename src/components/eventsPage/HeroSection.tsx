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
    
      <section className="bg-linear-to-tr from-bts-GreenOne  via-bts-GreenOne/20 to-bts-GreenOne/5 ">
        <div className="container mx-auto px-4 xs:min-h-[99dvh] md:min-h-[90dvh] lg:min-h-[90dvh] xl:min-h-[90dvh] 2xl:min-h-[90dvh] grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className=" cols-span-12  md:col-span-8 flex flex-col justify-center  gap-12  px-4">
            <h1 className="pt-32 md:pt-1 text-4xl md:text-6xl max-w-4xl z-1 text-slate-900 font-bold">
              Remote & Ready:
              <br /> A Remote Work Mixer
            </h1>
            {eventAttendees >= 52 ? <EventForm /> : <EventSoldOutButton />}
          </div>
          <div className="cols-span-12  md:col-span-4">
            <DisplayImageFromNextCloudinary
              src="march_event_mixer_event_hero_img_ar0yxs"
              alt="Lorraine, Beyond The Savannah Founder"
              height={800}
              // width={650}
              width={800}
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
              classname="block object-cover w-full h-full pt-20 "
            />
          </div>
        </div>
      </section>
    </>
  );
}
