import FindJobs from "@/components/Customer/FindJobs";

export default function page() {
  return (
    <section className="pt-4 pb-20">
      <div className="c">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunities
        </p>
      </div>
      <div className="">
        <FindJobs/>
      </div>
    </section>
  );
}
