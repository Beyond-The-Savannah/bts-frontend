import InfoCards from "@/components/Employer/HomeSection/InfoCards";
import Interviews from "@/components/Employer/HomeSection/Interviews";
import PostJobs from "@/components/Employer/HomeSection/PostJobs";


export default function page() {
  return (
    <>
    <section className="px-4">
      <div className="c">
        <h2 className="text-3xl font-semibold mb-10">Dashboard</h2>
        <InfoCards/>
      </div>
      <div className="flex gap-8">
        <div className="w-full  md:w-6/12 mx-auto bg-slate-100/50 rounded-md my-10 px-4">
          <h3 className="text-lg font-semibold my-8">Recently Posted Jobs</h3>
          <PostJobs/>
        </div>
        <div className="w-full mx-auto bg-slate-100/60 rounded-md my-10 px-4 md:w-6/12">
          <h3 className="text-lg font-semibold my-8">Interviews Schedule</h3>
          <Interviews/>
        </div>

      </div>
    </section>
    </>
  )
}
