import CareerSelectionComponent from "./CareerSelectionComponent";

export default function CareerSelection({emailAddress}:{emailAddress:string}) {
  return (
    <section className="py-10">
      <div className=" space-y-6  px-4 py-8 min-h-[20.3rem] bg-bts-BrownOne/50 rounded-lg ">
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
