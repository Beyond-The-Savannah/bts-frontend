import { Button } from "../ui/button";

export default function NewsLetterSection() {
  return (
    <>
      <section className="container mx-auto px-4 mt-64 h-full lg:h-[50vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">News letter</h2>
          <div className="border-2 rounded-md border-amber-200 w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">
            Get curated, remote jobs listings
          </p>
        </div>
        <div className="max-w-3xl mx-auto my-8">
          <div className="text-center text-balance space-y-8 py-4 px-8 bg-amber-100 rounded-lg">
            <article>
                <p className="text-3xl font-semibold">
                Don&apos;t miss out on applying for your dream remote job.
                </p>
                <p className="c">
                Get remote jobs listings that are hiring worldwide in your inbox
                as well as updates in the remote world trends. Unsubscribe
                anytime. No spam, guaranteed.
                </p>
            </article>
            <form action="" className=" flex flex-col gap-4">
                <input type="email" name="email" id="" className="bg-white text-black rounded-lg py-2" />
                <Button type="submit" className="text-base bg-green-600 hover:bg-green-700 w-64 mx-auto">
                    Subscribe
                </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
