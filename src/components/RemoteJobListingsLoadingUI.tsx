export default function RemoteJobListingsLoadingUI() {
  return (
    <>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-wrap  items-center justify-center gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div
              key={item}
              className="animate-pulse border rounded-xl w-5/12 h-40 bg-slate-100 px-8 py-4"
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}
