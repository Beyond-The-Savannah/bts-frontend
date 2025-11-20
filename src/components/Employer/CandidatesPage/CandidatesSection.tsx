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
// import { candidatesEntries } from "@/staticData/Employer/entries";
import { SubscribedUserProp } from "@/types/subscribedUser";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { Link } from "next-view-transitions";

const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export default async function CandidatesSection() {
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const existingUsers: SubscribedUserProp[] = await response.data;
  const candidates = await GetCandidatesPool();
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-bts-BrownOne rounded-md px-3 py-6 flex justify-between items-center border my-2 "
          >
            <p className="w-full flex-1">
              {candidate.firstName} <span className="px-2"></span>{" "}
              {candidate.lastName}
            </p>
            <p className="w-full flex-1 text-xs font-semibold">
              {/* {candidate.email} */}
              {candidate.profession}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View candidate details</Button>
              </DialogTrigger>
              <DialogContent className="w-full md:max-w-[1200px] max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    {" "}
                    <span className="font-thin text-base">
                      Profession :
                    </span>{" "}
                    {candidate.profession}
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="my-10">
                  <div className="flex items-center justify-between">
                    <p className="border rounded-xl px-3 py-1">
                      Created on {candidate.createdAt.toLocaleDateString()}
                    </p>
                    <p className="border rounded-xl px-3 py-1 hidden">
                      Deadline on {candidate.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="my-10 flex items-center justify-between">
                    <p className="c">First Name:{candidate.firstName}</p>
                    <p className="c">Last Name:{candidate.lastName}</p>
                    <p className="c">Email Address:{candidate.email}</p>
                    <p className="c">Phone Number:{candidate.phone}</p>
                    <p className="c">Country:{candidate.country}</p>
                  </div>
                  <div className=" max-w-5xl mx-auto  px-2 py-3 prose prose-sm">
                    <p className="c">Resume Name:{candidate.resumeName}</p>
                    <iframe
                      src={candidate.resumeLink}
                      title={candidate.resumeName}
                      width={900}
                      height={900}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}

        {existingUsers.map((candidate) => (
          <div
            key={candidate.id}
            className="flex justify-between items-center border rounded-md px-4 py-2 my-2 bg-slate-100 odd:bg-slate-200"
          >
            <div className="flex flex-col space-y-2">
              <p className="c">
                {candidate.firstName} <span className="px-2"></span>{" "}
                {candidate.lastName}
              </p>
              <span className="text-xs font-semibold">{candidate.email}</span>
            </div>
            <p className="text-xs flex gap-4 items-center">
              <span className="c"></span>{" "}
              {candidate.imageUrl != "" && (
                <>
                  <span className="font-semibold">
                    {candidate.attachmentName}
                  </span>
                  <span className="font-semibold">
                    <CheckCircle size={12} />
                  </span>
                </>
              )}
            </p>
            <Button variant="outline" asChild>
              <Link href={`/Employer/candidates/${candidate.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
