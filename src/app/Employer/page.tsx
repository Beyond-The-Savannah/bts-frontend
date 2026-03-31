// import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack, GetEmployerSubscriptionDetailsFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
// import {  GetEmployerSubscriptionDetailsFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
// import { subscriptionDetailsProps } from "@/types/subscriptions";
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
import { OrganizationSwitcher, SignIn, SignInButton } from "@clerk/nextjs";
import { auth,  } from "@clerk/nextjs/server";
import { Cog } from "lucide-react";

import { Suspense } from "react";

export default async function page() {
  // const client = await clerkClient();
  const { isAuthenticated, orgId, userId } = await auth();
  const {isValidSubscription,isOrganisationMember}=await GetEmployerSubscriprionDetails({orgId:orgId as string, userId:userId as string})

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

//   //Check if the user is a member of the organization
//   const { data: organisationMemmbers } =
//     await client.organizations.getOrganizationMembershipList({
//       organizationId: orgId!,
//     });
//   // console.log("ORGANISATION MEMBERS:", organisationMemmbers);

//   // Find the admin who likely owns the subscription
// const adminMemmber=organisationMemmbers.find((member)=>member.role=="org:admin")
// const adminEmail=adminMemmber?.publicUserData?.identifier
// const adminSubscriptionDetails:subscriptionDetailsProps[]=await GetEmployerSubscriptionDetailsFromPaystack(adminEmail as string)

// //check for valid subscription
// const isValidSubscription=adminSubscriptionDetails?.filter((subscriptionOne)=>subscriptionOne.amount===300000)
// .some((subscription)=>{return ["active", "attention", "non-renewing", "completed"].includes(subscription.status.toLowerCase(),)})

// //check for organisation members
//   const isOrganisationMember = organisationMemmbers.some((member) => member.publicUserData?.userId === userId,);

  //check for valid subscription
  // const employerSubscriptionDetails: subscriptionDetailsProps[] =
  //   await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  // // console.log("EMPLOYER SUBSCRIPTION DETAILS:", employerSubscriptionDetails);
  // const isValidSubscription = employerSubscriptionDetails
  //   ?.filter((subscriptionOne) => subscriptionOne.amount === 300000)
  //   .some((subscription) => {
  //     return ["active", "attention", "non-renewing", "completed"].includes(
  //       subscription.status.toLowerCase(),
  //     );
  //   });

  return (
    <>
      <Suspense fallback={<EmployerCheckLoader2 />}>
        <section className="px-4">
          {/* {isValidSubscription || isOrganisationMember ? ( */}
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
