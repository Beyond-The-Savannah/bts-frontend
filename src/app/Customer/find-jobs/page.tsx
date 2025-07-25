export const dynamic = "force-dynamic";

import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import { FindJobs } from "@/components/findJobsPage/FindJobs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const user = await currentUser();

  const byPassEmailAddresses = [
    `ayuny.farah@gmail.com`,
    `wambui4wachira@gmail.com`,
    `jacklinewaceke199@gmail.com`,
    `dmuthoni487@gmail.com`,
    `marynicholas777@gmail.com`,
    `tracygwangui@gmail.com`,
    `dianacheserem@gmail.com`,
    `kinyachiokz@gmail.com`,
    `onyango.mary15@gmail.com`,
    `sonimuthoni23@gmail.com`,
  ];

  if (
    (userSubscriptionInformation == null ||
      userSubscriptionInformation == undefined) &&
    !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
    // byPassEmailAddress != user?.emailAddresses[0].emailAddress
  ) {
    redirect("/Customer");
  }

  // console.log("USER INFO", userSubscriptionInformation);

  return (
    <section className="pt-4 pb-20">
      <div className="hidden">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>
      <div className="-mt-32">
        {userSubscriptionInformation?.status != "cancelled" ? (
          // <JobsListingByDepartmentCareer />
          <FindJobs />
        ) : null}
      </div>
    </section>
  );
}
