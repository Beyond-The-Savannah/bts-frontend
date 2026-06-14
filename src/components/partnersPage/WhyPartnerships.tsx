import { reasonsForPartnership } from "@/staticData/partnersPage";
import { CirclePlus } from "lucide-react";

export default function WhyPartnerships() {
  return (
    <section className="min-h-[60dvh] bg-bts-BrownOne mt-0 md:-mt-20 z-10">
      <div className="container mx-auto px-4 pb-20">
        <div className="py-10">
          <p className="text-l">Partnerships Matter</p>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <h2 className="text-4xl font-bold text-bts-GreenOne mt-2">
            Why We Partner
          </h2>
        </div>
        <div className="max-w-4xl mx-auto grid place-content-center leading-7  space-y-6">
          <p className="md:text-balanc text-center ml-0 lg:ml-10">
            {/* Every partnership helps unlock new pathways for individuals striving
            to thrive in the digital economy. Partnerships are at the heart of
            our mission. Together with our collaborators, we: */}
            We believe true empowerment happens when a company finds its ideal
            match. By partnering with organizations worldwide, we bridge the gap
            between global business needs and elite digital talent. Together
            with our collaborators, we:
          </p>
          <ul className="w-full mx-auto text-start pt-5 space-y-4  ml-0 md:ml-10">
            {reasonsForPartnership.map((reason) => (
              <li key={reason.id} className="flex items-center gap-2">
                <CirclePlus size={20} className="text-bts-BrownThree" />
                {reason.point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
