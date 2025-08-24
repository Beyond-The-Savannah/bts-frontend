import { GetUserSubscriptionInformation } from "@/components/Customer/UserSubscriptionInformation";
import ViewJob from "@/components/Customer/ViewJob";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ jobsId: string }>;
}) {
  const jobsId = (await params).jobsId;
  const userSubscriptionInformation = await GetUserSubscriptionInformation();
  const user = await currentUser();

  const byPassEmailAddresses = [
    `onyango.mary15@gmail.com`,
    `kimothoevalyne@gmail.com`,
    `thothocaroline@gmail.com`,
  ];

  if (
    (userSubscriptionInformation == null ||
      userSubscriptionInformation == undefined) &&
    !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
  ) {
    redirect("/Customer");
  }
  return (
    <>
      <ViewJob jobsId={jobsId} />
    </>
  );
}
