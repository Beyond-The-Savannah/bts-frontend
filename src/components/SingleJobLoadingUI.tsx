export default function SingleJobLoadingUI() {
  return (
    <>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-wrap lg:flex-nowrap  items-start justify-center py-10 gap-8">
          <div className="animate-pulse border rounded-xl w-full md:w-[40vw]  h-[70vh] bg-bts-BrownOne px-8 py-4"></div>
          <div className="  w-full md:w-5/12 space-y-4  px-8 py-4">
            {[1, 2, 3, 4].map((item2) => (
              <div
                key={item2}
                className=" animate-pulse border rounded-xl w-full h-64 bg-bts-BrownFive px-8 py-4"
              ></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
