export default function Loading() {
  return (
    <>
      <section className="min-h-screen w-full grid place-content-center px-4">
        <div className=" min-h-screen container mr-auto space-y-24">
          <div className="w-96 h-24 rounded-lg bg-bts-BrownOne/50   animate-pulse ">
            <div className="pt-6 pl-4 space-y-2">
              <div className="w-10/12 h-12 rounded bg-bts-BrownOne"></div>
              {/* <div className="w-8/12 h-2 rounded bg-bts-BrownOne"></div> */}
            </div>
          </div>
          <div className="w-full flex flex-wrap  justify-center gap-x-6 gap-y-12 mt-20">
            <div className="bg-bts-BrownOne/50 rounded-lg animate-pulse w-full lg:w-[70dvw] min-h-[70dvh]"></div>
          </div>
        </div>
      </section>
    </>
  );
}
