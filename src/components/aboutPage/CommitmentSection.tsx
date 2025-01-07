import { Link } from "next-view-transitions";
import { Button } from "../ui/button";

export default function CommitmentSection() {
  return (
    <>
      <section className="container mx-auto px-4 h-[60vh] flex flex-col justify-center my-20 ">
        <div className=" text-balance space-y-4  max-w-7xl mx-auto">
          <h1 className="capitalize text-center text-3xl lg:text-5xl text-balance font-bold">
            Our Committment To You
          </h1>
          <p className="text-lg lg:text-xl w-8/12 text-start mx-auto">
            We at Beyond the Savannah, understand that the landscape of work is
            changing. With the rise of remote work, professionals now have the
            chance to explore roles that were once confined to specific
            locations. Our team is dedicated to helping you navigate this new
            terrain, offering a range of services designed to enhance your
            employability and streamline your job search.
          </p>
        </div>
        <div className="max-w-md mx-auto my-12 flex justify-center items-center gap-4">
        <Link href='/find-jobs'>
            <Button size='lg' className="text-base border-amber-100 bg-amber-100 text-black  hover:bg-amber-50 hover:scale-105 transition duration-500">
              View Remote Opennings
            </Button>
        </Link>
          <p className="text-lg">or</p>
          <Link href='/#services'>
            <Button size='lg' className="text-base border-amber-400 bg-amber-400 text-black hover:bg-amber-300 hover:scale-105 transition duration-500">
              Try Our Services
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
