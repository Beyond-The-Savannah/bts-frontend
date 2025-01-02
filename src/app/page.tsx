import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/homePage/HeroSection";
import NewsLetterSection from "@/components/homePage/NewsLetterSection";
import ServicesSection from "@/components/homePage/ServicesSection";
import TestimonialSection from "@/components/homePage/TestimonialSection";
import NavigationSection from "@/components/NavigationSection";

export default function Home() {
  return (
    <>
      <NavigationSection />
      <main className="container mx-auto px-4">
        <HeroSection />
        <ServicesSection />
        <TestimonialSection />
        <NewsLetterSection />
      </main>
      <FooterSection />
    </>
  );
}
