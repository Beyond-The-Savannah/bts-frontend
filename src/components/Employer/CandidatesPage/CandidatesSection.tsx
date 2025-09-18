import { Button } from "@/components/ui/button";
import { candidatesEntries } from "@/staticData/Employer/entries";


export default function CandidatesSection() {
  return (
    <>
    <div className="max-w-7xl mx-auto px-4">
        {candidatesEntries.map((candidate, index) => (
        <div
          key={index}
          className="flex justify-between items-center border rounded-md px-4 py-2 my-2"
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
          <Button variant="outline"> View Details</Button>
        </div>
      ))}
    </div>
    </>
  )
}
