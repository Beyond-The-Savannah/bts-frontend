import ViewJob from "@/components/viewJobPage/ViewJob";
import PostHogClient from "@/lib/postHogServerPage";
import { fetchRemoteJobsList } from "@/remoteData/getData";
import { Metadata, ResolvingMetadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata(
  { params }: { params: Promise<{ jobsId: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metaJobsId = (await params).jobsId;

  const metaJob = await (
    await fetchRemoteJobsList()
  ).find((job) => job.jobsId == parseInt(metaJobsId));

  const url = getCldImageUrl({

    src: `view-job_openGraph_xgfhqm`,
  });
  const previousImage = (await parent).openGraph?.images || [];
  console.log(previousImage);

  return {
  
    title: `${metaJob?.jobName} - Beyond The Savannah`,
    description: `${metaJob?.companyName} has an remote opportunity under this department ${metaJob?.jobSubCategory}`,
    openGraph: {
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

  const posthog =PostHogClient()
    await posthog?.shutdown()

  return (
    <>
      <ViewJob jobsId={jobsId} />
    </>
  );
}
