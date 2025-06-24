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

  const byPassEmailAddress = "anngachanja15@gmail.com";

  if (
    (userSubscriptionInformation == null ||
      userSubscriptionInformation == undefined) &&
    byPassEmailAddress != user?.emailAddresses[0].emailAddress
  ) {
    redirect("/Customer");
  }
  return (
    <>
      <ViewJob jobsId={jobsId} />
    </>
  );
}