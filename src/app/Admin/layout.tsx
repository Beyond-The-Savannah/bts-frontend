// import { Montserrat } from "next/font/google";
import "../globals.css";

import AppSidebar from "@/components/Admin/Adminsidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ViewTransitions } from "next-view-transitions";

// const montserrat = Montserrat({
//   subsets: ["latin"],
// });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={`${montserrat.className} antialiased`}>
    <ViewTransitions>
      <section className=" ">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </section>
    </ViewTransitions>
    //   </body>
    // </html>
  );
}
