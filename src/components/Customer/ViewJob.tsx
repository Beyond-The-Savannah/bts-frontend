"use client";

import {
  useGetRemoteListingJobsUsingTanstack,
  useGetSingleRemiteListingUsingTanstack,
} from "@/remoteData/getData";
import SingleJobLoadingErrorUI from "../Loaders/SingleJobLoadingErrorUI";
import SingleJobLoadingUI from "../Loaders/SingleJobLoadingUI";
import Image from "next/image";
import { correctedParsedHTML, DateFormatter } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";
import { ArrowUpRight, CalendarPlus, CalendarX, MapPin } from "lucide-react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SubscribedUserProp } from "@/types/subscribedUser";
import axios from "axios";
import { getAnswer } from "@/app/actions/analyse-job-and-recommend";

import DisplayImageFromNextCloudinary from "../DisplayImageFromNextCloudinary";
import { readStreamableValue } from "ai/rsc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ViewJob({ jobsId }: { jobsId: string }) {
  const { user } = useUser();
  const {
    data: singleJob,
    isLoading,
    isError,
  } = useGetSingleRemiteListingUsingTanstack(jobsId);
  const { data: remoteJobs } = useGetRemoteListingJobsUsingTanstack();

  const filteredRemoteJob = remoteJobs?.find(
    (job) => job.jobsId == parseInt(`${jobsId}`)
  );

  const [generation, setGeneration] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loggedUser, setLoggedUser] = useState<SubscribedUserProp | undefined>(
    undefined
  );

  useEffect(() => {
    async function getLoggedUserData() {
      try {
        const result = await axios.get<SubscribedUserProp>(
          `https://efmsapi-staging.azurewebsites.net/api/BydUsers/getUserDetailsByEmail?email=${user?.primaryEmailAddress?.emailAddress}`
        );
        setLoggedUser(result.data);
      } catch (error) {
        console.log(
          "Error Getting logged User subscription information in resume upload",
          error
        );
      }
    }

    if (user?.primaryEmailAddress?.emailAddress) {
      getLoggedUserData();
    }
  }, [user?.primaryEmailAddress?.emailAddress]);
  return (
    <>
      <section className="container mx-auto   min-h-screen pt-2 md:pt-4 px-4">
        {/* <div className="">
          <h2 className="text-xl">Global Open Roles</h2>
          <div className="border-2 rounded-md border-bts-BrownThree w-36"></div>
          <p className="capitalize text-3xl font-bold text-bts-GreenOne mt-2">
            Remote Opportunity
          </p>
        </div> */}

        {isLoading && <SingleJobLoadingUI />}
        {isError && <SingleJobLoadingErrorUI />}

        <div className="py-10 flex flex-row-reverse flex-wrap md:flex-nowrap justify-center w-full  mx-auto  px-4 gap-4 lg:gap-x-24">
          <div className="w-full ">
            {filteredRemoteJob && (
              <div className="  gap-4 rounded-lg py-4 md:px-8 mb-12">
                <div className="">
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
                    <Image
                      src={filteredRemoteJob?.imageUrl}
                      height={400}
                      width={400}
                      alt={`${filteredRemoteJob.companyName} image`}
                      className="object-contain  size-12 md:size-32 border rounded-md"
                    />
                    <h3 className="text-3xl">
                      {filteredRemoteJob?.companyName}
                    </h3>
                  </div>

                  <div className="my-10 space-y-4">
                    <p className="text-xl font-medium ml-4">
                      <span className="font-bold block text-xs -ml-4 mr-1">
                        Role:
                      </span>
                      {filteredRemoteJob.jobName}
                    </p>
                    <p className="text-lg font-medium ml-4">
                      <span className="font-bold block text-xs -ml-4 mr-1">
                        Department:
                      </span>
                      {filteredRemoteJob.jobSubCategory}
                    </p>
                    <p className="text-base font-medium ml-4">
                      <span className="font-bold block text-xs -ml-4 mr-1">
                        {/* Location: */}
                        <MapPin />
                      </span>
                      {filteredRemoteJob.jobCategory}
                    </p>
                  </div>
                </div>
                <div className="space-y-8">
                  <p className="flex items-center gap-1 rounded-xl bg-green-100 text-green-400 py-1 px-4 w-72">
                    <span className="font-semibold text-sm mr-1">
                      Posted on:
                    </span>
                    <CalendarPlus size={24} className="" />
                    {DateFormatter(`${filteredRemoteJob.dateCreated}`)}
                  </p>
                  <p className="flex items-center gap-1 rounded-xl bg-red-100 text-red-400 py-1 px-4 w-72">
                    <span className="font-semibold text-sm mr-1">
                      Deadline on:
                    </span>
                    <CalendarX size={24} className="" />
                    {DateFormatter(`${filteredRemoteJob.endDate}`)}
                  </p>

                  <Button
                    variant="outline"
                    size="lg"
                    className={clsx(
                      "w-72 my-8 flex text-black border-bts-BrownFour bg-bts-BrownFour hover:bg-bts-BrownThree hover:text-white hover:scale-105 transition duration-500 text-base",
                      filteredRemoteJob.companyName == "Beyond the Savannah" &&
                        "hidden"
                    )}
                  >
                    <Link
                      href={`${filteredRemoteJob.jobUrl}`}
                      target="_blank"
                      className="flex items-center"
                    >
                      Apply for position
                      <ArrowUpRight size={4} />
                    </Link>
                  </Button>
                  {singleJob && loggedUser != undefined && (
                    <>
                      <div className="relative">
                        <Button
                          onClick={async () => {
                            setIsAnalyzing(true);
                            const { output } = await await getAnswer(
                              `My resume ${loggedUser.imageUrl}, role ${singleJob.map(
                                (listing) => {
                                  return listing.sectionDescription;
                                }
                              )}? `
                            );
                            for await (const delta of readStreamableValue(
                              output
                            )) {
                              setGeneration(
                                (curentGeneration) =>
                                  `${curentGeneration}${delta}`
                              );
                            }
                            setIsAnalyzing(false);
                          }}
                          disabled={isAnalyzing || generation != ""}
                          className="bg-bts-GreenOne hover:scale-105 transition duration-500 rounded  md:w-[19rem] flex"
                        >
                          {/* Anayalze my resume for this role */}
                          {isAnalyzing
                            ? "Analysing your resume..."
                            : "Analyse my resume for this role"}
                          <DisplayImageFromNextCloudinary
                            src="kazina_upvlpf"
                            height={800}
                            width={800}
                            alt="savannah avatar"
                            classname="size-12 -mt-10"
                          />
                        </Button>
                        <div className="rounded-lg bg-sky-50 px-3 py-4 mt-2 md:absolute md:top-12 w-full md:w-12/12">
                          {/* <div className="prose prose-sm" dangerouslySetInnerHTML={{__html: correctedParsedHTML(generation),}}></div> */}
                          <div className="prose prose-sm">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {generation}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-full  space-y-12 grid grid-cols-1 md:grid-cols-1 items-end justify-center gap-4">
            {singleJob && (
              <>
                {singleJob.map((listing) => (
                  <article
                    key={listing.id}
                    className=" border-bts-BrownTwo border-4   rounded-lg py-4  px-2 md:px-8"
                  >
                    <h3 className="text-xl font-semibold">
                      {listing.sectionName}
                    </h3>

                    <div
                      className="prose prose-sm md:prose-base"
                      dangerouslySetInnerHTML={{
                        // __html: fixedHTML(listing.sectionDescription),
                        __html: correctedParsedHTML(listing.sectionDescription),
                      }}
                    ></div>
                  </article>
                ))}
              </>
            )}
            <div className="space-y-4 hidden">
              <p className="">
                Share this remote job opportunity with your friends and
                colleagues
              </p>
              {filteredRemoteJob && (
                <div className="flex flex-wrap gap-4 items-center">
                  <TwitterShareButton
                    title={`Job Role : ${filteredRemoteJob.jobName}`}
                    url={`beyond-savannah-board.vercel.app/view-job/${jobsId}`}
                  >
                    <XIcon className="size-8 rounded-lg  hover:scale-110 transition duration-500" />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    title={`Job Role : ${filteredRemoteJob.jobName}`}
                    url={`beyond-savannah-board.vercel.app/view-job/${jobsId}`}
                  >
                    <LinkedinIcon className="size-8 rounded-lg hover:scale-110 transition duration-500" />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    title={`Job Role : ${filteredRemoteJob.jobName}`}
                    url={`beyond-savannah-board.vercel.app/view-job/${jobsId}`}
                  >
                    <FacebookIcon className="size-8 rounded-lg hover:scale-110 transition duration-500" />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    title={`Job Role : ${filteredRemoteJob.jobName}`}
                    url={`beyond-savannah-board.vercel.app/view-job/${jobsId}`}
                  >
                    <WhatsappIcon className="size-8 rounded-lg hover:scale-110 transition duration-500" />
                  </WhatsappShareButton>
                  <TelegramShareButton
                    title={`Job Role : ${filteredRemoteJob.jobName}`}
                    url={`beyond-savannah-board.vercel.app/view-job/${jobsId}`}
                  >
                    <TelegramIcon className="size-8 rounded-lg hover:scale-110 transition duration-500" />
                  </TelegramShareButton>
                  <EmailShareButton
                    title={`Job Role : ${filteredRemoteJob.jobName}`}
                    url={`beyond-savannah-board.vercel.app/view-job/${jobsId}`}
                  >
                    <EmailIcon className="size-8 rounded-lg hover:scale-110 transition duration-500" />
                  </EmailShareButton>
                </div>
              )}
            </div>
          </div>
          {!singleJob && <p>We cannot find that particular job listing</p>}
        </div>
      </section>
    </>
  );
}
