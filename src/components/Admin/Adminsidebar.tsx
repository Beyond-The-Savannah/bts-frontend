"use client"

import { BrickWall, Briefcase, Building2, Factory, FolderPlus, Layers, Layers2, Users, } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Link } from "next-view-transitions";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const items = [
  {
    title: "Forms",
    url: "/Admin",
    icon: FolderPlus,
  },
  
  {
    title: "Companies",
    url: "/Admin/companyListing",
    icon: Building2,
  },
  {
    title: "Jobs",
    url: "/Admin/jobsListing",
    icon: Briefcase,
  },
  {
    title: "Job Categories",
    url: "/Admin/jobsCategoryListing",
    icon: Layers2,
  },
  {
    title: "Job Sub-Categories",
    url: "/Admin/jobsSubCategoryListing",
    icon: Layers,
  },
  {
    title: "Subscribed Users",
    url: "/Admin/subscribedUsers",
    icon: Users,
  },
  {
    title: "Events",
    url: "/Admin/events-bts",
    icon: BrickWall,
  },
  {
    title: "BTS Candidates",
    url: "/Admin/bts-candidates",
    icon: Factory,
  },
];

export default function AppSidebar() {
  const pathname=usePathname()
  return (
    <Sidebar>
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[90vh]">
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={clsx(pathname==item.url ? "bg-stone-400 text-bts-GreenOne":"bg-none")}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu>
              <SignedIn>
                <div className="bg-bts-BrownThree p-1 rounded-2xl flex gap-1 items-center">
                  <p>Signed In as </p>
                  <UserButton />
                </div>
              </SignedIn>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
