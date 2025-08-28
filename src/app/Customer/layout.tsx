// import CustomerSideBar from "@/components/Customer/CustomerSideBar";
import CustomerSideBar2 from "@/components/Customer/CustomerSideBar2";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { ViewTransitions } from "next-view-transitions";

export default function Customerlayout({children,}: {children: React.ReactNode;}){
  return (
    <ViewTransitions>
      <section>
        <SidebarProvider style={{"--sidebar-width":"13rem", "--sidebar-width-mobile":"13rem",} as React.CSSProperties}>
          {/* <CustomerSideBar /> */}
          <CustomerSideBar2/>
          <main className=" w-full ">
            <div className="flex mb-4">
              <SidebarTrigger />
              <p className=" flex items-center ml-4 md:hidden font-semibold text-xs">
                    <span>{<ArrowLeft className="size-4"/>}</span>  Activate sidebar
                </p>
            </div>
            <section className="px-2 md:px-1">{children}</section>
          </main>
        </SidebarProvider>
      </section>
    </ViewTransitions>
  );
}
