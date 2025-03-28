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
    <div className="-mt-36">
    <ViewJob jobsId={jobsId} />
    </div>
  )
}
