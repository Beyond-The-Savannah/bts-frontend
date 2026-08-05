import NavigationSection from "@/components/NavigationSection";
import { SignUp } from "@clerk/nextjs";
import React from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default function SignUpPage() {
  return (
    <>
      {/* <section className="h-screen grid place-content-center px-4"> */}
      <NavigationSection />
      <section className="h-screen grid grid-cols-1 lg:grid-cols-2 ">
        <div className="bg-none lg:bg-[url(https://res.cloudinary.com/dh8qlzbzk/image/upload/v1755351613/sign-in_image_ahsrz9.jpg)] lg:bg-cover lg:bg-no-repeat lg:bg-center"></div>
        <div className="min-h-screen bg-[url(https://res.cloudinary.com/dh8qlzbzk/image/upload/v1755351613/sign-in_image_ahsrz9.jpg)] bg-cover bg-no-repeat bg-center lg:bg-none grid place-content-center">
          <SignUp />
        </div>
      </section>
    </>
  );
}
