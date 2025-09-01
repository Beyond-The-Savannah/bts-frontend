import FeaturedPartners from "@/components/partnersPage/FeaturedPartners";
import HeroSection from "@/components/partnersPage/HeroSection";
import PartnersCTASection from "@/components/partnersPage/PartnersCTASection";
import PartnershipTypes from "@/components/partnersPage/PartnershipTypes";
import PoolOfCandidates from "@/components/partnersPage/PoolOfCandidates";
import WhyPartnerships from "@/components/partnersPage/WhyPartnerships";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

const url = getCldImageUrl({
  src: "partners_page_open_graph_image_tlbhok",
});

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        width: 1200,
        height: 800,
        url,
      },
    ],
  },
  title: "Partners -  Beyond The Savannah",
  description:
    "At Beyond the Savannah, we believe in the power of collaboration. By working with forward thinking organizations across industries, we're expanding access to remote opportunities and equipping job seekers with the tools they need to succeed.",
};

export default function page() {
  return (
    <>
      <HeroSection />
      <WhyPartnerships />
      <FeaturedPartners />
      <PartnershipTypes />
      <PoolOfCandidates/>
      <PartnersCTASection />
    </>
  );
}
