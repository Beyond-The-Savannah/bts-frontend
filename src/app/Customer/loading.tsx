import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";

export default function Loading() {
  return (
    <>
      {/* <section className="min-h-screen w-full  px-4">
        <div className=" min-h-screen container mr-auto space-y-12">
          <div className="w-96 h-24 rounded-lg bg-bts-BrownOne/50   animate-pulse ">
            <div className="pt-6 pl-4 space-y-2">
              <div className="w-10/12 h-12 rounded bg-bts-BrownOne"></div>
            </div>
          </div>
          <div className="w-full flex flex-wrap  justify-stretch gap-x-6 gap-y-12 mt-10">
            <div className="bg-bts-BrownOne/50 rounded-lg animate-pulse w-full lg:w-[80dvw] min-h-[75dvh]"></div>
          </div>
        </div>
      </section> */}
      <DashboardPageLoader/>
    </>
  );
}
