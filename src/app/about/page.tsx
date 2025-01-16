import CommitmentSection from "@/components/aboutPage/CommitmentSection";
import FounderSection from "@/components/aboutPage/FounderSection";
import HeroSection from "@/components/aboutPage/HeroSection";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";
// import WhySection from "@/components/aboutPage/WhySection";


const url= getCldImageUrl({
  src:"about_openGraph_hk6rfb"
})

export const metadata:Metadata={
  openGraph:{
    images:[
      {
        width:1200,
        height:627,
        url
      }
    ]
  },
  title:"About - Beyond The Savannah",
  description:"Discover your potential at Beyond the Savannah, where we connect talented professionals with rewarding remote job opportunities. Embrace the future of work and achieve a fulfilling career from anywhere in the world."
}

export default function AboutPage() {
  return (
    <div className="pt-12">
    <HeroSection/>
    {/* <WhySection/> */}
    <FounderSection/>
    <CommitmentSection/>
    </div>
  )
}
