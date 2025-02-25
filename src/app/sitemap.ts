import { servicesList } from "@/staticData/services";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const servicesPages: MetadataRoute.Sitemap = servicesList.map((service) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/service/${service.titleSlug}`,
  }));
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/find-jobs`,
    },
    ...servicesPages,
  ];
}
