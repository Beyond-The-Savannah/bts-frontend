export const dynamic = "force-dynamic";

import SavannahChatUi from "@/components/Customer/SavannahChatUi";
import DisplayImageFromNextCloudinary from "@/components/DisplayImageFromNextCloudinary";
import React from "react";

export default function page() {
  return (
    <>
      <section className="pt-4 px-4 pb-20">
        <div className="pl-0 md:pl-5">
          <div className="flex items-center gap-1">
            <h2 className="text-xl">Hi, I&apos;Am Savannah </h2>
            <DisplayImageFromNextCloudinary
              src="kazina_upvlpf"
              height={400}
              width={400}
              alt="kazina beyond the savannah ai assisant"
              classname="object-contain size-12"
            />
          </div>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-xl md:text-3xl font-bold text-bts-GreenOne mt-2">
            Your remote work assistant
          </p>
        </div>

        <SavannahChatUi />
      </section>
    </>
  );
}
