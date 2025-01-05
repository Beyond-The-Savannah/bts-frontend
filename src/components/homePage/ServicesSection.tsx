import { servicesList } from "@/staticData/services";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CircleCheck } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
// import Link from "next/link";
import { Link } from 'next-view-transitions'

export default function ServicesSection() {
  return (
    <>
      <section className="py-20 bg-amber-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-xl">Our Services</h2>
          <div className="border-2 rounded-md border-amber-200 w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">
            How we can help you
          </p>
        <div className="flex flex-wrap justify-center gap-8 my-8 ">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className=" bg-white rounded-lg  w-full md:w-[42vw] lg:w-[25vw]"
            >
              <div className="grid content-between h-full lg:h-full] pb-4">
               
                <Image
                  src={service.img}
                  height={600}
                  width={400}
                  alt={service.title}
                  className="object-cover w-full h-48 rounded-t-md"
                />
                <div className="py-4 px-8">
                  <h5 className="font-semibold">{service.title}</h5>
                  <p className="c">{service.valueProposal}</p>
                </div>
                  <Dialog>
                    <DialogTrigger className=" border border-amber-500 py-2 px-4  rounded-lg text-base  hover:bg-amber-500 w-24 mx-8">
                      Preview
                    </DialogTrigger>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                    <DialogContent className="max-w-6xl mx-auto">
                      <ScrollArea className="max-h-[70vh] w-full px-8 overflow-y-auto">
                        <div className="max-w-6xl mx-autom ">
                          <div className="text-center text-balance mb-4">
                            <h5 className="font-semibold text-2xl md:text-4xl ">
                              {service.title}
                            </h5>
                            <p className="c">{service.subheading}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-12 ">
                          <div className="col-span-6 md:col-span-2 flex flex-col">
                            <Image
                              src={service.img}
                              height={600}
                              width={400}
                              alt={service.title}
                              className="object-cover w-full h-[40vh] rounded-md"
                            />
                            <Link href={`service/${service.titleSlug}`}>
                            <Button className="border border-amber-500 bg-amber-500 py-2 px-4  rounded-lg text-base  hover:bg-amber-600 w-full mx-auto my-4" >
                              Get This Service
                            </Button>
                            </Link>
                          </div>
                          <div className="col-span-6 md:col-span-4">
                            <h6 className="text-3xl">
                              What&apos;s in this service
                            </h6>
                            <div className="border-2 rounded-md border-amber-200 w-72 mb-4"></div>
                            {service.benefits.map((benefit, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 mb-8"
                              >
                                <span>
                                  <CircleCheck
                                    className="text-green-400"
                                    size={24}
                                  />
                                </span>
                                <p className="">{benefit}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </ScrollArea>
          
                    </DialogContent>
                  </Dialog>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
