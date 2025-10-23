import CandidatesSection from "@/components/Employer/CandidatesPage/CandidatesSection";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const jobTitle = decodeURIComponent(id);
  return (
    <>
      <section className="container mx-auto px-4">
        <div className="bg-slate-100 my-12 py-10 px-8 rounded-md">
          <p className="c">Role Opening:</p>
          <h2 className="text-3xl">{jobTitle}</h2>
        </div>
        <div className="bg-slate-100/60 my-12 py-10 px-8 rounded-md">
          <div className="c">
            <p className="text-xl font-semibold">Applicants for the role</p>
          </div>
          <CandidatesSection />
        </div>
      </section>
    </>
  );
}
