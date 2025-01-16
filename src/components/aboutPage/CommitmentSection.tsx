import { Link } from "next-view-transitions";
import { Button } from "../ui/button";

export default function CommitmentSection() {
  return (
    <>
      <section className="container mx-auto px-4 min-h-[60vh] flex flex-col justify-center">
        <div className="">
          <h2 className="text-xl">Our Goal</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold  mt-2">
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
            <Link href="/find-jobs">
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
    // <>
    //   <section className="container mx-auto px-4 h-[60vh] flex flex-col justify-center my-20 ">
    //     <div className=" text-balance space-y-4  max-w-7xl mx-auto">
    //       <h1 className="capitalize text-center text-3xl lg:text-5xl text-balance font-bold">
    //         Our Committment To You
    //       </h1>
    //       <p className="text-lg lg:text-xl w-10/12 md:w-9/12 text-center  mx-auto">
    //         {/* We at Beyond the Savannah, understand that the landscape of work is
    //         changing. With the rise of remote work, professionals now have the
    //         chance to explore roles that were once confined to specific
    //         locations. Our team is dedicated to helping you navigate this new
    //         terrain, offering a range of services designed to enhance your
    //         employability and streamline your job search. */}
    //         We are committed to your success. Our approach is client-centric; we focus on understanding your individual goals and challenges. By providing tailored support and resources, we aim to empower you to take control of your career path.
    //       </p>
    //     </div>
    //     <div className="max-w-md mx-auto my-12 flex flex-wrap lg:flex-nowrap justify-center items-center gap-4">
    //       <div className="c">
    //         <Link href="/find-jobs">
    //           <Button
    //             size="lg"
    //             // className="text-base border-amber-100 bg-amber-100 text-black  hover:bg-amber-50 hover:scale-105 transition duration-500"
    //             className="text-base border-bts-BrownTwo bg-bts-BrownTwo text-black  hover:bg-bts-BrownFive hover:scale-105 transition duration-500"
    //           >
    //             {/* View Remote Opennings */}
    //              View Remote Opportunities
    //           </Button>
    //         </Link>
    //       </div>
    //       {/* <div className="flex flex-wrap md:flex-nowrap gap-4 items-center text-center">
    //         <p className="text-lg">or</p>
    //         <Link href="/#services">
    //           <Button
    //             size="lg"

    //             className="text-base border-bts-BrownThree bg-bts-BrownThree text-black hover:bg-bts-BrownFour hover:text-white hover:scale-105 transition duration-500"
    //           >
    //             Try Our Services
    //           </Button>
    //         </Link>
    //       </div> */}
    //     </div>
    //   </section>
    // </>
  );
}
