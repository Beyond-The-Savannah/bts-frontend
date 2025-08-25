import { Link } from "next-view-transitions";
import { Button } from "../ui/button";

export default function CommitmentSection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-[60vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Our Goal</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            Our Committment To You
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 items-center justify-center space-y-8 pb-20 pt-0 md:pt-20">
          <div className="col-span-12 md:col-start-2  md:col-end-12 lg:col-end-8">
            <p className="text-lg">
              We are committed to your success. Our approach is client-centric;
              we focus on understanding your individual goals and challenges. By
              providing tailored support and resources, we aim to empower you to
              take control of your career path.
            </p>
          </div>
          <div className="col-span-12 md:col-start-2 lg:col-span-3 md:col-end-10 lg:col-end-12">
            <Link href="/find-job">
              <Button
                size="lg"
                className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
              >
                View Remote Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
