// export const dynamic = "force-dynamic";

import PackageOptionSection from "@/components/Customer/PackageOptionSection";
import SubscriptionDetails from "@/components/Customer/SubscriptionDetails";
import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import DashboardPageLoader from "@/components/Loaders/DashboardPageLoader";
import PackagesLoader from "@/components/Loaders/PackagesLoader";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function CustomerDefaultPage() {
  const userSubscriptionInformation = await GetUserSubscriptionInformation();

  const user = await currentUser();
  // console.log("USER SUB INFO", userSubscriptionInformation)

  // console.log("BTS USER FROM CUSTOMER PAGE",validUser)

  const byPassEmailAddresses = [
    `dennismugera254@gmail.com`,
    `victornmungai@gmail.com`,
    `wayuabritney@gmail.com`,
    `otienocynderella@gmail.com`,
    `mkabanesandra@gmail.com`,
    `marcellakemunto@yahoo.com`,
    `graceakinyi1991@gmail.com`,
    `nonigatura@gmail.com`,
    `fmmusembi96@gmail.com`,
    `henrychelele@gmail.com`,
    `a.wanjirunina@gmail.com`,
    `lilykimeu@gmail.com`,
    `kenmuvya22@gmail.com`,
    `mwawakamark@gmail.com`,
    `a.wanjirunina@gmail.com`,
    `cmweru2002@gmail.com`,
    `mutheustacey30@gmail.com`,
    `jsamande21@gmail.com`,
    `wanjirugichu7@gmail.com`,
    `bkirinya@gmail.com`,
    `k8karanja@gmail.com`,
    `mosesmwangi007@gmail.com`,
    `maureengakiavih@gmail.com`,
    `mercynderitu183@gmail.com`,
    `carolynmnjeri@gmail.com`,
    `hassenga54@gmail.com`,
    `belindaschira@gmail.com`,
    `wangui.c.njeri@gmail.com`,
    `jochesoli2015@gmail.com`,
    `willymathuva@gmail.com`,
    `winnie.gacheruw@gmail.com`,
    `sharleen.maina98@gmail.com`,
    `loismburuga@gmail.com`,
    `marthatemesghen@gmail.com`,
    `julietkaranja@gmail.com`,
    `kingoriwa@gmail.com`,
    `mdorcas864@gmail.com`,
    `daisygombe@gmail.com`,
    `sue.kinyanjui@gmail.com`,
    `megankesbai@gmail.com`,
    `faith.sikobe3@gmail.com`,
    `michellemasiga@gmail.com`,
    `nikolaiochwada@gmail.com`,
    `myrakagai05@gmail.com`,
    `zeldafaith@gmail.com`,
    `cwanjirumbugua@gmail.com`,
    `emanono@gmail.com`,
    `teddy254mutinge@gmail.com`,
    `myrakagai05@gmail.com`,
    //   `lizanaropi@gmail.com`,
    //   `starmugure@gmail.com`,
    //   `fmmusembi96@gmail.com`,
    //   `imokolabarbra@gmail.com`,
    `patienceat63@gmail.com`,
    `gitoshmbae@gmail.com`,
  ];

  const allowByPassUser = byPassEmailAddresses.includes(
    user?.emailAddresses[0].emailAddress as string
  );
  const isValidSubscription = userSubscriptionInformation?.some(
    (subscription) => {
      return ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      );
    }
  );

  return (
    <>
      {/* {isValidSubscription ? <SubscriptionDetails /> : <PackageOptionSection />} */}
      {isValidSubscription || allowByPassUser == true ? (
        <Suspense fallback={<DashboardPageLoader />}>
          <SubscriptionDetails />
        </Suspense>
      ) : (
        <Suspense fallback={<PackagesLoader />}>
          <PackageOptionSection />
        </Suspense>
      )}
    </>
  );
}
