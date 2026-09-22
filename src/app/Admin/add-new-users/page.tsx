import UserSubscriptionForm from "@/components/Admin/UserSubscriptionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function AddNewUsersPage() {
  return (
    <>
    <section className="px-4">
        <div className="container mx-auto pb-20">
            <Tabs defaultValue="userDetails" className="flex flex-col">
                <TabsList className="w-full md:w-10/12 mx-auto">
                    <TabsTrigger value="userDetails">User Details</TabsTrigger>
                    <TabsTrigger value="accountDetails">Account Details</TabsTrigger>
                    <TabsTrigger value="candidateDetails">user-Candidate Details</TabsTrigger>
                    <TabsTrigger value="subcriptionDetails">Subscription Details</TabsTrigger>
                </TabsList>
                <TabsContent value="userDetails">
                    <p className="font-semibold italic mb-10">user Details</p>
                    <UserSubscriptionForm/>
                </TabsContent>
                <TabsContent value="accountDetails">
                    <p className="font-semibold italic">account Details</p>
                </TabsContent>
                <TabsContent value="candidateDetails">
                    <p className="font-semibold italic">user-candidate Details</p>
                </TabsContent>
                <TabsContent value="subcriptionDetails">
                    <p className="font-semibold italic">subcription Details</p>
                </TabsContent>
            </Tabs>
        </div>
    </section>
    </>
  )
}
