import { Home, Inbox,} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { Link } from "next-view-transitions";
import { SignedIn, UserButton } from "@clerk/nextjs";

const items = [
    {
      title: "Home",
      url: "/Admin/",
      icon: Home,
    },
    {
      title: "JobListing",
      url: "/Admin/JobListing",
      icon: Inbox,
    },
    
  ]

export default function AppSidebar() {
    
  return (
    <Sidebar >
      <SidebarHeader className="bg-bts-BrownThree" />
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col justify-between h-[90vh]">
                <SidebarMenu>
                    {items.map((item)=>(
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                <item.icon/>
                                <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarMenu>
                  <SignedIn>
                    {/* <div className="flex items-center gap-1"> */}
                    <div className="bg-bts-BrownThree/5 p-1 rounded-2xl flex gap-1 items-center">
                    <p>Authenticated as </p>
                    <UserButton/>
                    </div>
                  </SignedIn>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-bts-BrownThree" />
    </Sidebar>
  );
}
