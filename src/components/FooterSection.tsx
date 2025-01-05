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

export default function FooterSection() {
  return (
    <>
      <footer className="bg-green-700">
        <div className=" flex flex-wrap justify-center gap-12 lg:gap-4 px-12 py-24">
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-300 uppercase font-semibold mb-2">
              BEYOND THE SAVANNAH
            </p>
            <p className="c">
              Seamless connections, soaring carrers, elevate yours with beyond
              the savannah!
            </p>
          </div>
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-300 uppercase font-semibold mb-2">
              SERVICES
            </p>
            <ul className="space-y-2">
              {servicesList.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/service/${service.titleSlug}`}
                    className="hover:font-semibold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
  
            </ul>
          </div>
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-300 uppercase font-semibold mb-2">
              USEFUL LINKS
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.tiktok.com/@beyond.the.savannah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:font-semibold"
                >
                  <Music3Icon size={20} className="mr-2" /> Tiktok
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/otienolorraine/?originalSubdomain=ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:font-semibold"
                >
                  <Linkedin size={20} className="mr-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/lorraineotieno/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:font-semibold"
                >
                  <Instagram size={20} className="mr-2" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@beyondthesavannah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex hover:font-semibold"
                >
                  <YoutubeIcon size={20} className="mr-2" /> Youtube
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-56 lg:w-[24%]">
            <p className="text-lg text-amber-300 uppercase font-semibold mb-2">
              CONTACT
            </p>
            <ul className="space-y-2">
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
          <p className="c">
            &#169; 2025 Beyond The Savannah. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
