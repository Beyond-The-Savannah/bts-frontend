"use client";

import { CandidateProp } from "@/db/schema";
import { Virtuoso } from "react-virtuoso";
import { Button } from "@/components/ui/button";
import { google, office365, outlook, yahoo } from "calendar-link";
import { Link } from "next-view-transitions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Calendar,
  Linkedin,
  Mail,
  MapPin,
  PhoneIcon,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import { correctedParsedHTML } from "@/lib/utils";

export default function VirtualizedEmployerCandidateList({
  candidates,
}: {
  candidates: CandidateProp[];
}) {
  const currentYear = new Date().getFullYear();
  const event = {
    uuid: "",
    title: "",
    description: "",
    start: `${currentYear}`,
  };
  return (
    <>
      <Virtuoso
        className="h-[75dvh]! max-w-7xl mx-auto mt-4"
        data={candidates}
        totalCount={candidates.length}
        itemContent={(_, candidate) => (
          <>
            <div className="bg-bts-BrownOne/20 hover:bg-bts-BrownOne/40 hover:transition-colors  rounded-md w-11/12 mx-auto px-3 py-6 flex justify-between items-center border my-2 ">
              <div className="flex flex-1 items-start gap-2">
                <div className="flex-col">
                  <p className="">
                    {/* {candidate.firstName} <span className="px-1"></span>{" "}
                    {candidate.lastName} */}
                    <span className="flex items-center gap-2 text-xs ">
                      Name:
                    </span>
                    {candidate.firstName} <span className="px-1"></span>{" "}
                    {candidate.lastName}
                  </p>
                </div>
              </div>
              <p className="w-full flex-1 flex-col text-sm font-semibold ">
                <span className="block font-thin text-xs ">Profession :</span>

                {candidate.profession}
              </p>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="hover:scale-105 duration-300 transition ease-in"
                    >
                      View candidate details
                      {/* <Eye /> details */}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full md:max-w-300 max-h-[90dvh] overflow-y-auto">
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
                          {candidate.photoLink !== null &&
                          candidate.photoLink !== "" ? (
                            <>
                              <Image
                                src={candidate.photoLink}
                                alt="candidates head shot image"
                                height={160}
                                width={160}
                                className="rounded-full bg-center bg-cover size-36 border border-bts-BrownFive"
                              />
                            </>
                          ) : (
                            <>
                              <UserCircle size={80} />
                            </>
                          )}
                          <div className="flex-col gap-2">
                            <p className="text-lg font-medium">
                              <span className="text-xs hidden">
                                First Name:
                              </span>
                              {candidate.firstName} {candidate.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="c">
                          <p className="text-lg font-medium">
                            <span className="font-thin text-sm">
                              Profession :
                            </span>
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
                            <Linkedin size={20} className="" />
                            <a
                              href={`$candidate.linkedInLink`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {candidate.linkedInLink ?? "No LinkedIn profile"}
                            </a>
                          </p>
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
                              <Calendar className="mx-1" /> Schedule calendar
                              event with {candidate.firstName}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl mx-auto">
                            <DialogHeader>
                              <DialogTitle></DialogTitle>
                              <DialogDescription className="text-center">
                                Schedule your sessions with the candidate using
                                your prefered calendar below
                              </DialogDescription>
                            </DialogHeader>
                            <div className=" flex flex-wrap items-center justify-center gap-4 my-10">
                              <Button variant="outline" asChild>
                                <Link
                                  target="_blank"
                                  href={google({
                                    ...event,
                                    guests: [candidate.email],
                                  })}
                                >
                                  Google Calendar
                                </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link
                                  target="_blank"
                                  href={outlook({
                                    ...event,
                                    guests: [candidate.email],
                                  })}
                                >
                                  Outlook Calendar
                                </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link
                                  target="_blank"
                                  href={office365({
                                    ...event,
                                    guests: [candidate.email],
                                  })}
                                >
                                  Office 365 Calendar
                                </Link>
                              </Button>
                              <Button variant="outline" asChild>
                                <Link
                                  target="_blank"
                                  href={yahoo({
                                    ...event,
                                    guests: [candidate.email],
                                  })}
                                >
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
                          Resume Name:
                          {candidate.resumeName ?? "No Resume Uploaded"}
                        </p>
                        {candidate.resumeLink !== "" ? (
                          <iframe
                            src={`${candidate.resumeLink}#view=fitH`}
                            title={candidate.resumeName as string}
                            name={candidate.resumeName as string}
                            // width={900}
                            // height={900}
                            className="w-full h-[70dvh] mx-auto"
                          />
                        ) : (
                          <>
                            <iframe
                              src={`https://res.cloudinary.com/dh8qlzbzk/image/upload/v1771840409/Missing_Resume_ixxwlh.png`}
                              title={candidate.resumeName as string}
                              name={candidate.resumeName as string}
                              // width={900}
                              // height={900}
                              className="w-full h-[70dvh] mx-auto"
                            />
                          </>
                        )}
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
            </div>
          </>
        )}
      />
    </>
  );
}
