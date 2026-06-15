import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";


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
              {/* We are committed to your success. Our approach is client-centric;
              we focus on understanding your individual goals and challenges. By
              providing tailored support and resources, we aim to empower you to
              take control of your career path. */}
              We are fully committed to your hiring success. We align our
              sourcing strategy directly with your unique company culture and
              operational goals. By delivering a curated pipeline of
              remote-ready professionals, we remove the friction from global
              recruitment, empowering your organization to hire with absolute
              confidence.
            </p>
          </div>
          <div className="col-span-12 md:col-start-2 lg:col-span-3 md:col-end-10 lg:col-end-12">
            {/* <Link href="/find-job">
              <Button
                size="lg"
                className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
              >
                View Remote Opportunities
              </Button>
            </Link> */}
            <div className="flex flex-wrap items-center justify-center  gap-x-2 gap-y-4">
           <Dialog>
              <DialogTrigger asChild>
                <Link
                  href="https://calendly.com/beyondthesavannah-info/partner-discovery-call"
                  target="partners-calendarly-page-show"
                >
                  <Button
                    size="lg"
                    className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
                  >
                    Start The Conversation
                  </Button>
                </Link>
              </DialogTrigger>
              <DialogContent className="min-h-[80dvh] max-w-[99dvw] md:max-w-[70dvw]">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                  <iframe
                    name="partners-calendarly-page-show"
                    src="https://calendly.com/beyondthesavannah-info/partner-discovery-call"
                    className="h-full w-full"
                  ></iframe>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          {/* <Button variant="outline" size="lg" asChild>
            <Link href="/Employer" className="w-[15.4rem]">
                Sign In As Employer
            </Link>
          </Button> */}
        </div>
          </div>
        </div>
      </section>
    </>
  );
}
