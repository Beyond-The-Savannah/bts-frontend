"use client";

import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <>
      <section className="h-screen grid place-content-center px-4">
        <div className=" space-y-4 text-center">
          <div>
            <DotLottieReact
              src="https://lottie.host/9b548843-5e51-4ab7-955d-7ec92d367c3c/Eqo17iXW8n.lottie"
              loop
              autoplay
              className="size-9/12 mx-auto"
            />
          </div>
          <p className="text-lg font-medium">
            Looks like we can&apos;t find that page
          </p>
          <p className="c"> lets take you back or head home</p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="bg-bts-BrownThree/70 hover:bg-bts-BrownThree hover:text-white"
            >
              Back Where I Was
            </Button>
            <Link href="/" className="py-2 px-4">
              <Button className="bg-bts-BrownThree hover:bg-bts-BrownThree/70 hover:text-black">
                Sweet Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
