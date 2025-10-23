import CandidatesSection from "@/components/Employer/CandidatesPage/CandidatesSection";

export default function page() {
  return (
    <>
      <section className="container mx-auto px-4">
        <div className="c">
            <h2 className="text-3xl font-semibold mb-10">All Candidates</h2>
        </div>
        <CandidatesSection/>
      </section>
    </>
  );
}
