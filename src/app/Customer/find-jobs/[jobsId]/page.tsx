import ViewJob from "@/components/Customer/ViewJob";

export default async function page({
  params,
}: {
  params: Promise<{ jobsId: string }>;
}) {
  const jobsId = (await params).jobsId;
  return (
    <>
      <ViewJob jobsId={jobsId} />
    </>
  );
}
