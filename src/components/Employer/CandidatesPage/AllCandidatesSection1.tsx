'use client'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { UsersIcon } from "lucide-react";
import VirtualizedEmployerCandidateList from "./VirtualizedEmployerCandidateList";
import { useAuth } from "@clerk/nextjs";
import CandidateRowEmployerLoader from "@/components/Loaders/CandidateRowEmployerLoader";

export default function AllCandidatesSection1() {
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
            queryKey: ["getRelevantCandidates"],
            queryFn: async ({ pageParam = 1 }) => {
              const res = await fetch(
                `/api/getRelevantCandidates?page=${pageParam}&pageSize=${pageSizeLimit}&orgId=${orgId}`,
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
          const relavantCandidates = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);
        
          if (status == "pending") {
            return <CandidateRowEmployerLoader />;
          }
          if (error) {
            toast.error("An error occured");
          }

  return (
    <>
    <div className="max-w-7xl mx-auto px-4">
        {relavantCandidates.length === 0 ? (
          <>
            <Empty className="border border-dotted w-6/12 mx-auto mt-40">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UsersIcon className="text-orange-400" />
                </EmptyMedia>
                <EmptyTitle>No potential candidates found</EmptyTitle>
                <EmptyDescription className="w-full lg:w-[48dvw]">
                  Once you have job openings added in your organization,
                  candidates will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent></EmptyContent>
            </Empty>
          </>
        ) : (
          <>
            <div className="my-20 ">
              <VirtualizedEmployerCandidateList
                candidates={relavantCandidates}
              />
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
        )}
      </div>
    </>
  )
}
