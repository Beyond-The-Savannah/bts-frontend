import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import InformationDashboardOverview from "@/components/Employer/InformationDashboardOverview";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { OrganizationSwitcher, SignIn, SignInButton } from "@clerk/nextjs";
import { auth,} from "@clerk/nextjs/server";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default async function page() {
  const { isAuthenticated, orgId, } = await auth();
  

  // console.log("ORG DETAILS IN EMPLOYER PAGE", organization);

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
        <Suspense
          fallback={
            <div className="grid place-content-center min-h-[80dvh] max-w-xl mx-auto ">
              <p className="border-2 px-4 py-12 rounded-md text-center text-sm flex items-center gap-2">
                <Loader className="mx-auto animate-spin" />
                <span>
                  Please wait as we verify your organization details...
                </span>
              </p>
            </div>
          }
        >
          <div className="grid place-content-center min-h-[80dvh]">
            <div className="px-4 py-8 max-w-xl mx-auto border rounded-md">
              <p className="text-center my-10">
                Please create your organization or login to an invited one
              </p>
              <div className="grid place-content-center">
                <OrganizationSwitcher hidePersonal={true} />
              </div>
            </div>
          </div>
        </Suspense>
      </>
    );
  }

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

    // const isOrganisationMemmber=
  return (
    <>
      <Suspense
        fallback={
          <div className="grid place-content-center min-h-[80dvh] max-w-xl mx-auto ">
            <p className="border-2 px-4 py-12 rounded-md text-center text-sm flex items-center gap-2">
              <Loader className="mx-auto animate-spin" />
              <span>Please wait as we verify your subscription status...</span>
            </p>
          </div>
        }
      >
        <section className="px-4">
          {isValidSubscription || orgId!=null ? (
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
