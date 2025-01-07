import { servicesList } from "@/staticData/services";
import {
  Instagram,
  Linkedin,
  MailIcon,
  MapPin,
  Music3Icon,
  PhoneCallIcon,
  YoutubeIcon,
} from "lucide-react";
// import Link from "next/link";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default function FooterSection() {
  return (
    <>
      <footer className="bg-green-950/95">
        <div className=" flex flex-wrap justify-center gap-12 lg:gap-4 px-12 py-24">
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-400 uppercase font-semibold mb-2">
              BEYOND THE SAVANNAH
            </p>
            <p className="text-amber-100">
              Seamless connections, soaring carrers, elevate yours with beyond
              the savannah!
            </p>
            <Link href="/">
              <Image
                src="https://i.postimg.cc/0jDHqfz9/Blue-Modern-Global-Network-Company-Logo-5.png"
                height={400}
                width={400}
                alt="Beyond the savanah logo"
                className="object-cover size-32 rounded-lg my-4"
              />
            </Link>
          </div>
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-400 uppercase font-semibold mb-2">
              SERVICES
            </p>
            <ul className="space-y-2 text-amber-100">
              {servicesList.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/service/${service.titleSlug}`}
                    className="flex hover:scale-105 transition ease-in"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-400 uppercase font-semibold mb-2">
              USEFUL LINKS
            </p>
            <ul className="space-y-2 text-amber-100">
              <li>
                <a
                  href="https://www.tiktok.com/@beyond.the.savannah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:scale-105 transition ease-in"
                >
                  <Music3Icon size={20} className="mr-2" /> Tiktok
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/otienolorraine/?originalSubdomain=ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:scale-105 transition ease-in"
                >
                  <Linkedin size={20} className="mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lorraineotieno/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:scale-105 transition ease-in"
                >
                  <Instagram size={20} className="mr-2" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@beyondthesavannah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:scale-105 transition ease-in"
                >
                  <YoutubeIcon size={20} className="mr-2" /> Youtube
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-400 uppercase font-semibold mb-2">
              CONTACT
            </p>
            <ul className="space-y-2 text-amber-100">
              <li className="flex">
                {" "}
                <MapPin size={20} className="mr-2" /> Nairobi city, Kenya
              </li>
              <li className="flex">
                {" "}
                <MailIcon size={20} className="mr-2" />{" "}
                info@beyondthesavannah.co.ke
              </li>
              <li className="flex">
                {" "}
                <PhoneCallIcon size={20} className="mr-2" /> 0737120764
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-4">
          <p className="text-amber-100">
            &#169; 2025 Beyond The Savannah. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
