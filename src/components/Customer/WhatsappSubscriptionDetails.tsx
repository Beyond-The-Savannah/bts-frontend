import { Button } from "../ui/button";


export default function WhatsappSubscriptionDetails() {
  return (
    <>
    <section className="pt-4 pb-20">
    <div className="w-full mx-auto px-4">
          <h2 className="text-xl">Hi {user?.firstName}</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            {/* Subscription details */}
            {/* Hi {user?.firstName} */}
          </p>
          <div className="min-h-[70vh] mt-20">
            <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-evenly">
              <div className="space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full lg:w-[32rem]">
                <p className="font-semibold text-xl">Subscription details</p>
                <p className="flex flex-col">
                  <span className="text-xs">Subscription Email Address: </span>
                  <span className="font-semibold ml-1">
                    {userSubscriptionInformation?.customer.email}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">Current Subscription Plan: </span>
                  <span className="font-semibold ml-1">
                    {userSubscriptionInformation?.plan.name}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">Current Subscription Status: </span>
                  <span className="font-semibold ml-1">
                    {userSubscriptionInformation?.status}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">
                    Next Subscription Payment Date:{" "}
                  </span>
                  <span className="font-semibold ml-1">
                    {convertedNextSubscriptionDate}
                  </span>
                </p>
                <p className="flex flex-col">
                  <span className="text-xs">Subscription Card Number: </span>
                  <span className="font-semibold ml-1">
                    XXXX XXXX {userSubscriptionInformation?.authorization.last4}
                  </span>
                </p>
              </div>
              <div className="space-y-4 rounded-lg bg-bts-BrownOne/50 pr-6 py-12 w-full lg:w-[32rem]">
                <p className="font-semibold text-xl px-9">Subscription guide</p>
                {userSubscriptionInformation?.status == "non-renewing" ? (
                  <>
                    <div className="bg-yellow-100 px-4 py-2 max-w-lg mx-auto  flex gap-2 items-center">
                      <CircleAlert />
                      <p className="text-xs">
                        Your subscription status means that can your enjoy the
                        stated subscription plan services up to the Next
                        Subscription Payment Date timeline.
                      </p>
                    </div>
                  </>
                ) : null}

                <div className="border-l-[1.5rem] border-blue-400 bg-blue-100 px-4 py-2 rounded-l text-sm">
                  <p>
                    To change your card details you can use the Manage your
                    Subscrption button
                  </p>
                </div>
                <div className="border-l-[1.5rem] border-red-400 bg-red-100 px-4 py-2 rounded-l text-sm">
                  <p>
                    To cancel your subscrption can use the Manage your
                    Subscrption button
                  </p>
                </div>
                <div className="px-8">
                  <form action={handleManageSubscription}>
                    <Button variant="outline" size="sm" type="submit">
                      Manage your Subscrption
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            {/* <CareerSelection /> */}
          </div>
    </section>
    </>
  )
}
