import "../globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavigationSection from "@/components/NavigationSection";
import FooterSection from "@/components/FooterSection";

import { getCldOgImageUrl } from "next-cloudinary";
// import SavannahChatUI1 from "@/components/Customer/SavannahChatUI1";
import SavannahChatUI2 from "@/components/Customer/SavannahChatUI2";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const url = getCldOgImageUrl({
  src: "bts-og-img-2_t90ove",
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
  title: "Home - Beyond The Savannah",
  description:
    "Your unique experience is your Career accessory to landing a remote job. Level up your career with Beyond The Savannah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationSection />
      <div className="relative z-20">
        {/* <div className="absolute top-132 xl:top-158 right-44  "> */}
        <div className="absolute top-142 md:top-200 xl:bottom-158 right-24 md:right-44  ">
          {/* <div className="fixed bg-bts-GreenOne px-4 py-1 hover:scale-105 rounded-xl"> */}
          <div
            className={`${geist.variable} ${geistMono.variable} fixed bg-bts-GreenOne/40 px-4 py-1 hover:scale-105 rounded-xl`}
          >
            {/* <SavannahChatUI1 /> */}
            <SavannahChatUI2 />
          </div>
        </div>
      </div>
      {children}
      <FooterSection />
    </>
  );
}
