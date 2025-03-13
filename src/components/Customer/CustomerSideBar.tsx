import { FileStack, FolderPlus } from "lucide-react";
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
// import { SubscriptionProps } from "@/types/subscriptions";
// import { currentUser } from "@clerk/nextjs/server";

import { GetUserSubscriptionInformation } from "./UserSubscriptionInformation";
const items = [
  {
    title: "Home",
    url: "/Customer/",
    icon: FolderPlus,
  },

  // {
  //   title: "Subscribtions",
  //   url: "/Customer/customerpage",
  //   icon: Building2,
  // },
  {
    title: "jobs",
    url: "/Customer/find-jobs",
    icon: FileStack,
  },
];
export default async function CustomerSideBar() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  return (
    <Sidebar>
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[90vh]">
            <SidebarMenu className="space-y-2">
              {userSubscriptionInformation?.status == "active" ||
              userSubscriptionInformation?.status == "attention" ||
              userSubscriptionInformation?.status == "non-renewing" ? (
                <>
                  {" "}
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
                </>
              ) : null}
            </SidebarMenu>
            <SidebarMenu>
              <SignedIn>
                <div className="bg-bts-BrownThree/5 p-1 rounded-2xl flex gap-1 items-center">
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
