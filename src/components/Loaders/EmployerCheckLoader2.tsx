// import { Loader } from "lucide-react";

export default function EmployerCheckLoader2() {
  return (
    <>
      <div className="grid place-content-center max-w-6xl mx-auto min-h-[80dvh] bg-slate-100 mt-20">
        <div className="w-[60dvw] mx-auto min-h-[50dvh] bg-bts-BrownOne rounded-md animate-pulse grid place-content-center">
          {/* <Loader className="mx-auto animate-spin" /> */}
          {[1, 2, 3,].map((item, indx) => (
            <div
              key={indx}
              className="w-[55dvw] h-20 mx-auto bg-bts-BrownFive rounded-md animate-pulse mb-4"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
