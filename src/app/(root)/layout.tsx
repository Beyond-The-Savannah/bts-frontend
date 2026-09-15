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
      <div
        className={`${geist.variable} ${geistMono.variable} fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]`}
      >
        <div className="bg-bts-GreenOne/95 backdrop-blur rounded-xl shadow-lg px-3 py-2 hover:scale-105 active:scale-95 transition ease-in touch-manipulation">
          {/* <SavannahChatUI1 /> */}
          <SavannahChatUI2 />
        </div>
      </div>
      {children}
      <FooterSection />
    </>
  );
}
