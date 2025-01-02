export default function ServicesSection() {
  return (
    <>
      <section className="my-20">
        <div className="">
          <h2 className="text-xl">Our Services</h2>
          <div className="border-2 rounded-md border-amber-200 w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">
            How we can help you
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 my-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className=" bg-slate-200 rounded-lg h-96 w-[30rem]"
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}
