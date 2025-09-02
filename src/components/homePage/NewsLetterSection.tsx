import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
// import { Button } from "../ui/button";

export default function NewsLetterSection() {
  return (
    <>
      <section className="container mx-auto px-4 mt-64 mb-20 h-full lg:min-h-[50vh] flex flex-col justify-center">
        <div className="">
          {/* <h2 className="text-xl">News letter</h2> */}
          <h2 className="text-xl">Global Clientele</h2>

          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            {/* Get curated, remote jobs listings */}
            Work From Anywhere
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-12 max-w-6xl  mx-auto px-4">
          <div className="w-full xl:w-[50vw]">
            <DisplayImageFromNextCloudinary
              src="global_map_anodbs"
              height={800}
              width={800}
              sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
              alt="word map"
              classname="object-cover h-full w-full"
            />
          </div>
          <div className="w-full xl:w-[50vw] space-y-8 text-balance">
            <p className="text-2xl font-semibold">
              A World Wide  WorkForce
            </p>
            <p>
              Step into the future of employment, where the world is your office. Our extensive listings
              of remote jobs allow you to work from anywhere. <br/><br/>Become part of the
              global workforce, where boundaries dissolve, and possibilities
              expand. Our platform offers a diverse array of remote job listings
              that empower you to work from anywhere in the world.
            </p>
           
          </div>
        </div>
        {/* <div className="max-w-3xl mx-auto my-8">
          
          <div className="text-center text-balance space-y-8 py-4 px-8 bg-bts-BrownTwo rounded-lg">
            <article>
                <p className="text-3xl font-semibold">
                Don&apos;t miss out on applying for your dream remote job.
                </p>
                <p className="c">
                Get remote jobs listings that are hiring worldwide in your inbox
                as well as updates in the remote world trends. Unsubscribe
                anytime. No spam, guaranteed.
                </p>
            </article>
            <form action="" className=" flex flex-col gap-4">
                <input type="email" name="email" id="" placeholder="Your Email Address" className="bg-white text-black rounded-lg py-2 px-4" />
                <Button type="submit" className="text-base bg-bts-GreenOne hover:bg-green-600 w-64 mx-auto">
                    Subscribe
                </Button>
            </form>
          </div>
        </div> */}
      </section>
    </>
  );
}
