import {
  Instagram,
  Linkedin,
  MailIcon,
  MapPin,
  Music3Icon,
  PhoneCallIcon,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
  return (
    <>
      <footer className="bg-green-700">
        <div className=" flex flex-wrap justify-center gap-4 px-12 py-24">
          <div className="w-[24%]">
            <p className="text-lg text-amber-300 uppercase font-semibold mb-2">
              BEYOND THE SAVANNAH
            </p>
            <p className="c">
              Seamless connections, soaring carrers, elevate yours with beyond
              the savannah!
            </p>
          </div>
          <div className="w-[24%]">
            <p className="text-lg text-amber-300 uppercase font-semibold mb-2">
              PRODUCTS
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:font-semibold">CV Revamp</Link>
              </li>
              <li>
                <Link href="/" className="hover:font-semibold">Student&apos;s Package Revamp</Link>
              </li>
              <li>
                <Link href="/" className="hover:font-semibold">LinkedIn Optimisation</Link>
              </li>
              <li>
                <Link href="/" className="hover:font-semibold">Coaching Session</Link>
              </li>
              <li>
                <Link href="/" className="hover:font-semibold">Interview Prep</Link>
              </li>
            </ul>
          </div>
          <div className="w-[24%]">
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
          <div className="w-[24%]">
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
            <p className="c">© 2023 Beyond The Savannah. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
