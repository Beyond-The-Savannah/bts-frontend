import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function HeroSection() {
  return (
    <section className="min-h-screen">
      {/* <div className="max-w-7xl mx-auto px-4 pt-28"> */}
      <div className="min-h-[90dvh] flex flex-wrap md:flex-nowrap justify-between  gap-4 ">
        {/* <div className="space-y-12 w-full md:w-6/12 px-4 md:px-12"> */}
        <div className="w-full md:w-6/12 px-4 md:px-12 flex flex-col justify-center items-center  gap-12">
          <h1 className="text-3xl md:text-5xl text-bts-GreenOne font-bold">
            Partnership that Empower
          </h1>
          <p className="text-lg text-balance leading-7 ">
            We collaborate with organizations committed to empowering global
            talent and transforming remote opportunities into thriving careers.
          </p>
        </div>
        <div className="w-full md:w-6/12">
          <DisplayImageFromNextCloudinary
            src="partnership_Hero_Image_ozntgb"
            height={800}
            width={800}
            alt="partnership hero image"
            classname="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}
