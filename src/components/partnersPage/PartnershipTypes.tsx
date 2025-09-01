import { partnershipType1 } from "@/staticData/partnersPage";
import { SquarePlus } from "lucide-react";
// import PreviewPool from "./PreviewPool";

export default function PartnershipTypes() {
  return (
    <section className="min-h-[60dvh] bg-bts-BrownTwo">
      <div className="container mx-auto px-4 pb-20">
        <div className="py-10">
          <p className="text-l">Collaboration in Many Forms</p>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <h2 className="text-4xl font-bold text-bts-GreenOne mt-2">
            Types of Partnerships
          </h2>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-x-1 gap-y-12 pt-10">
          {partnershipType1.map((type) => (
            <div
              key={type.id}
            //   className="w-full min-h-[54dvh] md:w-5/12 bg-white rounded-lg px-4 py-8 space-y-8 shadow-md hover:shadow-2xl hover:scale-105 transition duration-500"
              className="w-full min-h-[28rem] lg:w-[48%] bg-white rounded-lg px-4 py-8 space-y-8 shadow-md hover:shadow-2xl hover:scale-105 transition duration-500"
            >
              <p className="text-xl font-semibold">{type.heading}</p>
              <div className="border-2 rounded-md border-bts-BrownTwo w-full -mt-20"></div>

              <p className="pl-6">
                <span className="font-semibold px-1">Who are you:</span>
                {type.subheading}
              </p>
        
              <div className="pl-6  space-y-4 ">
                <span className="font-semibold px-1">How you benefit:</span>
                {type.benefits.map((benefit) => (
                  <div key={benefit.id} className="flex gap-2 items-center text-sm">
                    <p>
                    <SquarePlus className="text-bts-BrownFive size-5" />
                    </p>
                    <p>{benefit.gain}</p>
                  </div>
                ))}
                {/* {type.heading=="For Hiring Partners" &&(<PreviewPool/>)} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
