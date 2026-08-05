import "../globals.css";

import AppSidebar from "@/components/Admin/Adminsidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ViewTransitions } from "next-view-transitions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <section className=" ">
        <SidebarProvider style={{
          "--sidebar-width":"13rem",
          "--sidebar-wdith":"13rem"
        } as React.CSSProperties}>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <section className="px-4 md:px-12">{children}</section>
          </main>
        </SidebarProvider>
      </section>
    </ViewTransitions>
  );
}
