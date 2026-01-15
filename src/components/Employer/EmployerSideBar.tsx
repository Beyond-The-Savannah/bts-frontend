'use client'

import { Blinds, File, Home, Loader, Users } from "lucide-react"
import { Link } from "next-view-transitions";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { OrganizationSwitcher, SignedIn,  UserButton } from "@clerk/nextjs";

export default function EmployerSideBar() {
    const sidebarLinks=[
        {
        title:"home",
        url:"/Employer",
        icon:Home
        },
        {
        title:"Jobs",
        url:"/Employer/jobs",
        icon:File
        },
        {
        title:"Candidates",
        url:"/Employer/candidates",
        icon:Users
        },
        {
        title:"subscription details",
        url:"/Employer/subscriptionDetails",
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
                        <div className="flex flex-col h-[90dvh] items-center justify-between">
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
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" hover:bg-none">
                                      <div className="flex items-center gap-2 bg-slate-50/10">
                                                {/* <p className="c">Manage {organization?.name} profile </p> */}
                                                <OrganizationSwitcher hidePersonal={true}/>
                                              </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                            <div className="c">
                                <SignedIn>
                                    <div className="flex items-center gap-2">
                                        <p className="c">Signed in as</p>
                                    <UserButton afterSwitchSessionUrl="/partners"/>
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </>
  )
}
