import { Suspense } from "react";
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";
import EmployerCheckLoader2 from "@/components/Loaders/EmployerCheckLoader2";
import { auth } from "@clerk/nextjs/server";
import InformationDashboardOverview from "@/components/Employer/InformationDashboardOverview";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

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
