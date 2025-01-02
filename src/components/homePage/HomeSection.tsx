import { Button } from "../ui/button";
import Image from "next/image";

export default function HomeSection() {
  return (
    <>
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <div className=" space-y-4 text-balance">
          <h1 className="capitalize text-5xl  font-bold">
                Empowering your career journey through seamless connections.
          </h1>
          <p className="capitalize">
            Seamless connections, soaring carrers, elevate yours with beyond the savannah!
          </p>
          <Button className="bg-amber-400 hover:bg-amber-500 text-base">
                View our Services
          </Button>
        </div>
        <div className=" bg-amber-50">
            <Image
                src={'https://i.postimg.cc/V6JsZmXH/DSC-0811-copyk-removebg-preview.png'}
                width={800}
                height={800}
                alt="LORRAINE founder of beyond the savannah"
                className="object-conver h-full w-full  -mt-48"
            />
        </div>
      </section>
    </>
  );
}
