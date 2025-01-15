"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ErrorPage() {
  return (
    <>
      <section className="h-screen grid place-content-center px-4">
        <div className=" space-y-4 text-center">
          <div>
            <DotLottieReact
              src="https://lottie.host/08602ae9-5c8b-4b51-8a75-8b340479df0e/rqY8JXnlQr.lottie"
              loop
              autoplay
              className="size-9/12 mx-auto"
            />
          </div>
          <p className="text-lg font-medium">
            Looks like we have encountered an technical issue, <br /> please try
            again later
          </p>
        </div>
      </section>
    </>
  );
}
