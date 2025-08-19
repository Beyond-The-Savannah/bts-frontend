import { FileStack, FolderPlus, MessagesSquare, Server } from "lucide-react";
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
import { currentUser } from "@clerk/nextjs/server";

 const byPassEmailAddresses = [
    // `ayuny.farah@gmail.com`,
    // `wambui4wachira@gmail.com`,
    // `jacklinewaceke199@gmail.com`,
    // `dmuthoni487@gmail.com`,
    // `marynicholas777@gmail.com`,
    // `tracygwangui@gmail.com`,
    // `dianacheserem@gmail.com`,
    // `kinyachiokz@gmail.com`,
    `onyango.mary15@gmail.com`,
    // `sonimuthoni23@gmail.com`,
    `kimothoevalyne@gmail.com`,
    
  ];

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
const items3 = [
  {
    title: "Services",
    // url: "/#services",
    url: "/Customer/btsServices",
    icon: Server,
  },
  {
    title: "Savannah Assistant",
    url: "/Customer/Savannah",
    icon: MessagesSquare,
  },
];
export default async function CustomerSideBar() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const user = await currentUser();
  // console.log("USEINFO SIDEBAR", userSubscriptionInformation);

  return (
    <Sidebar>
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          {/* <SidebarGroupContent className="flex flex-col justify-between h-[90vh]"> */}
          <SidebarGroupContent className="flex flex-col justify-between min-h-[90dvh]">
            <SidebarMenu className="space-y-2">
              
              {
              
              (["active", "attention", "non-renewing", "completed"].includes(userSubscriptionInformation?.status as string) && userSubscriptionInformation?.plan?.amount != 600000 ) ||
              (userSubscriptionInformation==null || userSubscriptionInformation==undefined) && byPassEmailAddresses.includes(user?.emailAddresses[0].emailAddress as string)
              ? 
              
              (
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
              {
              ["active", "attention", "non-renewing", "completed"].includes(
                userSubscriptionInformation?.status as string
              ) && userSubscriptionInformation?.plan?.amount == 600000 
          
              ? 
              
              (
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
              <>
                {items3.map((item) => (
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
