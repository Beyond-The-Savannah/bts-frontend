import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";

export default function loading() {
  return (
    <>
      <section className="min-h-[85dvh]">
        <DashboardPageLoader />
      </section>
    </>
  );
}
