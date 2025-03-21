import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import WhatsappSubscriptionService from "@/components/Customer/WhatsappSubscriptionService";
import { currentUser } from "@clerk/nextjs/server";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function page(props: { searchParams: SearchParams }) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress as string;
  const searcHParams = await props.searchParams;
  

  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  return (
    <>
      {searcHParams.source == "whatsapp-service" ? (
        <>
          {/* <p>{JSON.stringify(searcHParams)}</p>
          <p>{searcHParams.source}</p>
          <p className="text-3xl">WhatsApp Service Please</p> */}
          <div className=" w-full xl:w-[75vw] space-y-6 mx-auto flex flex-col justify-center bg-purple-3000 py-10">
            <div className="text-center space-y-6">
              <p className="text-2xl md:text-3xl font-semibold">
                Beyond the Savannah WhatsApp Community{" "}
              </p>
              <p className="c max-w-2xl mx-auto">
                Struggling to navigate the tough job market? You&apos;re not
                alone. Join our exclusive paid WhatsApp community—a safe space
                for job seekers and professionals looking for support,
                motivation, and expert guidance on securing remote jobs.
              </p>
            </div>
            {userSubscriptionInformation == null ||
            userSubscriptionInformation.status == "cancelled" ? (
              <div className="max-w-lg mx-auto">
                <WhatsappSubscriptionService email={userEmail} />
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <SubscriptionDetails  source={searcHParams.source}/>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
