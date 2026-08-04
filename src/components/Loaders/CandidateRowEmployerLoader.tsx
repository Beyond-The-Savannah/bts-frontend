

export default function CandidateRowEmployerLoader() {
    const fakeRows = [1, 2, 3, 4,5,6 ];
  return (
    <>
    <section className="min-h-[85dvh] w-full px-4">
       
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
  )
}
