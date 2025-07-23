import CareerSelectionComponent from "./CareerSelectionComponent";

export default function CareerSelection({emailAddress}:{emailAddress:string}) {
  return (
    <section className="py-10">
      {/* <div className="min-h-[30vh] space-y-6 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full lg:w-[30rem]"> */}
      {/* <div className="min-h-[30vh] space-y-6 ml-0 md:ml-8 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full lg:w-4/12"> */}
      <div className="min-h-[30vh] space-y-6 ml-0 lg:ml-8 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full lg:w-9/12">
        <div className="space-y-4">
          <p className="font-semibold text-xl">Career Selection</p>
        </div>
        <div className="c">
          <CareerSelectionComponent  userEmailAddress={emailAddress}/>
        </div>
      </div>
    </section>
  );
}
