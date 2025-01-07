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
import Image from "next/image";
import { Link } from "next-view-transitions";

export default function NavigationSection() {
  return (
    <>
      <nav className="">
        <NavigationMenu className=" fixed">
          <NavigationMenuList className="bg-slate-500/30  backdrop-blur-md flex items-center justify-between gap-12  w-[99vw] rounded-md  px-12 py-4">
            <NavigationMenuItem>
              <Link href="/">
                <Image
                  src="https://i.postimg.cc/0jDHqfz9/Blue-Modern-Global-Network-Company-Logo-5.png"
                  height={400}
                  width={400}
                  alt="Beyond the savanah logo"
                  className="object-contain size-32 absolute"
                />
              </Link>
            </NavigationMenuItem>
            <div className="flex items-center gap-4">
              {simpleNavigationMenuItems.map((menuItem) => (
                <NavigationMenuItem key={menuItem.id} className="">
                  <Link href={`${menuItem.link}`}>{menuItem.title}</Link>
                </NavigationMenuItem>
              ))}

              {NonSimpleNavigationMenuItems.map((item) => (
                <NavigationMenuItem key={item.id} className="pr-48">
                  <NavigationMenuTrigger className="text-base relative bg-slate-100">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="">
                    <ul className="grid grid-cols-2 gap-3 p-4 w-[400px] lg:w-[600px]">
                      {item.subLinks.map((sublink) => (
                        <li key={sublink.title}>
                          <Link
                            href={sublink.link}
                            className="hover:border-b-2 border-amber-300 hover:bg-amber-50 px-4 py-2"
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
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </>
  );
}
