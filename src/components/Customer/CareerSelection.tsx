import CareerSelectionComponent from "./CareerSelectionComponent";

export default function CareerSelection() {
  return (
    <section className="py-10">
      <div className="min-h-[30vh] space-y-6 px-4 py-8 bg-slate-200 rounded-lg max-w-lg">
        <div className="space-y-4">
          <p className="font-semibold text-xl">Career Selection</p>
          {/* <p className="text-">
            Please select a career category that best matches your carrer to
            view the jobs listing
          </p> */}
        </div>
        <div className="c">
          <CareerSelectionComponent />
        </div>
      </div>
    </section>
  );
}
