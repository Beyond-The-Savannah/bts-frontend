import ViewJob from "@/components/viewJobPage/ViewJob";


export default async function SingleJobListingAdminPage(
    {
        params,
      }: {
        params: Promise<{ jobsId: string }>;
      }
) {
    const jobsId = (await params).jobsId;
    
  return (
    <>
    <ViewJob jobsId={jobsId} />
    </>
  )
}
