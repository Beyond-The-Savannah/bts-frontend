import { Loader } from "lucide-react";

export default function EmployerCheckLoader() {
  return (
    <>
      <div className="grid place-content-center max-w-6xl mx-auto min-h-[80dvh] bg-slate-100 mt-20">
        <div className="w-[60dvw] mx-auto min-h-[50dvh] bg-bts-BrownOne rounded-md animate-pulse grid place-content-center">
          <Loader className="mx-auto animate-spin" />
        </div>
      </div>
    </>
  );
}
