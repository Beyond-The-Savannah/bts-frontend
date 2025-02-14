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
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            <section className="px-4 md:px-12">{children}</section>
          </main>
        </SidebarProvider>
      </section>
    </ViewTransitions>
  );
}
