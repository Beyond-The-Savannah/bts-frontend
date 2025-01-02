import HeroSection from "@/components/homePage/HeroSection";
import NewsLetterSection from "@/components/homePage/NewsLetterSection";
import ServicesSection from "@/components/homePage/ServicesSection";
import TestimonialSection from "@/components/homePage/TestimonialSection";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4">
        <HeroSection />
        <ServicesSection />
        <TestimonialSection />
        <NewsLetterSection/>
      </main>
    </>
  );
}
