
import HeroSection from "@/components/homePage/HeroSection";
import NewsLetterSection from "@/components/homePage/NewsLetterSection";
import ServicesSection from "@/components/homePage/ServicesSection";
import TestimonialSection from "@/components/homePage/TestimonialSection";


// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;


export default function Home() {
  
  return (
    <>
      <main className="">
        <HeroSection />
        <ServicesSection/>
        <TestimonialSection />
        <NewsLetterSection />
      </main>
    </>
  );
}
