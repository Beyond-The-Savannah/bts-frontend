import { poolCandidateGroup3 } from "@/staticData/partnersPage";
import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";

export default function PoolOfCandidates() {
  return (
    <section className="min-h-[40dvh]">
      <div className="container mx-auto px-4 pb-20">
        <div className="py-10">
          <p className="text-l">Talent ready for your business needs</p>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <h2 className="text-4xl font-bold text-bts-GreenOne mt-2">
            Pool of Canidates
          </h2>
          <div className="flex flex-nowrap  gap-x-12 gap-y-12 overflow-x-auto scrollbar-thin scrollbar-thumb-bts-BrownFive scrollbar-track-bts-BrownTwo py-10 mt-10">
            {poolCandidateGroup3.map((candidate) => (
              <div
                key={candidate.id}
                className="w-[16rem] md:w-[24rem]  border rounded-lg"
              >
                <DisplayImageFromNextCloudinary
                  src={candidate.imageSource}
                  height={400}
                  width={400}
                  alt={`${candidate.title} image`}
                  classname="object-cover w-full h-64 rounded-t-lg"
                />
                <div className="px-2 md:px-4 py-6 text-center w-[16rem] md:w-[24rem]">
                  <p className="text-lg font-bold">{candidate.title}</p>
                  <p className="text-sm">{candidate.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
