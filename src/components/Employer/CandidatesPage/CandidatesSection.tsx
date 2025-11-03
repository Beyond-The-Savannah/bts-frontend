import { Button } from "@/components/ui/button";
// import { candidatesEntries } from "@/staticData/Employer/entries";
import { SubscribedUserProp } from "@/types/subscribedUser";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { Link } from "next-view-transitions";


const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export default async function CandidatesSection() {
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const existingUsers: SubscribedUserProp[] = await response.data;
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {/* {candidatesEntries.map((candidate, index) => (
          <div
            key={index}
            className="flex justify-between items-center border rounded-md px-4 py-2 my-2 bg-slate-100 odd:bg-slate-200"
          >
            <div className="flex flex-col">
              <p className="c">{candidate.fullName}</p>
            </div>
            <p className="text-xs">
              <span className="c">Phone</span>{" "}
              <span className="font-semibold">{candidate.phone}</span>
            </p>
            <p className="text-xs">
              <span className="c">Email</span>{" "}
              <span className="font-semibold">{candidate.email}</span>
            </p>
            <Button variant="outline" asChild>
              <Link href={`/Employer/candidates/${candidate.fullName}`}>
                View Details
              </Link>
            </Button>
          </div>
        ))} */}
        {existingUsers.map((candidate) => (
          <div
            key={candidate.id}
            className="flex justify-between items-center border rounded-md px-4 py-2 my-2 bg-slate-100 odd:bg-slate-200"
          >
            <div className="flex flex-col space-y-2">
              <p className="c">{candidate.firstName} <span className="px-2"></span> {candidate.lastName}</p>
              <span className="text-xs font-semibold">{candidate.email}</span>
            </div>
            {/* <p className="text-xs">
              <span className="c">Phone</span>{" "}
              <span className="font-semibold">{candidate.phoneNumber}</span>
            </p>
            <p className="text-xs">
              <span className="c">Career</span>{" "}
              <span className="font-semibold">{candidate.career}</span>
            </p> */}
           
            {/* <p className="text-xs text-start">
              <span className="c">Email</span>{" "}
              <span className="font-semibold">{candidate.email}</span>
            </p> */}
             <p className="text-xs flex gap-4 items-center">
              <span className="c"></span>{" "}
              {candidate.imageUrl!='' && (<>
                <span className="font-semibold">{candidate.attachmentName}</span>
                <span className="font-semibold"><CheckCircle size={12}/></span>
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
