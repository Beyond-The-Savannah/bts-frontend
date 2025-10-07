import { Link } from "next-view-transitions";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { ArrowUpRightIcon, CircleCheck } from "lucide-react";
import { servicesList } from "@/staticData/services";
import { IpNotFoundError, publicIpv4 } from "public-ip";

const ipInfoToken = process.env.NEXT_PUBLIC_IPINFO_TOKEN;

export default async function CarreerServices() {

    let currencyValue = "";
    try {
      const ip = await publicIpv4({ timeout: 5000 });
      const response = await fetch(
        `https://ipinfo.io/${ip}/json?token=${ipInfoToken}`
      );
      const response2 = await response.json();
      if (response2.country === "KE") {
        currencyValue = "KES";
      } else {
        currencyValue = "USD";
      }
    } catch (error: unknown) {
      if (error instanceof IpNotFoundError) {
        console.log("Could not determine public IP Address");
      } else if (error instanceof DOMException && error.name) {
        console.log("request was cancelled");
      } else {
        console.log("An error occured", (error as Error).message);
      }
    }
  return (
    <section className="px-4">
    <div className="px-2  mb-10">
          <h2 className="text-xl">Our Services</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            How we can help you
          </p>
    </div>
      <div className="flex flex-wrap justify-evenly gap-9 my-8 ">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className=" bg-white rounded-lg  w-full md:w-10/12 lg:w-[28rem] border hover:shadow-bts-BrownFour hover:shadow-md duration-700"
          >
            <div className="grid content-between h-full lg:h-full pb-4">
              <DisplayImageFromNextCloudinary
                src={service.img}
                height={400}
                width={600}
                alt={service.title}
                classname="object-cover w-full h-48 rounded-t-md"
              />
              <div className="space-y-2 py-4 px-8 md:min-h-52">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 items-center">
                  <p className="text-base  font-semibold text-bts-GreenOne text-balance">
                    {service.title}
                  </p>
                  {/* <p className="bg-amber-100 rounded-lg py-2 px-6 w-11/12 text-xs">
                    KES <span className="text-sm">{service.priceString}</span>
                  </p> */}
                  {currencyValue == "KES" ? (
                        <p className="bg-amber-100 rounded-lg py-2 px-6 w-30 lg:w-36 text-xs">
                          KES{" "}
                          <span className="text-sm">
                            {service.priceKESString}
                          </span>
                        </p>
                      ) : (
                        <p className="bg-amber-100 rounded-lg py-2 px-6 w-30 lg:w-36 text-xs">
                          USD{" "}
                          <span className="text-sm">
                            {service.priceUSDString}
                          </span>
                        </p>
                      )}
                </div>
                <p className="text-sm leading-6">{service.valueProposal}</p>
              </div>
              <Dialog>
                <DialogTrigger className=" border border-bts-BrownThree py-1 px-2  rounded-lg text-base w-24 hover:shadow-bts-BrownFour hover:text-white hover:shadow-md hover:bg-bts-BrownThree duration-700 mx-8">
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
                        <p className="font-semibold text-2xl md:text-4xl text-bts-GreenOne">
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
                        <Link href={`/service/${service.titleSlug}`} target="_blank">
                          <Button
                            size="lg"
                            className="border border-bts-BrownThree bg-bts-BrownThree text-black hover:text-white   rounded-lg text-base  hover:bg-bts-BrownThree hover:scale-105 transition duration-500  my-4"
                          >
                            Get This Service <ArrowUpRightIcon/>
                          </Button>
                        </Link>
                      </div>
                      <div className="col-span-6 md:col-span-4">
                        <p className="text-3xl">What&apos;s in this service</p>

                        <div className="border-2 rounded-md border-bts-BrownThree w-72 mb-4"></div>
                        {service.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 my-8"
                          >
                            <span>
                              <CircleCheck
                                className="text-bts-BrownFive"
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
    </section>
  );
}
