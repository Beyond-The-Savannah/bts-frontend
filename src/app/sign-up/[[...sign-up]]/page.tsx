import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function SignUpPage() {
  return (
    <>
      <section className="h-screen grid place-content-center px-4">
        <SignUp />
      </section>
    </>
  );
}
