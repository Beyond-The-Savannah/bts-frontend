import { clientTestimonials } from "@/staticData/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { QuoteIcon, Youtube } from "lucide-react";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { Link } from "next-view-transitions";

export default function TestimonialSection() {
  return (
    <>
      <section className="container mx-auto px-4 mt-64 min-h-[40vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Testimonials</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            What are people saying
          </p>
        </div>
        <div className="my-8 w-full lg:max-w-6xl mx-auto">
          <Carousel className="mx-8">
            <CarouselContent>
              {clientTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="basis-11/12 lg:basis-2/3">
                  <div className="bg-bts-BrownTwo rounded-lg px-8 py-4 h-full lg:h-96 flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:w-[25rem] grid place-content-center">
                      <DisplayImageFromNextCloudinary 
                       src={testimonial.imgSource}
                       width={200}
                       height={200}
                       sizes="(max-width:768px) 6rem,(max-width:1200px) 12rem"
                       alt={`${testimonial.name}'s -image`}
                       classname="object-cover size-24 lg:size-48 rounded-full"
                      />
                      <p className="text-center mt-4 italic font-semibold ">
                        {testimonial.name}
                      </p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-4 md:items-start md:w-[55rem]">
                      <QuoteIcon className="rotate-180" size={28} />
                      <p className="ml-6 lg:ml-12 text-balance text leading-7">
                        {testimonial.details}
                      </p>
                      <QuoteIcon className=" w-full ml-auto" size={28} />
                      {testimonial.youtubeLink !="" && (
                      <div className="rounded-lg flex items-center gap-2 bg-bts-BrownOne mt-2 md:ml-10 px-2 hover:scale-105 duration-500 w-36">
                        <span><Youtube /></span>
                        <Link href={testimonial.youtubeLink} target="_blank" className="text-xs ">View their story</Link>
                      </div>

                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
}
