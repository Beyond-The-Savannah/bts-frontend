import {
  NonSimpleNavigationMenuItems,
  simpleNavigationMenuItems,
} from "@/staticData/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { Link } from "next-view-transitions";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuSquareIcon } from "lucide-react";
import DisplayImageFromNextCloudinary from "./DisplayImageFromNextCloudinary";

export default function NavigationSection() {
  return (
    <>
      <nav className="">
        <NavigationMenu className=" fixed">
          <NavigationMenuList className="bg-slate-500/30  backdrop-blur-md flex items-center justify-between gap-2 lg:gap-12  w-[99.9vw] rounded-md  px-4 lg:px-12 py-4">
            <NavigationMenuItem>
              <Link href="/">
                <DisplayImageFromNextCloudinary
                  src="BTS_Logo_xa2iht"
                  height={800}
                  width={800}
                  prioty
                  alt="square shapes"
                  classname="object-contain size-24 md:size-32 rounded-lg absolute"
                />
              </Link>
            </NavigationMenuItem>
            <div className="hidden md:flex  items-end md:items-center gap-3 lg:gap-8">
              <ul className="hidden md:flex  items-end md:items-center gap-3 lg:gap-8">
                {simpleNavigationMenuItems.map((menuItem) => (
                  <NavigationMenuItem key={menuItem.id} className="">
                    <Link
                      href={`${menuItem.link}`}
                      className="font-semibold flex hover:scale-110 transition ease-in"
                    >
                      {menuItem.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </ul>

              {NonSimpleNavigationMenuItems.map((item) => (
                <NavigationMenuItem key={item.id} className="pr-48">
                  <NavigationMenuTrigger className="font-semibold text-base relative bg-transparent hover:bg-transparent hover:scale-110 transition ease-in">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="">
                    <ul className="grid md:grid-cols-2 justify-end gap-3 p-4 w-[500px] lg:w-[600px] px-8">
                      {item.subLinks.map((sublink) => (
                        <li key={sublink.title}>
                          <Link
                            href={sublink.link}
                            // className="hover:border-b-2 border-amber-300 hover:bg-slate-50 px-4 py-2"
                            // className="hover:shadow-md hover:shadow-amber-300 hover:bg-slate-50 rounded-md px-4 py-2"
                            className="flex hover:scale-105 transition ease-in"
                          >
                            {sublink.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </div>
            {/* mobile navigation  */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger>
                  <MenuSquareIcon className="" size={32} />
                </SheetTrigger>
                <SheetContent className="overflow-auto">
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <div className="">
                    <NavigationMenu>
                      {/* <NavigationMenuList className="flex flex-col items-start gap-8"> */}
                      <NavigationMenuList className="flex flex-col items-end ml-36 gap-8 pt-8 ">
                        {simpleNavigationMenuItems.map((menuItem) => (
                          <NavigationMenuItem
                            key={menuItem.id}
                            className=" list-none"
                          >
                            <SheetClose asChild>
                              <Link
                                href={`${menuItem.link}`}
                                className="font-semibold hover:scale-110 transition ease-in"
                              >
                                {menuItem.title}
                              </Link>
                            </SheetClose>
                          </NavigationMenuItem>
                        ))}

                        {NonSimpleNavigationMenuItems.map((item) => (
                          <NavigationMenuItem
                            key={item.id}
                            className="list-none"
                          >
                            <NavigationMenuTrigger className=" px-0 font-semibold text-base relative bg-transparent hover:bg-transparent hover:scale-110 transition ease-in">
                              {item.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="w-52">
                              <ul className="flex flex-col px-4 py-2 space-y-4 ">
                                {item.subLinks.map((sublink) => (
                                  <li key={sublink.title}>
                                    <SheetClose asChild className="">
                                      <Link
                                        href={sublink.link}
                                        className="flex hover:scale-105 transition ease-in"
                                      >
                                        {sublink.title}
                                      </Link>
                                    </SheetClose>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
