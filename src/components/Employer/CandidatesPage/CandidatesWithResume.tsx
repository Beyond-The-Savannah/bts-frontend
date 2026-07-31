'use client'
import VirtualBtsCandidatesList from "@/components/Admin/VirtualBtsCandidatesList";
import { Button } from "@/components/ui/button";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";


export default function CandidatesWithResume() {
    const [pageSizeLimit,] = useState(10);
    const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["candidatesWithResume"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/candidatesWithResume?page=${pageParam}&pageSize=${pageSizeLimit}`);
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
  if (status == "pending") {
    toast.info("loading...");
  }
  if (error) {
    toast.error("An error occured");
  }

  const allCandidates = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);
  return (
    <>
    <section className="container mx-auto px-4">
         <div className="mb-10">
            <h2 className="text-3xl font-semibold">
            Candidates With Resume
            </h2>
            <div className="border-2 rounded-md border-bts-GreenOne w-36 mb-8"></div>
        </div>
        <div className="mt-4">
            <VirtualBtsCandidatesList candidates={allCandidates}/>
        </div>
         <div className="flex gap-4 items-center justify-center my-10">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
          >
            {isFetchingNextPage
              ? "Loading more candidates"
              : hasNextPage
                ? "Loading more"
                : ""}
          </Button>
        </div>
    </section>
    </>
  )
}
