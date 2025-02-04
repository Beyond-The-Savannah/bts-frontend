import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import TanstackQueryProvider from "@/lib/tanstack";
import { getCldOgImageUrl } from "next-cloudinary";
import { PostHogProvider } from "@/lib/postHogProvider";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from 'sonner'
const montserrat = Montserrat({
  subsets: ["latin"],
});

const url = getCldOgImageUrl({
  src: "BTS_Home_OpenGraph_3_lzxntd",
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${montserrat.className} antialiased`}
        >
          <TanstackQueryProvider>
            <ViewTransitions>
              <PostHogProvider>
                {children}
                <Toaster position='top-center'/>
              </PostHogProvider>
            </ViewTransitions>
          </TanstackQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
