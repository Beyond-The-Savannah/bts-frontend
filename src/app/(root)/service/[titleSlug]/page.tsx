import PostHogClient from "@/lib/postHogServerPage";
import { servicesList } from "@/staticData/services";
import { ParamsProps } from "@/types/nextJSBasedParams";
import ServiceDetails from "@/components/servicePage/ServiceDetails";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const titleSlug = (await params).titleSlug;
  const metaSpecificService = servicesList.find(
    (service) => service.titleSlug == titleSlug
  );
  const url = getCldImageUrl({
    src: `${metaSpecificService?.openGraphImg}`,
  });

  return {
    title: `${metaSpecificService?.title} - Beyond The Savannah`,
    description: metaSpecificService?.details,
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

export async function generateStaticParams() {
  return servicesList.map((service) => ({ titleSlug: service.titleSlug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ titleSlug: string; currencyValue: string }>;
}) {
  const { titleSlug } = await params;

  const specificService = servicesList.find(
    (service) => service.titleSlug == titleSlug
  );

  // console.log('CURRENT SERVICE',specificService)
  // console.log('MONEY SIGN',currencyValue)

  const posthog = PostHogClient();
  await posthog?.shutdown();

  return (
    <>
      {specificService != undefined ? (
        <>
          <ServiceDetails
            specificService={specificService}
            titleSlug={titleSlug}
          />
        </>
      ) : (
        <>
          <div className="grid place-content-center min-h-screen">Loading...</div>
        </>
      )}
    </>
  );
}
