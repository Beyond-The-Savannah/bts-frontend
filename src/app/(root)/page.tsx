
import HeroSection from "@/components/homePage/HeroSection";
import NewsLetterSection from "@/components/homePage/NewsLetterSection";
import ServicesSection from "@/components/homePage/ServicesSection";
import TestimonialSection from "@/components/homePage/TestimonialSection";
import PostHogClient from "@/lib/postHogServerPage";

export default async function Home() {
  const posthog =PostHogClient()
  await posthog?.shutdown()
  return (
    <>
      <main className="">
        <HeroSection />
        <ServicesSection />
        <TestimonialSection />
        <NewsLetterSection />
      </main>
    </>
  );
}
