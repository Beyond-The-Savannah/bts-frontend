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
  if(!orgId){ return(
    <div className="grid place-content-center mt-40 h-96">
      <p className="text-center my-10">Please create your organization or login to an invited one</p>
<OrganizationSwitcher hidePersonal={true} />

    </div>
)}
  const client= await clerkClient()
  const organization= await client.organizations.getOrganization({organizationId:orgId})
  return (
    <>
      <section className="px-4">
        <div className="grid place-content-center h-96">
          <OrganizationSwitcher hidePersonal={true}/>
        </div>
        <div className="grid place-content-center h-96">
          <p className="c">Welcome to {organization.name}</p>
          <p className="c">Current role {orgRole}</p>
        </div>
      </section>
    </>
  );
}
