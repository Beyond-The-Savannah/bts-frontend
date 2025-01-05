import { Button } from "@/components/ui/button";
import { servicesList } from "@/staticData/services";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

export default async function ServicePage({params}:{params:Promise<{titleSlug:string}>}) {
    const serviceTitleSlug= (await params).titleSlug
    const specificService= servicesList.find((service)=> service.titleSlug==serviceTitleSlug)
  return (
    <>
     <section className="container mx-auto px-4 ">
        <div className="h-[50vh] grid grid-cols-1 md:grid-cols-12 items-center gap-4">
          <div className="col-span-4">
            <Image
              src={`${specificService?.img}`}
              width={800}
              height={800}
              alt="LORRAINE founder of beyond the savannah"
              className="object-cover size-96  rounded  "
            />
          </div>
          <div className=" col-span-8 space-y-4   capitalize ml-24">
            <h1 className=" text-3xl lg:text-5xl text-balance font-bold">
              {specificService?.title}
            </h1>
            <p className="text-2xl lg:text-xl w-4/5">
              {specificService?.subheading}
            </p>
            <p className="text-lg w-4/5">{specificService?.details}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-x-32">
          <div className="col-span-8">
            <h6 className="text-3xl">What&apos;s in this service</h6>
            <div className="border-2 rounded-md border-amber-200 w-72 mb-4"></div>
            {specificService?.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 mb-8">
                <span>
                  <CircleCheck className="text-green-400" size={24} />
                </span>
                <p className="text-base">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="col-span-4">
          <p className="text-2xl lg:text-xl">
              {specificService?.valueProposal}
            </p>
            <Button className="bg-green-500 w-full">
                Purchase
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
