"use client";

import dynamic from "next/dynamic";

const EventForm = dynamic(() => import("@/components/eventsPage/EventForm"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <>
      <section className="bg-[url('https://res.cloudinary.com/dh8qlzbzk/image/upload/v1768987452/BTS_March_Mixer_Event_ltsihc.jpg')] bg-cover bg-center bg-no-repeat pt-40">
        <div className="c"></div>
        <div className="container mx-auto min-h-[80dvh] grid place-content-center gap-4  px-4">
          {/* <h1 className="text-center text-9xl font-bold">Mixer Event</h1> */}
          <EventForm />
        </div>
      </section>
    </>
  );
}
