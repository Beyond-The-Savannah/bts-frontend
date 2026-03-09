"use client";

import {
  FilesIcon,
  FolderPlus,
  MessagesSquareIcon,
  ServerIcon,
  UserCog2,
} from "lucide-react";
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
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {UserButton,} from "@clerk/nextjs";
import { useShowCandidateProfileLink } from "@/hooks/useShowCandidateProfileLink";


const customerSidebarLinks = [
  {
    title: "Jobs",
    url: "/Customer/find-jobs",
    icon: FilesIcon,
  },
  {
    title: "subscription",
    url: "/Customer",
    icon: FolderPlus,
  },
  {
    title: "Services",
    url: "/Customer/btsServices",
    icon: ServerIcon,
  },
  {
    title: "Savannah Assistant",
    url: "/Customer/Savannah",
    icon: MessagesSquareIcon,
  },
];
const customerSidbebarLinks2 = [
  {
    title: "Profile",
    url: "/Customer/candidateProfile",
    icon: UserCog2,
  },
];

export default function CustomerSideBar2() {
  const pathname = usePathname();
  const candidateDetails=useShowCandidateProfileLink()

  // console.log("CANDIDATES DETAILS", candidateDetails);

  return (
    <Sidebar>
      <SidebarContent className="bg-bts-GreenOne text-white">
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[90dvh]">
            <SidebarMenu>
              {customerSidebarLinks.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    asChild
                    className={clsx(
                      pathname == link.url
                        ? "bg-stone-400 text-bts-GreenOne"
                        : "bg-none",
                    )}
                  >
                    <Link href={link.url}>
                      <span>
                        <link.icon className="size-4" />
                      </span>
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {candidateDetails.length>0 ? (
                <>
                  {customerSidbebarLinks2.map((link) => (
                    <SidebarMenuItem key={link.title}>
                      <SidebarMenuButton
                        asChild
                        className={clsx(
                          pathname == link.url
                            ? "bg-stone-400 text-bts-GreenOne"
                            : "bg-none",
                        )}
                      >
                        <Link href={link.url}>
                          <span>
                            <link.icon className="size-4" />
                          </span>
                          <span>{link.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </>
              ) : null}
            </SidebarMenu>
            <SidebarMenu>
              
                <div className="flex items-center gap-2">
                  <p>Signed in as</p>
                  <UserButton />
                </div>
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
