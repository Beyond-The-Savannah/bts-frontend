
export default function CandidateRowLoader() {
  const fakeRows = [1, 2, 3, 4,5,6 ];
  return (
    <>
      <section className="min-h-[85dvh] w-full px-4">
        <div className="mt-8 mb-2 flex  items-center justify-between gap-1">
            <div className="w-[20dvw] h-10 rounded-lg bg-bts-BrownOne/50   animate-pulse mb-4"></div>
            <div className="w-[15dvw] h-14 rounded-lg bg-bts-BrownOne/50   animate-pulse mb-4"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 my-4">
          {fakeRows.map((row, index) => (
            <div
              key={index}
              className="w-[65dvw] h-24 rounded-lg bg-bts-BrownOne/50   animate-pulse mb-4"
            ></div>
          ))}
        </div>
      </section>
    </>
  );
}
