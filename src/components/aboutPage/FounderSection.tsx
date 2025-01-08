import Image from "next/image";
// import { CldVideoPlayer } from "next-cloudinary";

export default function FounderSection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-[100vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Meet The Founder</h2>
          {/* <div className="border-2 rounded-md border-amber-200 w-36"></div> */}
          <div className="border-2 rounded-md border-stone-500 w-36"></div>
          <p className="capitalize text-5xl font-bold  mt-2">
            Hi, I&apos;m Loarraine
          </p>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 "> */}
        <div className="flex flex-wrap items-center justify-stretch gap-6 ">
          {/* <div className="col-span-4"> */}
          <div className="w-full md:w-4/12">
            <p className="text-lg text-balance">
              I am a certified coach and seasoned HR professional with a passion
              for remote work, blending expertise in both local and global
              markets. With a keen understanding of human resources dynamics, I
              bring valuable insights to foster effective collaboration and
              employee development in the evolving landscape of remote work.
            </p>
            
          </div>
          {/* <div className="col-span-8"> */}
          <div className="w-full md:w-6/12">
            {/* <CldVideoPlayer
              src="https://res.cloudinary.com/dh8qlzbzk/video/upload/v1735985501/loarrine_video_nsysrl.mp4"
              width={1620}
              height={1080}
              className="aspect-video rounded-lg"
            /> */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6">
              <Image
                src="/images/founder loarrine.jpeg"
                height={400}
                width={1200}
                alt="bento remote image"
                // className="object-cover size-12/12 rounded-3xl"
                className="object-cover w-96 h-[60vh] rounded-3xl"
              />
              {/* <div className="bg-amber-400 rounded-lg h-[40vh] aspect-video"> */}
              <div className="bg-amber-400 rounded-lg w-full h-[40vh]">
              {/* <div className="bg-[#e3dad2] rounded-lg h-[40vh] aspect-video"> */}
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
}
