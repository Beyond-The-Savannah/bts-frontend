import { Link } from "next-view-transitions";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function PartnersCTASection() {
  return (
    <section className="min-h-[50dvh]">
      <div className="container mx-auto px-4">
        <div className="py-10">
          {/* <p className="text-l">Let&apos;s Build the Future of Work  Together</p> */}
          <p className="text-l">Ready to Transform Remote Hiring Together?</p>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <h2 className="text-4xl font-bold text-bts-GreenOne mt-2">
            Partner With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center justify-center space-y-8 pb-20 pt-0 md:pt-20">
          <div className="col-span-12 md:col-start-2  md:col-end-12 lg:col-end-8 space-y-4">
            <p className="text-lg">
              Whether you&apos;re a company looking for talent, an educator
              ready to empower learners, or a changemaker with a vision we want
              to hear from you.
            </p>
            <p className="text-lg">
              The future of work is remote, global, and diverse. Beyond the
              Savannah is at the forefront of this transformation, and
              we&apos;re looking for partners who want to shape this future with
              us.
            </p>
          </div>
          <div className="col-span-12 md:col-start-2 lg:col-span-3 md:col-end-10 lg:col-end-12">
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
              <DialogContent className="min-h-[80dvh] max-w-[70dvw]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
