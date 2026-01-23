import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import InformationDashboardOverview from "@/components/Employer/InformationDashboardOverview";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { subscriptionDetailsProps } from "@/types/subscriptions";
import { OrganizationSwitcher, SignIn, SignInButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { CircleCheckBig } from "lucide-react";

export default async function page() {
  const { isAuthenticated, orgId, orgRole } = await auth();

  if (!isAuthenticated) {
    return (
      <div className="grid place-content-center mt-40 h-96">
        <SignInButton>
          <SignIn />
        </SignInButton>
      </div>
    );
  }

  if (!orgId) {
    return (
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
    );
  }
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });

  const employerSubscriptionDetails: subscriptionDetailsProps[] =
    await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  // console.log("EMPLOYER SUBSCRIPTION DETAILS:", employerSubscriptionDetails);
  const isValidSubscription = employerSubscriptionDetails?.some(
    (subscription) => {
      return ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      );
    }
  );
  return (
    <>
      <section className="px-4">
        {isValidSubscription ? (
          <>
            <div className="hidden">
              <div className="c">
                <Alert className="max-w-sm mx-auto space-x-2 bg-green-50">
                  <CircleCheckBig className="h-6 w-6  " />
                  <AlertTitle>Subscription Status: Valid</AlertTitle>
                  <AlertDescription>
                    You have a valid subscription
                  </AlertDescription>
                </Alert>
              </div>
              <div className="grid place-content-center my-4">
                <OrganizationSwitcher hidePersonal={true} />
              </div>
              <div className="c">
                <div className="grid place-content-center h-full max-w-sm mx-auto border-2 rounded-lg my-4 py-4 px-2 space-y-2">
                  <p className="c">Welcome to {organization.name}</p>
                  <p className="c">Current role {orgRole}</p>
                </div>
              </div>
            </div>
            <InformationDashboardOverview/>
          </>
        ) : (
          <>
            <PackagePricingEmployer />
          </>
        )}
      </section>
    </>
  );
}
