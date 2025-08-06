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
    `ayuny.farah@gmail.com`,
    `wambui4wachira@gmail.com`,
    `jacklinewaceke199@gmail.com`,
    `dmuthoni487@gmail.com`,
    `marynicholas777@gmail.com`,
    `tracygwangui@gmail.com`,
    `dianacheserem@gmail.com`,
    `kinyachiokz@gmail.com`,
    `onyango.mary15@gmail.com`,
    `sonimuthoni23@gmail.com`,
    `caroline_kairuthi@yahoo.com`,
    `kimothoevalyne@gmail.com`,
  ];

  if (
    (userSubscriptionInformation == null ||
      userSubscriptionInformation == undefined) &&
    !byPassEmailAddresses.includes(
      user?.emailAddresses[0].emailAddress as string
    )
    // byPassEmailAddress != user?.emailAddresses[0].emailAddress
  ) {
    redirect("/Customer");
  }
  return (
    <>
      <ViewJob jobsId={jobsId} />
    </>
  );
}
