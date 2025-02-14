import Packages from "@/components/Customer/Packages";

export default function CustomerDefaultPage() {
  return (
    <section className="px-4">
      <div className="grid place-content-center h-screen w-screen text-black">
        {/* <h2 className="text-xl">Customer DashBoard</h2> */}
        <Packages/>
      </div>
    </section>
  );
}
