import type { Metadata } from "next";
// import { Montserrat } from "next/font/google";
import "../globals.css";
import NavigationSection from "@/components/NavigationSection";
import FooterSection from "@/components/FooterSection";
// import { ViewTransitions } from "next-view-transitions";
// import TanstackQueryProvider from "@/lib/tanstack";
import { getCldOgImageUrl } from "next-cloudinary";
// import { PostHogProvider } from "@/lib/postHogProvider";


// const montserrat = Montserrat({
//   subsets: ["latin"],
// });

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
    // <html lang="en">
    //   <body
    //     className={`${montserrat.className} antialiased`}
    //   >
    <>
    {/* <TanstackQueryProvider>
      <ViewTransitions>
        <PostHogProvider> */}
          <NavigationSection />
          {children}
          <FooterSection />
        {/* </PostHogProvider>
      </ViewTransitions>
    </TanstackQueryProvider> */}
    
    </>
    //   </body>
    // </html>
  );
}
