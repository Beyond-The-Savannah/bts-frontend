"use client";

import { Virtuoso } from "react-virtuoso";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { correctedParsedHTML } from "@/lib/utils";
import {
  Eye,
  Linkedin,
  Mail,
  MapPin,
  Pencil,
  PhoneIcon,
  Trash2,
  UserCircle,
} from "lucide-react";
import CandidatesProfile from "@/components/Customer/CandidatesProfile";
import { Input } from "@/components/ui/input";
import { CandidateProp } from "@/db/schema";
import { useState } from "react";
// import { toast } from "sonner";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import { toast } from "sonner";
import { DeleteCandidateProfile } from "@/app/actions/EmployerForms";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import CandidateInvite from "./CandidateInvite";
import Image from "next/image";

export default function VirtualBtsCandidatesList({
  candidates,
}: {
  candidates: CandidateProp[];
}) {
  const [searchEmail, setSearchEmail] = useState("");
  const debouncedSearchEmail = useDebounceSearch(searchEmail, 500);
  const router = useRouter();
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.email.toLowerCase().includes(debouncedSearchEmail.toLowerCase()),
  );
  async function handleCandidateRemoval(candidateId: string) {
    const deletedInfo = await DeleteCandidateProfile(candidateId);

    if (deletedInfo != undefined && deletedInfo.length > 0) {
      toast.success(`Deleted candidate:  ${deletedInfo[0].deletedCandidateId}`);
      router.refresh();
    }
  }

  return (
    <>
      {/* <div>VirtualBtsCandidatesList</div> */}
      <div className="flex items-center justify-between ">
        <div className="w-4/12 mb-5">
          <Input
            type="text"
            placeholder="search by candidate's email"
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          {/* <CandidateInvite candidates={candidates}/> */}
          <CandidateInvite />
          <div className="border rounded-xl px-3 py-1">
            Total Candidates:{" "}
            <span className="font-bold">{candidates.length}</span>
          </div>
        </div>
      </div>

      <Virtuoso
        className="h-[75dvh]! max-w-7xl mx-auto mt-4"
        data={searchEmail != "" ? filteredCandidates : candidates}
        totalCount={candidates.length}
        itemContent={(_, candidate) => (
          <>
            <div className="bg-bts-BrownOne/20 hover:bg-bts-BrownOne/40 hover:transition-colors  rounded-md w-11/12 mx-auto px-3 py-6 flex justify-between items-center border my-2 ">
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
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="hover:scale-105 duration-300 transition ease-in"
                    >
                      <Eye /> details
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
                            <a href={`$candidate.linkedInLink`} target="_blank" rel="noopener noreferrer">{candidate.linkedInLink}</a>
                            
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

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      {" "}
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
                          {candidate.firstName} {candidate.lastName}
                        </span>{" "}
                        profile details
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <CandidatesProfile candidateData={candidate} />
                    </div>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Trash2 className="text-red-400" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center hidden">
                        Delete Candidates Details
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        Deleting{" "}
                        <span className="font-bold">
                          {candidate.firstName} {candidate.lastName}
                        </span>{" "}
                        profile details
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="w-6/12 mx-auto flex justify-center items-center gap-4">
                      <AlertDialogCancel asChild>
                        <Button variant="outline">Close</Button>
                      </AlertDialogCancel>
                      <AlertDialogAction
                        asChild
                        className="bg-red-400 hover:bg-red-500"
                      >
                        <Button
                          variant="destructive"
                          onClick={() => handleCandidateRemoval(candidate.id)}
                        >
                          Delete Details
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </>
        )}
      />
    </>
  );
}
