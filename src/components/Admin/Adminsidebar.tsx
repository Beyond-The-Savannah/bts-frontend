import { Briefcase, Building2, FolderPlus, Layers, Layers2 } from "lucide-react";
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

const items = [
  {
    title: "Forms",
    url: "/Admin/",
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
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[90vh]">
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
