import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { completedInterviews, upComingInterviews } from "@/staticData/JobsPage/entries";
import {google, ics, office365, outlook, yahoo} from "calendar-link"
import { Link } from "next-view-transitions";

export default function Interviews() {
    const currentYear= new Date().getFullYear()
    const event={
        uuid:"",
        title:"",
        description:"",
        start:`${currentYear}`,
    }
    const googleCalendarUrl= google(event)
    const outlookCalendarUrl= outlook(event)
    const office365Url= office365(event)
    const yahooUrl= yahoo(event)
    const icsUrl= ics(event)
  return (
    <>
        <div className="c">
            <Tabs defaultValue="upComing" className="">
                <TabsList className="w-full">
                    <TabsTrigger value="upComing">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="createInterviewEvent">Schedule Interview Event</TabsTrigger>

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
                <TabsContent value="createInterviewEvent">
                    <div className="c">
                        <p className="mb-8">Schedule your sessions with candidates using your prefered calendar below</p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                                            Google Calendar

                                        </a>
                                        </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription></DialogDescription>
                                    </DialogHeader>
                                    <div className="max-w-6xl mx-auto">
                                        
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Button variant="outline" asChild><Link target="_blank" href={outlookCalendarUrl}>Outlook Calendar</Link></Button>
                            <Button variant="outline" asChild><Link target="_blank" href={office365Url}>Office 365 Calendar</Link></Button>
                            <Button variant="outline" asChild><Link target="_blank" href={yahooUrl}>Yahoo Calendar</Link></Button>
                            <Button variant="outline" asChild><Link target="_blank" href={icsUrl}>Apple Calendar</Link></Button>
                        </div>
                    </div>
                </TabsContent>
                
            </Tabs>
        </div>
    </>
  )
}
