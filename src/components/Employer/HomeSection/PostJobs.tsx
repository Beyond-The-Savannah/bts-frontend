import { Button } from "@/components/ui/button";


export default function PostJobs() {
  return (
    <div className="container mt-20 mx-auto">
        
        {[1,2,3,4,5].map((_,index)=>(
        <div key={index} className="flex justify-between items-center border rounded-md px-4 py-2 my-2">
            <div className="flex flex-col">
                <p className="c">WorkShop Manger</p>
                <p className="text-xs">location</p>
                <p className="flex justify-center items-center gap-4 text-xs"> <span className="c">Created on: 20 june 2025</span> <span className="c">Expires on: 20 july 2025</span></p>
            </div>
            <Button variant="outline"> View Applicants</Button>
        </div>

        ))}
    </div>
  )
}
