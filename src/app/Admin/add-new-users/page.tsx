import UserSubscriptionForm from "@/components/Admin/UserSubscriptionForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
              <Accordion type="multiple" defaultValue={["instrustions1"]} className="bg-slate-100 rounded-md w-5/12 my-4 px-2">
                <AccordionItem value="instrustions1">
                  <AccordionTrigger className="">Form Instrustions</AccordionTrigger>
                  <AccordionContent className="">
                        <div className="text-xs p-4 rounded-md border my-1  text-amber-700 bg-slate-200">
                          <ul className="list-disc italic">
                            <li>
                              For free users set Subscription Type to "Free" and
                              Subscription Price to "0"
                            </li>
                            <li>For paid users Subscription price has to match the paystack receipt amount</li>
                            <li>For Subscription End Date add an additional date</li>
                            
                          </ul>
                        </div>
                    
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <UserSubscriptionForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
