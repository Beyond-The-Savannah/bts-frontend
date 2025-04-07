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

import { GetUserSubscriptionInformation } from "./UserSubscriptionInformation";
const items = [
  {
    title: "Jobs",
    url: "/Customer/find-jobs",
    icon: FileStack,
  },
  {
    title: "Subscription",
    url: "/Customer/",
    icon: FolderPlus,
  },
];
const items2 = [
  {
    title: "Whatsapp Subscription",
    url: "/Customer/whatsappService?source=whatsapp-service",
    icon: FolderPlus,
  },
];
export default async function CustomerSideBar() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  // console.log("USEINFO SIDEBAR", userSubscriptionInformation);

  return (
    <Sidebar>
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[90vh]">
            <SidebarMenu className="space-y-2">
              {/* userSubscriptionInformation?.status == "active" ||
              userSubscriptionInformation?.status == "attention" ||
              userSubscriptionInformation?.status == "non-renewing" ||   */}
              {["active", "attention", "non-renewing","completed"].includes(
                userSubscriptionInformation?.status as string
              ) &&
              (userSubscriptionInformation?.plan?.amount !=600000) ? (
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
              {(["active", "attention", "non-renewing","completed"].includes(
                userSubscriptionInformation?.status as string
              ) && userSubscriptionInformation?.plan?.amount == 600000 )? (
                <>
                  {items2.map((item) => (
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
