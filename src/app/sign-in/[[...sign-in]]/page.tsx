import { SignIn } from "@clerk/nextjs";

export default function SignPage() {
  return (
    <>
      <section className="h-screen grid place-content-center px-4">
        <SignIn />
      </section>
    </>
  );
}
