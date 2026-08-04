'use client'

import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FolderX } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAuth } from "@clerk/nextjs";
import VirtualisedEmployerJobsList from "./VirtualisedEmployerJobsList";
import CandidateRowEmployerLoader from "@/components/Loaders/CandidateRowEmployerLoader";

export default function Jobs1() {
    const{orgId}= useAuth()
    const [pageSizeLimit] = useState(10);
      const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ["getEmpolyerJobs"],
        queryFn: async ({ pageParam = 1 }) => {
          const res = await fetch(
            `/api/getEmpolyerJobs?page=${pageParam}&pageSize=${pageSizeLimit}&orgId=${orgId}`,
          );
          if (!res.ok) throw new Error("Failed to fetch candidates with resume");
          return res.json();
        },
    
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
          if (lastPage.length === 0) {
            return undefined;
          }
          return lastPageParam + 1;
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
          if (firstPageParam <= 1) {
            return undefined;
          }
          return firstPageParam - 1;
        },
      });
    
    //   const allCandidates = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);
      const allJobs = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);
    
      if (status == "pending") {
        return <CandidateRowEmployerLoader />;
      }
      if (error) {
        toast.error("An error occured");
      }

  return (
    <>
    {allJobs.length === 0 && (
            <>
              <Empty className="border border-dotted w-6/12 mx-auto mt-40">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FolderX className="text-orange-400" />
                  </EmptyMedia>
                  <EmptyTitle>No job postings found</EmptyTitle>
                  <EmptyDescription className="w-full lg:w-[28dvw]">
                    Click on the tab link &quot;Add Job Opening&quot; to post a new
                    job position
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent></EmptyContent>
              </Empty>
            </>
          )}
          <div className="my-2 py-2 ">
            {/* <VirtualisedEmployerJobsList newJobs={newJobs} /> */}
            <VirtualisedEmployerJobsList newJobs={allJobs} />
          </div>
             <div className="flex gap-4 items-center justify-center my-10">
              <Button
                variant="outline"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetching}
              >
                {isFetchingNextPage
                  ? "Loading more Job Listings"
                  : hasNextPage
                    ? "Loading more"
                    : ""}
              </Button>
            </div>
    </>
  )
}
