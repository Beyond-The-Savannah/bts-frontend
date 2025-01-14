import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import DisplayVideoFromNextCloudinary from "../DisplayVideoFromNextCloudinary";


export default function FounderSection() {
  return (
    <section className="bg-bts-BrownTwo">
      <div className="container mx-auto px-4 min-h-[100vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Meet The Founder</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-5xl font-bold  mt-2">
            Hi, I&apos;m Loarraine
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-stretch gap-6 ">
          <div className="w-full md:w-4/12">
            <p className="text-lg text-balance">
              I am a certified coach and seasoned HR professional with a passion
              for remote work, blending expertise in both local and global
              markets. With a keen understanding of human resources dynamics, I
              bring valuable insights to foster effective collaboration and
              employee development in the evolving landscape of remote work.
            </p>
          </div>
          <div className="w-full md:w-6/12">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6">
              <DisplayImageFromNextCloudinary
                src="founder_loarrine_dx6gt5"
                height={400}
                width={900}
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
