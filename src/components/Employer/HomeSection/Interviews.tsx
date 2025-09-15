import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


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
                    {[1,2,3,4,5].map((_,index)=>(
                        <div key={index} className="flex justify-between items-center gap-8 border rounded-md px-4 py-2 my-2">
                            <div className="flex flex-col gap-4">
                                <p className="c">juma@mail.com</p>
                                <p className="text-xs">For <span className="font-semibold">Work Manager</span></p>
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold">AT 10.30 AM</p>
                            </div>
                        </div>
                    ))}
                </TabsContent>
                <TabsContent value="completed">
                    {[1,2,3,4,5].map((_,index)=>(
                        <div key={index} className="flex justify-between items-center gap-8 border rounded-md px-4 py-2 my-2">
                            <div className="flex flex-col gap-4">
                                <p className="c">bakari@mail.com</p>
                                <p className="text-xs">For <span className="font-semibold">Work Manager</span></p>
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold">AT 9.00 AM</p>
                            </div>
                        </div>
                    ))}
                </TabsContent>
                
            </Tabs>
        </div>
    </>
  )
}
