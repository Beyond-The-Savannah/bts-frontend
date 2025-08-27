'use client'

import { Blinds, Home, Loader } from "lucide-react"
import { Link } from "next-view-transitions";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function EmployerSideBar() {
    const sidebarLinks=[
        {
        title:"home",
        url:"/Employer",
        icon:Home
        },
        {
        title:"subscription details",
        url:"",
        icon:Blinds
        },
        {
        title:"Status",
        url:"",
        icon:Loader
        },
]

const pathname=usePathname()
  return (
    <>
        <Sidebar>
            <SidebarContent className="bg-bts-GreenOne text-white">
                <SidebarGroup>
                    <SidebarGroupLabel></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarLinks.map((link)=>(
                                <SidebarMenuItem key={link.title}>
                                    <SidebarMenuButton asChild className={clsx(pathname==link.url?"bg-stone-200 text-bts-GreenOne":"bg-none")}  >
                                        <Link href={link.url}>
                                            <span><link.icon className="size-4"/></span>
                                            <span>{link.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}  
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </>
  )
}
