import JobsListingByDepartmentCareer from "@/components/Customer/JobsListingByDepartmentCareer";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
// import { LucideFileWarning } from "lucide-react";

export default async function page() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  // const selectedCareerDepartmentValue = localStorage.getItem(
  //   "CareerDeparmentValue"
  // );
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
        {userSubscriptionInformation.status != "cancelled" ? (
          <>
            {/* {selectedCareerDepartmentValue ? ( */}
              <JobsListingByDepartmentCareer />
            {/* ) : (
              <>
                <div className="bg-yellow-200 rounded-lg">
                  <LucideFileWarning />
                  <p>Please select your carrer in door to view a job</p>
                </div>
              </>
            )} */}
          </>
        ) : null}
      </div>
    </section>
  );
}
