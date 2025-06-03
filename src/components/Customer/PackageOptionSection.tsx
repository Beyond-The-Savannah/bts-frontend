import Packages from "@/components/Customer/Packages";
import { currentUser } from "@clerk/nextjs/server";
import { AlertCircle } from "lucide-react";

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
              Beyond The Savannah offers job listings with expert-led career
              preparation, giving you the edge you need to stand out and secure
              your dream role.
            </p>
          </div>
          <Packages email={userEmail} />
          <div className="max-w-xl mx-auto my-10">
            <div className="c rounded-lg bg-amber-50 px-3 py-6 flex flex-col gap-4 items-start">
              <AlertCircle className="size-4" />
              <p className="text-xs">
                Please note that any payments for the packages are
                non-refundable once processed
              </p>
              <p className="text-xs">
                To prevent subsequent charges, use the manage subscription
                button in the dashboard
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
