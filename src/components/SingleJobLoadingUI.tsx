export default function SingleJobLoadingUI() {
  return (
    <>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-wrap items-start justify-center py-10 gap-8">
          {/* {[1, 2].map((item) => ( */}
          <div
            // key={item}
            // className="animate-pulse border rounded-xl w-5/12 space-y-4 bg-slate-100 px-8 py-4"
            className="  w-5/12 space-y-4  px-8 py-4"
          >
            {[1, 2, 3, 4].map((item2) => (
              <div
                key={item2}
                className=" animate-pulse border rounded-xl w-full h-64 bg-slate-200 px-8 py-4"
              ></div>
            ))}
          </div>
          <div className="animate-pulse border rounded-xl w-[30vw]  h-[70vh] bg-slate-100 px-8 py-4"></div>
          {/* ))} */}
        </div>
      </section>
    </>
  );
}
