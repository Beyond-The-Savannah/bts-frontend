export default function RemoteJobListingErrorUI() {
  return (
    <>
      <section className="container mx-auto min-h-screen">
        <div className="flex flex-wrap pt-40 items-center justify-center gap-8">
          <div className="border rounded-xl w-5/12 h-40 bg-slate-50 text-center space-y-4 px-8 py-4">
            <p className=" text-red-400">
              Ops, Looks like we have an issue fetching the remote jobs.
            </p>
            <p className="font-bold text-blue-400">
              Please refresh the page, or try again later.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
