import AddCompanyForm from "@/components/Admin/AddCompanyForm";
import React from "react";

export default function AdminDefaultpage() {
  return (
    <>
      <section className="px-4 space-y-6">
        <div className="grid place-content-center ">
          <p className="text-center m">Admin Home Page</p>
        </div>
        <div className="c">
          <AddCompanyForm />
        </div>
      </section>
    </>
  );
}
