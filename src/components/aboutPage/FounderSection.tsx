import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import DisplayVideoFromNextCloudinary from "../DisplayVideoFromNextCloudinary";

export default function FounderSection() {
  return (
    <section className="bg-bts-BrownTwo">
      {/* <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center"> */}
      <div className="container mx-auto px-4 xs:min-h-[99dvh] md:min-h-[90dvh] lg:min-h-[90dvh] xl:min-h-[80dvh] 2xl:min-h-[55dvh] flex flex-col justify-center">
        <div className="py-10">
          <h2 className="text-sm md:text-xl">Meet The Founder</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-2xl md:text-5xl font-bold text-bts-GreenOne mt-2">
            Hi, I&apos;m Lorraine
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-stretch gap-6 ">
          <div className="w-full md:w-4/12">
            <p className="text-lg text-balance">
              {/* I am a certified coach and seasoned HR professional with a passion
              for remote work, blending expertise in both local and global
              markets. With a keen understanding of human resources dynamics, I
              bring valuable insights to foster effective collaboration and
              employee development in the evolving landscape of remote work. */}
              I am a seasoned HR professional with a passion for helping
              companies scale through borderless talent. Blending deep expertise
              in both local and global talent markets, I bring an acute
              understanding of human resources dynamics to the remote work
              landscape. 
              <br/>
              <br/>
              My mission is to give organizations the ultimate hiring
              advantage: access to a vetted pipeline of professionals who are
              ready to collaborate seamlessly and impact your bottom line from
              day one.
            </p>
          </div>
          <div className="w-full md:w-6/12">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6">
              <DisplayImageFromNextCloudinary
                src="founder_loarrine_dx6gt5"
                height={400}
                width={900}
                sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"
                alt="Beyond the savannah founder loarine"
                classname="object-cover w-96 h-[60vh] rounded-3xl"
              />

              <DisplayVideoFromNextCloudinary
                src="loarrine_video_nsysrl"
                height={1220}
                width={1080}
                classname="bg-amber-400 rounded-lg w-full h-full aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
