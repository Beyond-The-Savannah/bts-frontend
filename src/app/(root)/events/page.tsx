import GuestSpeakes from "@/components/eventsPage/GuestSpeakes";
import HeroSection from "@/components/eventsPage/HeroSection";
import SupportSection from "@/components/eventsPage/SupportSection";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";


const url = getCldImageUrl({
  src: "events-page_q5pg9k",
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

export default function page() {
  return (
    <>
    <HeroSection/>
    <GuestSpeakes/>
    <SupportSection/>
    </>
  )
}
