import CheckoutForm from "@/components/CheckoutForm";
import DisplayImageFromNextCloudinary from "@/components/DisplayImageFromNextCloudinary";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import PostHogClient from "@/lib/postHogServerPage";
import { servicesList } from "@/staticData/services";
import { ParamsProps } from "@/types/nextJSBasedParams";
import { CircleCheck } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import { getCldImageUrl } from "next-cloudinary";

export async function generateMetadata(
  {params}:ParamsProps,
  parent:ResolvingMetadata
):Promise<Metadata>{

  const titleSlug= (await params).titleSlug
  const metaSpecificService = servicesList.find(
    (service) => service.titleSlug == titleSlug
  );
  const url= getCldImageUrl({
    src:`${metaSpecificService?.openGraphImg}`
  })
  const previousImage=(await parent).openGraph?.images || []
  console.log(previousImage)
  return{
    title:`${metaSpecificService?.title} - Beyond The Savannah`,
    description:metaSpecificService?.details,
    openGraph:{
      // images:[`${metaSpecificService?.img}`,...previousImage]
      images:[{
        width:1200,
        height:627,
        url
      }]
    }
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ titleSlug: string }>;
}) {
  const serviceTitleSlug = (await params).titleSlug;
  const specificService = servicesList.find(
    (service) => service.titleSlug == serviceTitleSlug
  );
  const posthog =PostHogClient()
    await posthog?.shutdown()
  return (
    <>
      <section className="container mx-auto space-y-12 px-4 pt-48 pb-40">
        <div className="min-h-[50vh] grid grid-cols-1 md:grid-cols-12 items-start justify-between gap-4">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            {specificService && (
              <DisplayImageFromNextCloudinary
                src={specificService.img}
                height={800}
                width={800}
                prioty
                alt={`beyond the savannah, ${specificService.title} service image`}
                classname="object-cover w-[40rem] bg-bts-BrownOne h-[40vh] rounded-xl"
              />
            )}
          </div>
          <div className=" col-span-12 md:col-span-6 lg:col-span-8 space-y-4   capitalize md:ml-12 lg:ml-24 ">
            <h1 className=" text-2xl xl:text-3xl lg:text-5xl text-balance text-bts-GreenOne font-bold">
              {specificService?.title}
            </h1>
            <p className="bg-amber-100 rounded-lg py-2 px-6 w-48 text">
              {" "}
              KES <span className="text-2xl">{specificService?.priceString}</span>
            </p>
            <p className="text-2xl font-medium lg:text-xl w-full xl:w-4/5">
              {specificService?.subheading}
            </p>
            <p className="text-base w-full xl:w-4/5">
              {specificService?.details}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-start  gap-y-8 md:gap-12 xl:gap-x-32">
          <div className="col-span-6 ">
            <div className="flex items-center justify-between ">
              <div className="c">
                <h6 className="text-3xl ">What&apos;s in this service</h6>
                <div className="border-2 rounded-md border-bts-BrownThree w-full md:w-72 mb-4"></div>
              </div>
              <div className="c">
                <DisplayImageFromNextCloudinary
                  src="Beyond_The_Savannah_Square_Elements_rryzny"
                  height={800}
                  width={800}
                  prioty
                  alt="square shapes"
                  classname="object-cover size-32"
                />
              </div>
            </div>
            {specificService?.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 mb-8">
                <span>
                  <CircleCheck
                    // className="text-green-400"
                    className="text-bts-BrownFive"
                    size={24}
                  />
                </span>
                <p className="text-base">{benefit}</p>
              </div>
            ))}
            <div className="c">
              <DisplayImageFromNextCloudinary
                src="Beyond_The_Savannah_Square_Elements_rryzny"
                height={800}
                width={800}
                prioty
                alt="square shapes"
                classname="object-cover size-32 rotate-180"
              />
            </div>
          </div>
          <div className="col-span-4  space-y-4">
            <p className="text-base">
              {specificService?.valueProposal}
            </p>
            <Drawer>
              {/* <DrawerTrigger className="px-4 py-2 rounded-lg w-full text-white bg-green-600 hover:bg-green-700 hover:shadow-amber-300 hover:shadow-md duration-700"> */}
              <DrawerTrigger className="px-4 py-2 rounded-lg w-full text-white bg-bts-GreenOne hover:bg-green-700 hover:shadow-bts-BrownThree hover:shadow-md duration-700">
                Purchase
              </DrawerTrigger>
              <DrawerContent className="max-w-xl mx-auto">
                <DrawerHeader>
                  <DrawerTitle>Checkout Session</DrawerTitle>
                  <DrawerDescription>
                    Please enter the following details, and choose your
                    preffered payment method to complete the service purchase
                  </DrawerDescription>
                </DrawerHeader>
                <div className=" max-w-md mx-auto py-4 px-8">
                  {specificService?.price && (
                    <CheckoutForm amount={specificService?.price} />
                  )}
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <p>Close</p>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </section>
    </>
  );
}
