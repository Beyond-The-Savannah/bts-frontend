import UserSubscriptionForm from "@/components/Admin/UserSubscriptionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AddNewUsersPage() {
  return (
    <>
      <section className="px-4">
        <div className="container mx-auto pb-40">
          <Tabs defaultValue="userDetails" className="flex flex-col">
            <TabsList className="w-full md:w-10/12 mx-auto">
              <TabsTrigger value="userDetails">User Details Form</TabsTrigger>
            </TabsList>
            <TabsContent value="userDetails">
              <div className="text-xs p-4 rounded-md border my-4 w-5/12 text-amber-700 bg-slate-200">
                <ul className="list-disc italic">
                  <li>
                    For free users set Subscription Type to "Free" and
                    Subscription Price to "0"
                  </li>
                  <li>For paid users Subscription price has to match the paystack receipt amount</li>
                </ul>
              </div>
              <UserSubscriptionForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
