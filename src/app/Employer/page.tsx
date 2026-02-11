import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import InformationDashboardOverview from "@/components/Employer/InformationDashboardOverview";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";
import EmployerCheckLoader from "@/components/Loaders/EmployerCheckLoader";

import EmployerCheckLoader2 from "@/components/Loaders/EmployerCheckLoader2";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { OrganizationSwitcher, SignIn, SignInButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { Suspense } from "react";

export default async function page() {
  const { isAuthenticated, orgId,userId } = await auth();
  const client=await clerkClient()
  

  if (!isAuthenticated) {
    return (
      <div className="grid place-content-center mt-40 h-96">
        <SignInButton>
          <SignIn
            fallbackRedirectUrl={
              process.env
                .NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL_EMPLOYER_ROUTE
            }
            signUpFallbackRedirectUrl={
              process.env
                .NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL_EMPLOYER_ROUTE
            }
            routing="hash"
          />
        </SignInButton>
      </div>
    );
  }

  if (!orgId) {
    return (
      <>
        <Suspense fallback={<EmployerCheckLoader />}>
          <div className="grid place-content-center min-h-[80dvh]">
            <div className="px-4 py-8 max-w-xl mx-auto border text-center rounded-md space-y-3">
              {/* <p className="text-center my-10">
                Please create your organization or login to an invited one
              </p> */}
                <p className="c">Hi there, welcome onboard.</p>
                <p className="c">We&apos;ve noticed that you haven&apos;t created any organization yet.</p>
                <p className="c">Please create an organization to continue using the button below.</p>
                <p className="c">If you got an invite then join the organization using button below.</p>
              <div className="grid place-content-center">
                <OrganizationSwitcher hidePersonal={true} />
              </div>
            </div>
          </div>
        </Suspense>
      </>
    );
  }

  //Check if the user is a member of the organization
  const {data:organisationMemmbers}= await client.organizations.getOrganizationMembershipList({
    organizationId: orgId!,
    })
    // console.log("ORGANISATION MEMBERS:", organisationMemmbers);

    const isOrganisationMember=organisationMemmbers.some(member=>member.publicUserData?.userId===userId)

    //check for valid subscription
  const employerSubscriptionDetails: subscriptionDetailsProps[] =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  // console.log("EMPLOYER SUBSCRIPTION DETAILS:", employerSubscriptionDetails);
  const isValidSubscription = employerSubscriptionDetails
    ?.filter((subscriptionOne) => subscriptionOne.amount === 300000)
    .some((subscription) => {
      return ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase(),
      );
    });

  

  return (
    <>
      <Suspense fallback={<EmployerCheckLoader2 />}>
        <section className="px-4">
          {isValidSubscription || isOrganisationMember ? (
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
