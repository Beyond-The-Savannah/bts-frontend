import ViewJob from "@/components/viewJobPage/ViewJob";
import { fetchRemoteJobsList } from "@/remoteData/getData";
import { Metadata, ResolvingMetadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

export async function generateMetadata(
  { params }: { params: Promise<{ jobsId: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metaJobsId = (await params).jobsId;

  const metaJob = await (
    await fetchRemoteJobsList()
  ).find((job) => job.jobsId == parseInt(metaJobsId));
  console.log("METAJOBID ", metaJobsId);
  console.log("METAJOB ", metaJob);

  const url = getCldImageUrl({
    src: `${metaJob?.imageUrl}`,
  });
  const previousImage = (await parent).openGraph?.images || [];
  console.log(previousImage);

  return {
    title: `View Job - Beyond The Savannah`,
    description: ``,
    openGraph: {
      title: `${metaJob?.jobName} `,
      description: `${metaJob?.companyName} has an remote opportunity under this department ${metaJob?.jobSubCategory}`,
      images: [
        {
          width: 1200,
          height: 627,
          url,
        },
      ],
    },
  };
}

export default async function SinglJobListingPage({
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
