import CheckoutForm from "@/components/CheckoutForm";
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
import { servicesList } from "@/staticData/services";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ titleSlug: string }>;
}) {
  const serviceTitleSlug = (await params).titleSlug;
  const specificService = servicesList.find(
    (service) => service.titleSlug == serviceTitleSlug
  );
  return (
    <>
      <section className="container mx-auto space-y-12 px-4 pt-52 pb-40">
        <div className="min-h-[50vh] grid grid-cols-1 md:grid-cols-12 items-start gap-4">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Image
              src={`${specificService?.img}`}
              width={800}
              height={800}
              alt={`beyond the savannah, ${specificService?.title} service image`}
              // className="object-cover w-[60rem] h-72 rounded  "
              className="object-cover w-[40rem] h-72 rounded  "
            />
          </div>
          <div className=" col-span-12 md:col-span-6 lg:col-span-8 space-y-4   capitalize md:ml-12 lg:ml-24 ">
            <h1 className=" text-3xl lg:text-5xl text-balance font-bold">
              {specificService?.title}
            </h1>
            <p className="bg-amber-100 rounded-lg py-2 px-6 w-48 text">
              {" "}
              KES <span className="text-2xl">{specificService?.price}</span>
            </p>
            <p className="text-2xl lg:text-xl w-full lg:w-4/5">
              {specificService?.subheading}
            </p>
            <p className="text-lg w-full lg:w-4/5">
              {specificService?.details}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-start  gap-y-8 md:gap-12 xl:gap-x-32">
          <div className="col-span-7  ">
            <div className="flex items-center justify-between ">
              <div className="c">
                <h6 className="text-3xl ">What&apos;s in this service</h6>
                <div className="border-2 rounded-md border-amber-200 w-full md:w-72 mb-4"></div>
              </div>
              <div className="c">
                <Image
                  src="/images/square elements.png"
                  width={800}
                  height={800}
                  alt={`beyond the savannah, ${specificService?.title} service image`}
                  className="object-cover size-32  "
                />
              </div>
            </div>
            {specificService?.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 mb-8">
                <span>
                  <CircleCheck className="text-green-400" size={24} />
                </span>
                <p className="text-base">{benefit}</p>
              </div>
            ))}
            <div className="c">
              <Image
                src="/images/square elements.png"
                width={800}
                height={800}
                alt={`beyond the savannah, ${specificService?.title} service image`}
                className="object-cover size-32  rotate-180"
              />
            </div>
          </div>
          <div className="col-span-4  space-y-4">
            <p className="text-2xl lg:text-xl">
              {specificService?.valueProposal}
            </p>
            <Drawer>
              <DrawerTrigger className="px-4 py-2 rounded-lg w-full text-white bg-green-600 hover:bg-green-700 hover:shadow-amber-300 hover:shadow-md duration-700">
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
