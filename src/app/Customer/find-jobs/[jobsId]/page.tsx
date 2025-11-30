import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import ViewJob from "@/components/Customer/ViewJob";
import SingleJobLoadingUI from "@/components/Loaders/SingleJobLoadingUI";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ jobsId: string }>;
}) {
  const jobsId = (await params).jobsId;

  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  

  const jobsListingSubscriptionDetails = userSubscriptionInformation?.filter(
    (subscription) =>
      subscription.amount != 600000 &&
      ["active", "attention", "non-renewing", "completed"].includes(
        subscription.status.toLowerCase()
      )
  )[0];
  const user = await currentUser();

  const byPassEmailAddresses = [
    `fmmusembi96@gmail.com `,
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
    // `lizanaropi@gmail.com`,
    // `starmugure@gmail.com`,
    // `fmmusembi96@gmail.com`,
    // `imokolabarbra@gmail.com`,
    `patienceat63@gmail.com`,
    `gitoshmbae@gmail.com`,
  ];

  if (jobsListingSubscriptionDetails == undefined && !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
  ) {
    redirect("/Customer");
  }

  return (
    <div className="container mx-auto">
      <div className="px-4">
        <h2 className="text-xl">Global Open Roles</h2>
        <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
        <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
          Remote Opportunity
        </p>
      </div>
      <Suspense fallback={<SingleJobLoadingUI />}>
        <ViewJob jobsId={jobsId} />
      </Suspense>
    </div>
  );
}
