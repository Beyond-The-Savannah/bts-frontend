import { servicesList } from "@/staticData/services";
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
import { Link } from "next-view-transitions";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function ServicesSection() {
  return (
    <>
      <section id="services" className="pt-40 pb-20 bg-amber-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-xl">Our Services</h2>
          <div className="border-2 rounded-md border-stone-500 w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">
            How we can help you
          </p>
          <div className="flex flex-wrap justify-center gap-8 my-8 ">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className=" bg-white rounded-lg  w-full md:w-[42vw] lg:w-[27vw] hover:shadow-amber-300 hover:shadow-md duration-700"
              >
                <div className="grid content-between h-full lg:h-full pb-4">
                  <DisplayImageFromNextCloudinary
                    src={service.img}
                    height={400}
                    width={600}
                    alt={service.title}
                    classname="object-cover w-full h-48 rounded-t-md"
                  />
                  <div className="space-y-2 py-4 px-8">
                    <div className="flex gap-1 items-center justify-between">
                      <p className="font-semibold">{service.title}</p>
                      <p className="bg-amber-100 rounded-lg py-2 px-6 w-36 text-xs">
                        KES <span className="text-xl">{service.price}</span>
                      </p>
                    </div>
                    <p className="c">{service.valueProposal}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger className=" border border-amber-300 py-1 px-2  rounded-lg text-base w-24 hover:shadow-amber-300 hover:shadow-md hover:bg-amber-200 duration-700 mx-8">
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
                            <p className="font-semibold text-2xl md:text-4xl ">
                              {service.title}
                            </p>
                            <p className="c">{service.subheading}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-6 items-center gap-12 ">
                          <div className="col-span-6 md:col-span-2 flex flex-col items-center">
                            <DisplayImageFromNextCloudinary
                              src={service.img}
                              height={400}
                              width={600}
                              alt={service.title}
                              classname="object-cover w-full h-[40vh] rounded-md"
                            />
                            <Link href={`service/${service.titleSlug}`}>
                              <Button
                                size="lg"
                                className="border border-amber-400 bg-amber-400 text-black hover:text-white   rounded-lg text-base  hover:bg-amber-600 hover:scale-105 transition duration-500  my-4"
                              >
                                Get This Service
                              </Button>
                            </Link>
                          </div>
                          <div className="col-span-6 md:col-span-4">
                            <p className="text-3xl">
                              What&apos;s in this service
                            </p>
                            <div className="border-2 rounded-md border-amber-200 w-72 mb-4"></div>
                            {service.benefits.map((benefit, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 my-8"
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
