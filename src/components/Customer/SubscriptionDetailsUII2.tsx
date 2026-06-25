import { subscriptionDetailsProps, ValidSubscriptionTwo } from "@/types/subscriptions";
// import CareerSelection from "./CareerSelection";
import ResumeUpload2 from "./ResumeUpload";
import ResumeUpload3 from "./ResumeUpload3";
import CareerSelectionComponent2 from "./CareerSelectionComponent2";
import { ResumeUploadedProps } from "@/types/globals";


export default function SubscriptionDetailsUI2({
  jobViewSubscriptionData,
  whatsAppSubscribtionData,
  careerEmailNotification,
  resumeUploaded
}: {
  jobViewSubscriptionData?: ValidSubscriptionTwo;
  whatsAppSubscribtionData?:subscriptionDetailsProps
  careerEmailNotification:string
  resumeUploaded:ResumeUploadedProps
}) {
  return (
    <>
      <section className="pt-4 pb-20">
        <div className="w-full mx-auto px-4">
          <h2 className="text-xl">Hi {jobViewSubscriptionData?.firstName ?? "There"}</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2"></p>
          <div className="min-h-[70vh] mt-10 md:mt-20">
            <div className="flex-col gap-8">
              <div className="flex flex-wrap justify-between space-y-4 rounded-lg bg-bts-BrownOne/50 px-6 py-12 w-full flex-1 ">
                <div className="space-y-4">
                  <p className="font-semibold text-xl">
                    Jobs Listings Subscription details
                  </p>
                  <p className="flex  flex-col">
                    <span className="text-xs">
                      Subscription Email Address:{" "}
                    </span>
                    <span className="text-sm lg:text-base font-semibold ml-1">
                      {jobViewSubscriptionData?.emailAddress ?? "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Current Subscription Plan: </span>
                    <span className="font-semibold ml-1">{jobViewSubscriptionData?.plan ?? "No information available"}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Current Subscription Status:{" "}
                    </span>
                    <span className="font-semibold ml-1">
                      {jobViewSubscriptionData?.planStatus ?? "No information available"}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">
                      Next Subscription Payment Date:{" "}
                    </span>
                    <span className="font-semibold ml-1">{jobViewSubscriptionData?.endDate ?? "No information available"}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-xs">Subscription Source Number: </span>

                    <span className="font-semibold ml-1">{ jobViewSubscriptionData?.endDate!=undefined ? "XXXX XXXX" :"No information available"} </span>
                  </p>
                </div>
              </div>

              {/* whatsapp subscription details  */}
              {whatsAppSubscribtionData != undefined ? (
                <div className="flex flex-wrap justify-between space-y-4 rounded-lg mt-10 bg-bts-BrownOne/50 px-6 py-12 w-full flex-1">
                  <div className="space-y-4">
                    <p className="font-semibold text-xl">
                      Whatsapp Subscription details
                    </p>
                    <p className="flex  flex-col">
                      <span className="text-xs">
                        Subscription Email Address:{" "}
                      </span>
                      <span className="text-sm lg:text-base font-semibold ml-1">
                        {whatsAppSubscribtionData?.customer?.email ?? ""}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Plan:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscribtionData?.plan?.name ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Current Subscription Status:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscribtionData?.status ??
                          "No information available"}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Next Subscription Payment Date:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        {whatsAppSubscribtionData?.next_payment_date}
                      </span>
                    </p>
                    <p className="flex flex-col">
                      <span className="text-xs">
                        Subscription Source Number:{" "}
                      </span>
                      <span className="font-semibold ml-1">
                        XXXX XXXX{" "}
                        {whatsAppSubscribtionData?.authorization?.last4 ??
                          "No information available"}
                      </span>
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            {/* {parseInt(jobViewSubscriptionData?.planCost as string) !== 600000 && jobViewSubscriptionData?.endDate!=undefined ? ( */}
            {/* {parseInt(jobViewSubscriptionData?.planCost as string) !== 600000  ? ( */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                {/* <CareerSelection emailAddress={jobViewSubscriptionData?.emailAddress as string} /> */}
                <CareerSelectionComponent2 
                userId={jobViewSubscriptionData?.userId as string}
                career={careerEmailNotification}/>
                <ResumeUpload2 />
                <ResumeUpload3 userId={jobViewSubscriptionData?.userId as string}
                resumeData={resumeUploaded}
                />
              </div>
            {/* ) : null} */}
          </div>
        </div>
      </section>
    </>
  );
}
