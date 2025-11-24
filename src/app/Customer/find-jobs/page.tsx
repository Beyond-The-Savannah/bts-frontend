// export const dynamic = "force-dynamic";

// import PackageOptionSection from "@/components/Customer/PackageOptionSection";
// import Packages from "@/components/Customer/Packages";
import { GetUserSubscriptionInformation, GetUserSubscriptionInformationFromBTSDB } from "@/components/Customer/UserSubscriptionInformation";
import { FindJobs } from "@/components/findJobsPage/FindJobs";
import RemoteJobListingsLoadingUI from "@/components/Loaders/RemoteJobListingsLoadingUI";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const user = await currentUser();

  
  const jobsListingSubscriptionDetails = userSubscriptionInformation?.filter(
    (subscription) =>
      subscription.amount != 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      )
  )[0];

  const validUser=await GetUserSubscriptionInformationFromBTSDB()
  // console.log("BTS USER FROM CUSTOMER FIND-JOBS PAGE",validUser)

  const byPassEmailAddresses = [
    // `teddy254mutinge@gmail.com`,
    // `lizanaropi@gmail.com`,
    // `starmugure@gmail.com`,
    // `fmmusembi96@gmail.com`,
    // `imokolabarbra@gmail.com`,
    `patienceat63@gmail.com`,
    `gitoshmbae@gmail.com`,
  ];

  if (
    (jobsListingSubscriptionDetails == undefined ||
    validUser!=null) &&
    !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
  ) {
    redirect("/Customer");
  }

  // console.log("USER INFO", jobsListingSubscriptionDetails);

  return (
    // <section className="container mx-auto pt-4 pb-20">
    <section className="container mx-auto">
      {/* <div className="pt-28 md:pt-32 pl-0 md:pl-5 mb-10"> */}
      <div className="pt-4 md:pt-0 pl-0 md:pl-5 mb-10">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>
      {/* <div className="-mt-32"> */}
      <div className="">
        {/* {userSubscriptionInformation?.status != "cancelled" && userSubscriptionInformation?.plan.name !="whatsapp community Annually" ? (<FindJobs />) : null} */}
        {user != null ? (
          <>
            {
              jobsListingSubscriptionDetails?.status != "cancelled" &&
              jobsListingSubscriptionDetails?.plan.name !=
                "whatsapp community Annually" ? (
                <Suspense fallback={<RemoteJobListingsLoadingUI />}>
                  <FindJobs />
                </Suspense>
              ) : null
              // (
              //   <>
              //     <div className="grid place-content-center mt-28 min-h-[90dvh]">
              //       {/* <Packages email={user.emailAddresses[0].emailAddress} /> */}
              //     <PackageOptionSection/>
              //     </div>
              //   </>
              // )
            }
          </>
        ) : null}
      </div>
    </section>
  );
}
