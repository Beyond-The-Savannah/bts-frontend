import Packages from "@/components/Customer/Packages";
import { currentUser } from "@clerk/nextjs/server";

export default async function PackageOptionSection() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress as string;
  return (
    <>
      <section className="px-4">
        {/* <div className="grid place-content-center min-h-[60vh] w-full text-black"> */}
        <div className=" min-h-[60vh] w-full text-black">
          {/* <div className="text-center space-y-4 my-20"> */}
          <div className="text-center space-y-4 ">
            <p className="text-xl font-semibold">
              Choose the package that fits your needs and budget.
            </p>
            <p className="max-w-2xl mx-auto">
              Beyond The Savannah offers job listings with expert-led career preparation,
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
