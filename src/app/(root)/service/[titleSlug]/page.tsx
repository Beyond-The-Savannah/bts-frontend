import CheckoutForm from "@/components/CheckoutForm";
import DisplayImageFromNextCloudinary from "@/components/DisplayImageFromNextCloudinary";
import { Button } from "@/components/ui/button";
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
import { AlertCircle, CircleCheck } from "lucide-react";
import { Metadata } from "next";
import { getCldImageUrl } from "next-cloudinary";
import { Link } from "next-view-transitions";

export async function generateMetadata(
  { params }: ParamsProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const titleSlug = (await params).titleSlug;
  const metaSpecificService = servicesList.find(
    (service) => service.titleSlug == titleSlug
  );
  const url = getCldImageUrl({
    src: `${metaSpecificService?.openGraphImg}`,
  });
  // const previousImage = (await parent).openGraph?.images || [];

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ titleSlug: string }>;
}) {
  const serviceTitleSlug = (await params).titleSlug;
  const specificService = servicesList.find(
    (service) => service.titleSlug == serviceTitleSlug
  );
  const posthog = PostHogClient();
  await posthog?.shutdown();
  return (
    <>
      <section className="container mx-auto space-y-16 px-4 pt-24 md:pt-36 lg:pb-40">
        <div className="min-h-[50vh]  flex flex-wrap lg:flex-nowrap justify-around gap-y-12 gap-x-12">
          {/* <div className="w-[85vw] md:w-[45vw] lg:max-w-[34vw] "> */}
          <div className="w-full lg:max-w-[34vw] ">
            {specificService && (
              <DisplayImageFromNextCloudinary
                src={specificService.img}
                height={800}
                width={800}
                prioty
                alt={`beyond the savannah, ${specificService.title} service image`}
                classname="object-cover w-full lg:w-[40rem] mx-auto  bg-bts-BrownOne h-[40vh] rounded-xl"
              />
            )}
          </div>
          {/* <div className=" w-[85vw] md:w-[44vw] lg:w-[48vw] space-y-4 text-balancee"> */}
          <div className=" w-[85vw]  lg:w-[48vw] space-y-4 ">
            <div className="flex lg:flex-col flex-wrap items-center lg:items-start gap-4">
              <h1 className=" text-2xl xl:text-3xl lg:text-5xl  text-bts-GreenOne font-bold">
                {specificService?.title}
              </h1>
              <p className="bg-amber-100 rounded-lg py-2 px-6 w-6/12 md:w-auto text">
                {" "}
                KES{" "}
                <span className="text-2xl">{specificService?.priceString}</span>
                {serviceTitleSlug == "beyond-the-savannah-whatsApp-community" ? (
                  <>
                    <span>/annually</span>
                  </>
                ) : null}
              </p>

            </div>
            <p className="text-2xl font-medium lg:text-xl w-full">
              {specificService?.subheading}
            </p>
            <p className="text-base w-full ">{specificService?.details}</p>
          </div>
        </div>

        {/* <div className="min-h-[50vh]  flex flex-wrap justify-around gap-12"> */}
        <div className="min-h-[50vh]  flex flex-wrap md:flex-nowrap justify-between gap-12 pt-10">
          <div className="w-[85vw] md:max-w-[50vw] ">
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
                  <CircleCheck className="text-bts-BrownFive" size={24} />
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
          <div className="w-[85vw] md:w-[27vw]   space-y-4 ">
            <p className="text-base">{specificService?.valueProposal}</p>
            {serviceTitleSlug == "beyond-the-savannah-whatsApp-community" ? (
              <>
                <Button
                  asChild
                  className="px-4 py-2 rounded-lg w-full text-white bg-bts-GreenOne hover:bg-green-700 hover:shadow-bts-BrownThree hover:shadow-md duration-700"
                >
                  <Link
                    href={`/Customer/whatsappService?source=whatsapp-service`}
                  >
                    Get Service
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Drawer>
                  <DrawerTrigger className="px-4 py-2 rounded-lg w-full text-white bg-bts-GreenOne hover:bg-green-700 hover:shadow-bts-BrownThree hover:shadow-md duration-700">
                    Purchase
                  </DrawerTrigger>
                  <DrawerContent className="max-w-xl mx-auto">
                    <DrawerHeader>
                      <DrawerTitle>Checkout Session</DrawerTitle>
                      <DrawerDescription>
                        Please enter the following details, and choose your
                        preffered payment method to complete the service
                        purchase
                        {specificService?.servicePolicy != "" && (
                          <span className="c rounded-lg bg-amber-50 px-3 py-6 flex flex-col gap-2 my-4 items-start">
                            <AlertCircle className="size-4" />
                            <span className="text-xs">
                              Please note: By proceeding with payment for this
                              service and booking a subsequent session, you
                              agree that the session is non-refundable if you do
                              not attend your booked time slot. We do not offer
                              rescheduling for no-shows.
                            </span>
                          </span>
                        )}
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
              </>
            )}

            <div className="c rounded-lg bg-amber-50 px-3 py-6 flex flex-col gap-4 items-start">
              <AlertCircle className="size-4" />
              <p className="text-xs">
                Please note that all payments for services are non-refundable
                once processed
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
