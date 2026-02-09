"use client"
import dynamic from "next/dynamic";
import EventSoldOutButton from "./EventSoldOutButton";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function ExperienceSection({
  eventAttendees,
}: {
  eventAttendees: number;
}) {
  const EventForm = dynamic(() => import("@/components/eventsPage/EventForm"), {
    ssr: false,
  });
  return (
    <>
      {/* <section className=" ">
        <div className="container mx-auto min-h-[80dvh] grid py-20 gap-4  px-4">
          <h2 className="text-center text-5xl font-bold">The Experience</h2>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-12 my-10">
            <div className="w-full md:w-4/12 border-2 rounded-xl px-4 py-8 space-y-8 bg-gradient-to-tr from-bts-BrownTwo via-bts-GreenOne/20 to-bts-GreenOne/5">
              <p className="text-center text-xl font-semibold">
                Premier Global recruiters
              </p>
              <p className="text-center ">
                This is your chance to understand what international firms are
                searching for and how to position yourself for the global
                market.
              </p>
            </div>
            <div className="w-full md:w-4/12 border-2 rounded-xl px-4 py-8 space-y-8 bg-gradient-to-tr from-bts-BrownTwo via-bts-GreenOne/20 to-bts-GreenOne/5">
              <p className="text-center text-xl font-semibold">Global Insights</p>
              <p className="text-center ">
                Hear from two visionary keynote speakers who are leading the
                charge in the remote work revolution. They will dive into the
                future of digital nomadism, cross-border productivity, and how
                to maintain a competitive edge from anywhere on the planet.
              </p>
            </div>
            <div className="w-full md:w-4/12 border-2 rounded-xl px-4 py-8 space-y-8 bg-gradient-to-tr from-bts-BrownTwo via-bts-GreenOne/20 to-bts-GreenOne/5">
              <p className="text-center text-xl font-semibold">Curated Networking</p>
              <p className="text-center ">
                Connect with like-minded professionals, founders, and innovators
                in a high-vibe atmosphere.
              </p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-10">
            <div className="space-y-4 my-10">
              <p className="text-center text-xl font-medium">Ready to take your office to the world?</p>
              <p className="text-center">Space is limited to ensure quality networking opportunities. <br/>Don&apos;t miss your chance to meet the people who can help you land your next global role</p>
              <p className="text-sm italic text-center">The venue has limited parking space, advised to use a cab.</p>
            </div>
              <div className="grid place-content-center">
              {eventAttendees <= 60 ? <EventForm /> : <EventSoldOutButton />}
              </div>
          </div>
        </div>
      </section> */}
      <section className="bg-[#f9f7f2]">
        {/* <div className="container mx-auto min-h-[80dvh] grid py-20 gap-4  px-4"> */}
        <div className="container mx-auto  py-20 gap-4  px-4">
          <h2 className="text-center text-5xl font-bold">The Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center  gap-8">
          <div className="flex flex-wrap  justify-center gap-4 my-10">
            <div className="w-full lg:w-10/12 border-2 rounded-xl px-4 py-8 space-y-8 bg-gradient-to-tr from-bts-BrownTwo via-bts-GreenOne/20 to-bts-GreenOne/5">
              <p className="text-center text-xl font-semibold">
                Premier Global recruiters
              </p>
              <p className="text-center text-sm">
                This is your chance to understand what international firms are
                searching for and how to position yourself for the global
                market.
              </p>
            </div>
            <div className="w-full lg:w-10/12 border-2 rounded-xl px-4 py-8 space-y-8 bg-gradient-to-tr from-bts-BrownTwo via-bts-GreenOne/20 to-bts-GreenOne/5">
              <p className="text-center text-xl font-semibold">Curated Networking</p>
              <p className="text-center text-sm">
                Connect with like-minded professionals, founders, and innovators
                in a high-vibe atmosphere.
              </p>
            </div>
            <div className="w-full lg:w-10/12 border-2 rounded-xl px-4 py-8 space-y-8 bg-gradient-to-tr from-bts-BrownTwo via-bts-GreenOne/20 to-bts-GreenOne/5">
              <p className="text-center text-xl font-semibold">Global Insights</p>
              <p className="text-center text-sm">
                Hear from two visionary keynote speakers who are leading the
                charge in the remote work revolution. They will dive into the
                future of digital nomadism, cross-border productivity, and how
                to maintain a competitive edge.
              </p>
            </div>
          </div>
          {/* <div className="bg-[url('https://res.cloudinary.com/dh8qlzbzk/image/upload/v1770644198/bts-march-mixer_panelist_udlm4g.png')] bg-cover bg-bottom bg-no-repeat h-[60dvh] w-full rounded-lg"> */}
          <div className="">
          <DisplayImageFromNextCloudinary
          src="bts-march-mixer_panelist_udlm4g"
          alt="bts march mixer panelist"
          height={400}
          width={1200} 
          classname="object-contain bg-bottom bg-no-repeat h-full w-full rounded-lg"
          />
          </div>

          </div>
          <div className="max-w-4xl mx-auto mt-10">
            <div className="space-y-4 my-10">
              <p className="text-center text-xl font-medium">Ready to take your office to the world?</p>
              <p className="text-center">Space is limited to ensure quality networking opportunities. <br/>Don&apos;t miss your chance to meet the people who can help you land your next global role</p>
              <p className="text-sm italic text-center">The venue has limited parking space, advised to use a cab.</p>
            </div>
              <div className="grid place-content-center">
              {eventAttendees <= 60 ? <EventForm /> : <EventSoldOutButton />}
              </div>
          </div>
        </div>
      </section>
    </>
  );
}
