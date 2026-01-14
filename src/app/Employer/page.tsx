import { GetCustomerSubscriptionDetailsByCustomerIDFromPaystack } from "@/components/Customer/UserSubscriptionInformation";
import PackagePricingEmployer from "@/components/Employer/PackagePricingEmployer";
import { OrganizationSwitcher, SignIn, SignInButton } from "@clerk/nextjs";
import { auth, clerkClient } from "@clerk/nextjs/server";


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
      <div className="grid place-content-center mt-40 h-96">
        <p className="text-center my-10">
          Please create your organization or login to an invited one
        </p>
        <OrganizationSwitcher hidePersonal={true} />
      </div>
    );
  }
  const client = await clerkClient();
  const organization = await client.organizations.getOrganization({
    organizationId: orgId,
  });
  
  // const employerSubscriptionDetails = async () => {
  //  const data= await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  //  return data
  // };
  
  const employerSubscriptionDetails= await GetCustomerSubscriptionDetailsByCustomerIDFromPaystack();
  console.log("EMPLOYER SUBSCRIPTION DETAILS:", employerSubscriptionDetails);
  return (
    <>
      <section className="px-4">
        <div className="grid place-content-center ">
          <OrganizationSwitcher hidePersonal={true} />
        </div>
        <div className="grid place-content-center h-96">
          <p className="c">Welcome to {organization.name}</p>
          <p className="c">Current role {orgRole}</p>
        </div>
        <PackagePricingEmployer />
        <div className="grid place-content-center my-10 w-96 mx-auto border rounded-lg">
          {employerSubscriptionDetails!==null &&(<p className="text-green-600 font-medium">You have an active subscription</p>
            )}
        </div>
      </section>
    </>
  );
}
