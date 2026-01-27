
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";
import HeroSection from "@/components/eventsPage/HeroSection";
import EventOutLookSection from "@/components/eventsPage/EventOutLookSection";
import ExperienceSection from "@/components/eventsPage/ExperienceSection";
import { GetAllEvents } from "@/db/queries/eventsQuries";


const url = getCldImageUrl({
  src: "events_open_graph_image_2_s0sbyx",
});

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        width: 1200,
        height: 627,
        url,
      },
    ],
  },
  title: "Events - Beyond The Savannah",
  description:
    "The world is no longer confined to four walls, and neither is your career. Join Beyond the Savannah for an exclusive corporate mixer designed to bridge the gap between local expertise and global reach.",
};

export default async function page() {
  const eventAttendees= await GetAllEvents()
  // console.log("records",eventAttendees.length)
  return (
    <>
    <HeroSection eventAttendees={eventAttendees.length}/>
    <EventOutLookSection/>
    <ExperienceSection eventAttendees={eventAttendees.length}/>
    </>
  )
}
