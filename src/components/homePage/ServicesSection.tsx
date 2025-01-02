export default function ServicesSection() {
  return (
    <>
      <section className="my-20">
        <div className="">
          <p className="">Our Services</p>
          <div className="border-2 rounded-md border-amber-200 w-24"></div>
          <h2 className="capitalize text-3xl font-bold  mt-2">
            How we can help you
          </h2>
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
