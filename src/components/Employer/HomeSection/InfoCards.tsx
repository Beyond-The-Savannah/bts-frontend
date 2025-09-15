import { Bookmark, FileStackIcon, Users } from "lucide-react"


export default function InfoCards() {
  return (
    <>
    <div className="container mx-auto">
        <div className="flex flex-1 justify-center items-center gap-8">
            <div className=" flex items-center gap-4 border rounded-lg px-4 py-2">
                <FileStackIcon/>
                <div className="flex justify-center items-center gap-8">
                    <p className="text-2xl">07</p>
                    <p className="c">Posted Jobs</p>
                </div>
            </div>
            <div className="flex items-center gap-4 border rounded-lg px-4 py-2">
                <Users/>
                <div className="flex justify-center items-center gap-8">
                    <p className="text-2xl">07</p>
                    <p className="c"> Applicants</p>
                </div>
            </div>
            <div className="flex items-center gap-4 border rounded-lg px-4 py-2">
                <Bookmark/>
                <div className="flex justify-center items-center gap-8">
                    <p className="text-2xl">02</p>
                    <p className="c">Shortlisted Canidates</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
