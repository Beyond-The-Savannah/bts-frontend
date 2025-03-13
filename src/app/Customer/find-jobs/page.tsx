export const dynamic = 'force-dynamic'; // Add this at the top of your file

import JobsListingByDepartmentCareer from "@/components/Customer/JobsListingByDepartmentCareer";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";

export default async function page() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  return (
    <section className="pt-4 pb-20">
      <div className="c">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>
      <div className="">
        {userSubscriptionInformation?.status != "cancelled" ? (
          <JobsListingByDepartmentCareer />
        ) : null}
      </div>
    </section>
  );
}
