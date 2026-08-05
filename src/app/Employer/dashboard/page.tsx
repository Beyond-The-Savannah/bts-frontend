import { Suspense } from "react";
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";
import EmployerCheckLoader2 from "@/components/Loaders/EmployerCheckLoader2";
import { auth } from "@clerk/nextjs/server";
import InformationDashboardOverview from "@/components/Employer/InformationDashboardOverview";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";

export default async function page() {
  const { orgId, userId } = await auth();
  const { isValidSubscription, isOrganisationMember } =
    await GetEmployerSubscriprionDetails({
      orgId: orgId as string,
      userId: userId as string,
    });
  return (
    <>
      <Suspense fallback={<EmployerCheckLoader2 />}>
        <section className="px-4">
          {isValidSubscription && isOrganisationMember ? (
            <>
              <InformationDashboardOverview />
            </>
          ) : (
            <>
              <PackagePricingEmployer />
            </>
          )}
        </section>
      </Suspense>
    </>
  );
}
