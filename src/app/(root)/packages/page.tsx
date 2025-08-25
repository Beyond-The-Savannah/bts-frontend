import Packages from "@/components/Customer/Packages";
import PackagesLoader from "@/components/Loaders/PackagesLoader";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-xl"> Unlock Your Career Potential</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Advance Your Career with Our Packages
          </p>
        </div>
        <div className="min-h-[70vh] w-full container mx-auto px-4  pt-10">
          <Suspense fallback={<PackagesLoader/>}>
            <Packages email=""/>
          </Suspense>
        </div>
      </section>
    </>
  );
}
