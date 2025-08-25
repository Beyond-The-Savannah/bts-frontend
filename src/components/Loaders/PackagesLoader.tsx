export default function PackagesLoader() {
  return (
    <>
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-x-2 gap-y-4 items-center justify-evenly pt-12">
        {[1, 2, 3.4].map((index) => (
          <div
            key={index}
            className="min-h-96 w-64 lg:w-full border bg-bts-BrownOne animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    </>
  );
}
