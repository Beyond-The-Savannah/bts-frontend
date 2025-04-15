import { Egg } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Link } from "next-view-transitions";

export default function RemoteWorkStarterBundleDiscountAlert() {
  return (
    <>
      <Alert className="max-w-5xl mx-auto grid place-content-center bg-lime-100  px-4 py-1 top-20">
        <div className="flex items-center gap-6 text-sm">
          <Egg className="text-green-400" />
          <AlertTitle>Easter season offer</AlertTitle>
          <AlertDescription>
            Enjoy the same package at a slashed price: 
            <Link href={"/service/remote-work-starter-bundle"} className="underline underline-offset-2 px-3">
              Remote Work Starter Bundle
            </Link>
          </AlertDescription>
        </div>
      </Alert>
    </>
  );
}
