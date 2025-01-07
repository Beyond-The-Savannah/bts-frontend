import CommitmentSection from "@/components/aboutPage/CommitmentSection";
import FounderSection from "@/components/aboutPage/FounderSection";
import HeroSection from "@/components/aboutPage/HeroSection";
// import WhySection from "@/components/aboutPage/WhySection";


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
