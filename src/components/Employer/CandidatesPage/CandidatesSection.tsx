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

import { Mail, MapPin, PhoneIcon } from "lucide-react";

import Image from "next/image";

export default async function CandidatesSection() {
  const candidates = await GetCandidatesPool();
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-bts-BrownOne rounded-md px-3 py-6 flex justify-between items-center border my-2 "
          >
            <div className="flex flex-1 items-start gap-2">
              {/* <Image
                src={candidate.photoLink ?? "/images/founder loarrine.jpeg"}
                alt="candidates headshot"
                height={50}
                width={50}
                className="bg-center bg-cover bg-no-repeat size-10 rounded-full border-2 border-bts-BrownFive"
              /> */}
              <div className="flex-col">
                <p className="">
                  {candidate.firstName} <span className="px-1"></span>{" "}
                  {candidate.lastName}
                </p>
                <p className="flex items-center gap-2 text-xs ml-2">
                  {candidate.email}
                </p>
                {/* <p className="flex items-center gap-2 text-[0.35rem]">
                  <MapPin size={14} className="" /> {candidate.country}
                </p> */}
              </div>
            </div>
            <p className="w-full flex-1 text-sm font-semibold">
              <span className="font-thin text-xs">Profession :</span>
              {/* {candidate.email} */}
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
                  <DialogTitle className="text-center"></DialogTitle>
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
                      <Image
                        src={
                          candidate.photoLink ?? "/images/founder loarrine.jpeg"
                        }
                        alt="candidates headshot"
                        height={50}
                        width={50}
                        className="bg-center bg-cover bg-no-repeat size-20 rounded-full border-2 border-bts-BrownFive"
                      />
                      <div className="flex-col gap-2">
                        <p className="text-lg font-medium">
                          <span className="text-xs hidden">First Name:</span>
                          {candidate.firstName} {candidate.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="c">
                      <p className="c">
                        <span className="font-thin text-base">
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

                  <div className=" max-w-5xl mx-auto  px-2 py-3 prose prose-sm">
                    <p className="text-center">
                      Resume Name:{candidate.resumeName}
                    </p>
                    <iframe
                      // src={candidate.resumeLink}
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
                        candidate.workExperience as string
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
                        candidate.certifications as string
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
