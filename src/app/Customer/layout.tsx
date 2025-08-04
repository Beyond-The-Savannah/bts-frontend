// import "../globals.css";

import CustomerSideBar from "@/components/Customer/CustomerSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ViewTransitions } from "next-view-transitions";

export default function Customerlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <section>
        <SidebarProvider>
          <CustomerSideBar />
          <main className=" w-full ">
            <SidebarTrigger />
            <section className="px-2 md:px-1">{children}</section>
          </main>
        </SidebarProvider>
      </section>
    </ViewTransitions>
  );
}
