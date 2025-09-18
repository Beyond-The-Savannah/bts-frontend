import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completedInterviews, upComingInterviews } from "@/staticData/JobsPage/entries";


export default function Interviews() {
  return (
    <>
        <div className="c">
            <Tabs defaultValue="upComing" className="">
                <TabsList className="w-full">
                    <TabsTrigger value="upComing">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="upComing">
                    {upComingInterviews.map((interview,index)=>(
                        <div key={index} className="flex justify-between items-center gap-8 border rounded-md px-4 py-2 my-2">
                            <div className="flex flex-col gap-4">
                                <p className="c">{interview.fullName}</p>
                                <p className="text-xs"> <span className="font-semibold">{interview.email}</span></p>
                            </div>
                            <div className="c">
                                <p className="text- font-light"><span className="">{interview.jobName}</span></p>
                            </div>
                            <div className="text-sm flex flex-col  gap-1">
                                <p className="">{interview.date}</p>
                                <p className="font-semibold">{interview.time}</p>
                            </div>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="completed">
                    {completedInterviews.map((interview,index)=>(
                      <div key={index} className="flex justify-between items-center gap-8 border rounded-md px-4 py-2 my-2">
                            <div className="flex flex-col gap-4">
                                <p className="c">{interview.fullName}</p>
                                <p className="text-xs"> <span className="font-semibold">{interview.email}</span></p>
                            </div>
                            <div className="c">
                                <p className="text- font-light"><span className="">{interview.jobName}</span></p>
                            </div>
                            <div className="text-sm flex flex-col  gap-1">
                                <p className="">{interview.date}</p>
                                <p className="font-semibold">{interview.time}</p>
                            </div>
                        </div>
                    ))}
                </TabsContent>
                
            </Tabs>
        </div>
    </>
  )
}
