import CandidatesProfile from "@/components/Customer/CandidatesProfile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GetCandidateBYEmail } from "@/db/queries/employerQuries";
import { correctedParsedHTML } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Mail, MapPin, Pencil, PhoneIcon, UserCircle } from "lucide-react";

export default async function page() {
  const user = await currentUser();

  const candidate = await GetCandidateBYEmail(
    user?.primaryEmailAddress?.emailAddress as string,
  );
  let candidatesResumeLink = "";
  if (candidate[0].resumeLink == null || candidate[0].resumeLink == "") {
    candidatesResumeLink =
      "https://res.cloudinary.com/dh8qlzbzk/image/upload/v1771840409/Missing_Resume_ixxwlh.png";
  } else {
    candidatesResumeLink = candidate[0].resumeLink;
  }

  return (
    <>
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl">Candidates Profile</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2"></p>
        {candidate.length === 0 ? (
          <div className="grid place-content-center h-96">
            <p className="text-center text-lg">No data available</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Pencil />
                    details
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full md:max-w-7xl max-h-[90dvh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Edit Candidate Details
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Editing{" "}
                      <span className="font-bold">
                        {candidate[0].firstName} {candidate[0].lastName}
                      </span>{" "}
                      profile details
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <CandidatesProfile candidateData={candidate[0]} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className=" max-w-5xl mx-auto px-4 py-8 border-2 bg-slate-100 rounded-md my-10">
              <div className="flex items-center justify-between">
                <p className="border rounded-xl px-3 py-1 hidden">
                  Created on {candidate[0].createdAt.toLocaleDateString()}
                </p>
                <p className="border rounded-xl px-3 py-1 hidden">
                  Deadline on {candidate[0].createdAt.toLocaleDateString()}
                </p>
              </div>
              <div className="border-t-2 pt-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <UserCircle size={80} />
                  <div className="flex-col gap-2">
                    <p className="text-lg font-medium">
                      <span className="text-xs hidden">First Name:</span>
                      {candidate[0].firstName} {candidate[0].lastName}
                    </p>
                  </div>
                </div>
                <div className="c">
                  <p className="text-lg font-medium">
                    <span className="font-thin text-sm">Profession :</span>
                    {candidate[0].profession}
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
                    {candidate[0].email}
                  </p>
                  <p className="px-4 py-1 flex items-center gap-1">
                    {" "}
                    <PhoneIcon size={20} className="" />
                    {candidate[0].phone}
                  </p>
                  <p className="px-4 py-1 flex items-center gap-1">
                    {" "}
                    <MapPin size={20} className="" />
                    {candidate[0].country}
                  </p>
                </div>
              </div>

              <p className="border-b-2  underline-offset-1 mt-10">Resume:</p>
              <div className=" max-w-5xl mx-auto  px-2 py-3 prose prose-sm">
                <p className="text-center">
                  Resume Name:
                  {candidate[0].resumeName ?? "No Resume Uploaded"}
                </p>
                {candidate[0].resumeLink !== null ? (
                  <iframe
                    //   src={`${candidate[0].resumeLink}#view=fitH`}
                    src={`${candidatesResumeLink}#view=fitH`}
                    title={candidate[0].resumeName as string}
                    name={candidate[0].resumeName as string}
                    // width={900}
                    // height={900}
                    className="w-full h-[70dvh] mx-auto"
                  />
                ) : (
                  <>
                    <p className="text-center text-sm">No Resume Uploaded</p>
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
                    candidate[0].workExperience as string,
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
                    candidate[0].certifications as string,
                  ),
                }}
              ></div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
