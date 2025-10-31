import ResumeDisplay from "@/components/Employer/CandidatesPage/ResumeDisplay";
import { SubscribedUserProp } from "@/types/subscribedUser";
import axios from "axios";
import { UserCircle2 } from "lucide-react";




const BTS_API_URL = process.env.NEXT_PUBLIC_DB_BASE_URL;

export default async function Page({params}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;
  // const candidatesName = decodeURIComponent(id);
  const response = await axios.get(`${BTS_API_URL}/api/BydUsers/getAllUsers`);
  const existingUsers: SubscribedUserProp[] = await response.data;
  const candidate= existingUsers.find((user)=>(user.id==parseInt(id)))
  return (
    <>
      <section className="container mx-auto">
        <div className="px-4">
          <h2 className="text-3xl font-semibold mb-10">
            Candidates Profile Details
          </h2>
        </div>
        <div className="py-12 px-4 rounded-lg bg-slate-100/50">
          <div className="w-4/12 flex gap-3 bg-slate-200/80 px-4 py-8 rounded-lg">
            <div className="c">
              <UserCircle2 size={64} />
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="text-lg">{candidate?.firstName} {candidate?.lastName}</p>
              <p className="text-2xl font-semibold">{candidate?.career}</p>
            </div>
          </div>
          <div className="py-10">
            <div className="bg-slate-200/40 py-8 px-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-10">Candidates Resume</h2>
              {candidate?.imageUrl !=undefined && ( <ResumeDisplay url={candidate.imageUrl}/>)}
            </div>
          </div>
          <div className="py-10">
            <div className="bg-slate-200/40 py-8 px-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-10">
                Candidates Contact Details
              </h2>
              <div className="space-y-4">
                <p className="c">
                  <span>Email:</span>{candidate?.email}
                </p>
                <p className="c">
                  <span>Phone:</span>{candidate?.phoneNumber}
                </p>
                <p className="c">
                  <span>LinkedIn:</span>linkedIn/link/profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
