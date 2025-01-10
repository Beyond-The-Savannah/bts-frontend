import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavigationSection from "@/components/NavigationSection";
import FooterSection from "@/components/FooterSection";
import { ViewTransitions } from 'next-view-transitions'
import TanstackQueryProvider from "@/lib/tanstack";
import { getCldOgImageUrl } from "next-cloudinary";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const url=getCldOgImageUrl({
  src:"Beyond_the_Savannah_OG-Image_pwe3xv"
})

export const metadata: Metadata = {
  openGraph:{
    images:[
      {
        width:1200,
        height:627,
        url
      }
    ]
  },
  title: "Beyond The Savannah",
  description: "Your unique experience is your Career accessory to landing a remote job. Level up your career with Beyond The Savannah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${montserrat.className} antialiased`}
      >
        <TanstackQueryProvider>
          <ViewTransitions>
            <NavigationSection/>
            {children}
            <FooterSection/>
          </ViewTransitions>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
