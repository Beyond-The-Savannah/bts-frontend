import EmployerSideBar from "@/components/Employer/EmployerSideBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { ViewTransitions } from "next-view-transitions";
import { CSSProperties, ReactNode } from "react";


export default function EmployerLayout({children}:{children:ReactNode}) {
  return (
    <>
    <ViewTransitions>
        <SidebarProvider style={{"--sidebar-width": "13rem","--sidebar-width-mobile": "13rem",} as CSSProperties}>
            <EmployerSideBar/>
            <SidebarInset>
                <main className="w-full">
                    <div className="flex">
                        <SidebarTrigger/>
                        <p className=" flex items-center ml-4 md:hidden font-semibold text-xs">
                            <span>{<ArrowLeft className="size-4"/>}</span>  Activate sidebar
                        </p>
                    </div>
                    <section className="px-2 md:px-1">{children}</section>
                </main>
            </SidebarInset>
        </SidebarProvider>
    </ViewTransitions>
    </>
  )
}
