import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetCandidatesPool } from "@/db/queries/employerQuries";
import { correctedParsedHTML } from "@/lib/utils";

import { Calendar, Mail, MapPin, PhoneIcon, UserCircle } from "lucide-react";
import { google, office365, outlook, yahoo } from "calendar-link";
import { Link } from "next-view-transitions";

// import Image from "next/image";

export default async function CandidatesSection() {
  const candidates = await GetCandidatesPool();

  const currentYear = new Date().getFullYear();
  const event = {
    uuid: "",
    title: "",
    description: "",
    start: `${currentYear}`,
  };
  
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-bts-BrownOne rounded-md px-3 py-6 flex justify-between items-center border my-2 "
          >
            <div className="flex flex-1 items-start gap-2">
              
              <div className="flex-col">
                <p className="">
                  {candidate.firstName} <span className="px-1"></span>{" "}
                  {candidate.lastName}
                </p>
                <p className="flex items-center gap-2 text-xs ml-2">
                  {candidate.email}
                </p>
                
              </div>
            </div>
            <p className="w-full flex-1 text-sm font-semibold">
              <span className="font-thin text-xs">Profession :</span>
  
              {candidate.profession}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:scale-105 duration-300 transition ease-in"
                >
                  View candidate details
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full md:max-w-[1200px] max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Candidates Profile
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="my-10">
                  <div className="flex items-center justify-between">
                    <p className="border rounded-xl px-3 py-1 hidden">
                      Created on {candidate.createdAt.toLocaleDateString()}
                    </p>
                    <p className="border rounded-xl px-3 py-1 hidden">
                      Deadline on {candidate.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="border-t-2 pt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <UserCircle size={80} />
                      <div className="flex-col gap-2">
                        <p className="text-lg font-medium">
                          <span className="text-xs hidden">First Name:</span>
                          {candidate.firstName} {candidate.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="c">
                      <p className="text-lg font-medium">
                        <span className="font-thin text-sm">Profession :</span>
                        {candidate.profession}
                      </p>
                    </div>
                  </div>
                  <p className="border-b-2  underline-offset-1 mt-10">
                    Contact Details:
                  </p>
                  <div className="my-10 flex items-center justify-between">
                    <div className="flex flex-col gap-2 text-sm">
                      <p className="px-4 py-1 flex items-center gap-1">
                        {" "}
                        <Mail size={20} className="" />
                        {candidate.email}
                      </p>
                      <p className="px-4 py-1 flex items-center gap-1">
                        {" "}
                        <PhoneIcon size={20} className="" />
                        {candidate.phone}
                      </p>
                      <p className="px-4 py-1 flex items-center gap-1">
                        {" "}
                        <MapPin size={20} className="" />
                        {candidate.country}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-lime-200 hover:bg-lime-300 text-black">
                          <Calendar className="mx-1" /> Schedule calendar event
                          with {candidate.firstName}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl mx-auto">
                        <DialogHeader>
                          <DialogTitle></DialogTitle>
                          <DialogDescription className="text-center">
                            Schedule your sessions with the candidate using your
                            prefered calendar below
                          </DialogDescription>
                        </DialogHeader>
                        <div className=" flex flex-wrap items-center justify-center gap-4 my-10">
                        
                          <Button variant="outline" asChild>
                            <Link target="_blank" href={google({...event, guests:[candidate.email],})}>
                              Google Calendar
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link target="_blank" href={outlook({...event, guests:[candidate.email]})}>
                              Outlook Calendar
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link target="_blank" href={office365({...event, guests:[candidate.email]})}>
                              Office 365 Calendar
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link target="_blank" href={yahoo({...event, guests:[candidate.email]})}>
                              Yahoo Calendar
                            </Link>
                          </Button>
                          
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

<p className="border-b-2  underline-offset-1 mt-10">
                  Resume:
                  </p>
                  <div className=" max-w-5xl mx-auto  px-2 py-3 prose prose-sm">
                    <p className="text-center">
                      Resume Name:{candidate.resumeName}
                    </p>
                    <iframe
                      
                      src={`${candidate.resumeLink}#view=fitH`}
                      title={candidate.resumeName}
                      name={candidate.resumeName}
                      width={900}
                      height={900}
                    />
                  </div>
                  <p className="border-b-2  underline-offset-1 mt-10">
                    Career Experience:
                  </p>
                  <div
                    className="my-10 prose prose-sm md:prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: correctedParsedHTML(
                        candidate.workExperience as string,
                      ),
                    }}
                  ></div>
                  <p className="border-b-2  underline-offset-1 mt-10">
                    Certifications:
                  </p>
                  <div
                    className="my-10 prose prose-sm md:prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: correctedParsedHTML(
                        candidate.certifications as string,
                      ),
                    }}
                  ></div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
}
