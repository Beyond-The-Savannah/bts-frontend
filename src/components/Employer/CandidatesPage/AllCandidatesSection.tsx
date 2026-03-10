import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import {
  GetCandidatesPool,
  GetEmployerJobsDepartmentOnly,
} from "@/db/queries/employerQuries";
import { correctedParsedHTML } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { google, office365, outlook, yahoo } from "calendar-link";
import { Calendar, Mail, MapPin, PhoneIcon, UserCircle, UsersIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default async function AllCandidatesSection() {
  const { orgId } = await auth();

  const allJobsByEmployer = await GetEmployerJobsDepartmentOnly(orgId!);
  const uniqueDepartments = [
    ...new Set(allJobsByEmployer.map((job) => job.department)),
  ];
  // console.log("ALL CANDIATES PAGE SECTION",allJobsByEmployer,uniqueDepartments)
  const allCanidates = await GetCandidatesPool();
  const relavantCandidates = allCanidates.filter((candidate) =>
    uniqueDepartments.includes(candidate.profession as string),
  );

  // console.log("RELEVANT CANDIDATES",relavantCandidates)
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
        {relavantCandidates.length === 0 ? (
          <>
          <Empty className="border border-dotted w-6/12 mx-auto mt-40">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon  className="text-orange-400"/>
              </EmptyMedia>
              <EmptyTitle>No potential candidates found</EmptyTitle>
              <EmptyDescription className="w-full lg:w-[48dvw]">
                Once you have job openings added in your organization, candidates will appear here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent></EmptyContent>
          </Empty>
        </>
        ) : (
          <>
            {relavantCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-bts-BrownOne/25 rounded-md px-3 py-6 flex justify-between items-center  my-2 "
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
                          Resume Name:{candidate.resumeName}
                        </p>
                        <iframe
                          src={`${candidate.resumeLink}#view=fitH`}
                          title={candidate.resumeName as string}
                          name={candidate.resumeName as string}
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
          </>
        )}
      </div>
    </>
  );
}
