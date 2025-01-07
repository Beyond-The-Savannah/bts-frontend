export default function SingleJobLoadingUI() {
  return (
    <>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-wrap pt-40 items-center justify-center gap-8">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="animate-pulse border rounded-xl w-5/12 h-80 bg-slate-100 px-8 py-4"
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}
