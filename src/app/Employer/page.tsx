
import { GetEmployerSubscriprionDetails } from "@/components/Employer/EmployerSubscriptionInforamtionCheck";
import InformationDashboardOverview from "@/components/Employer/InformationDashboardOverview";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";
import EmployerCheckLoader from "@/components/Loaders/EmployerCheckLoader";

import EmployerCheckLoader2 from "@/components/Loaders/EmployerCheckLoader2";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { OrganizationSwitcher, SignIn, SignInButton, } from "@clerk/nextjs";
import { auth,  } from "@clerk/nextjs/server";
import { Cog } from "lucide-react";
// import { redirect } from "next/navigation";

import { Suspense } from "react";

export default async function page() {
  
  const { isAuthenticated, orgId, userId } = await auth();
  
  
  
  
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
          <Empty className="border border-dotted w-6/12 mx-auto mt-40">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Cog className="text-orange-400" />
              </EmptyMedia>
              <EmptyTitle>Hi there, welcome onboard.</EmptyTitle>
              <EmptyDescription className="w-full lg:w-[28dvw]">
                We&apos;ve noticed that you haven&apos;t created any
                organization yet. If you got an invite then join the
                organization using the button below.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="grid place-content-center">
                <OrganizationSwitcher hidePersonal={true} />
              </div>
            </EmptyContent>
          </Empty>
        </Suspense>
      </>
    );
  }
  
  const {isValidSubscription,isOrganisationMember}=await GetEmployerSubscriprionDetails({orgId:orgId as string, userId:userId as string})


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
