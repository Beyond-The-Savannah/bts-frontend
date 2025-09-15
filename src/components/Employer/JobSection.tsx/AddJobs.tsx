import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function AddJobs() {
  return (
    <>
        <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="addJob1">
                <TabsList className="w-full">
                    <TabsTrigger value="addJob1">Add Job Openning</TabsTrigger>
                </TabsList>
                <TabsContent value="addJob1">
                    <div className="flex items-center gap-8 my-10">
                        <div className="flex-1">
                            <Label htmlFor="role">Role</Label>
                            <Input type="text" id="role" name="role" />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="location">Location</Label>
                            <Input type="text" id="location" name="location" />
                        </div>
                    </div>
                    <div className="flex items-center gap-8 my-10">
                        <div className="flex-1">
                            <Label htmlFor="department">Department</Label>
                            <Input type="text" id="department" name="department" />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="company">Company</Label>
                            <Input type="text" id="company" name="company" />
                        </div>
                    </div>
                    <div className="flex items-center gap-8 my-10">
                        <div className="flex-1">
                            <Label htmlFor="createdDate">CreatedDate</Label>
                            <Input type="text" id="createdDate" name="createdDate" />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="deadline">Deadline</Label>
                            <Input type="text" id="deadline" name="deadline" />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </>
  )
}
