import Packages from "@/components/Customer/Packages";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function PackageOptionSection() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress as string;
  return (
    <>
      <section className="px-4">
        <div className="grid place-content-center min-h-[60vh] w-full text-black">
          <div className="flex justify-end w-full">
            <SignedIn>
              <div className="bg-bts-BrownThree/5 p-1 rounded-2xl flex gap-1 items-center">
                <p>Signed In as </p>
                <UserButton />
              </div>
            </SignedIn>
          </div>
          <div className="text-center space-y-4 my-20">
            <p className="text-xl font-medium">
              Choose the package that fits your needs and budget.
            </p>
            <p className="max-w-xl mx-auto">
              Tired of endless applications and no results? Beyond The Savannah
              combines targeted job listings with expert-led career preparation,
              giving you the edge you need to stand out and secure your dream
              role.
            </p>
          </div>
          <Packages email={userEmail} />
        </div>
      </section>
    </>
  );
}
