"use client";


import { Button } from "@/components/ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import VirtualizedEmployerCandidateList from "./VirtualizedEmployerCandidateList";
import CandidateRowEmployerLoader from "@/components/Loaders/CandidateRowEmployerLoader";

export default function CandidatesSection1({ jobDepartment }: { jobDepartment: string }) {
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
    queryKey: ["getCandidatesBasedOnJobDepartment"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/getCandidatesBasedOnJobDepartment?page=${pageParam}&pageSize=${pageSizeLimit}&jobDepartment=${jobDepartment}`,
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

  const allCandidates = useMemo(() => data?.pages.flat() ?? [], [data?.pages]);

  if (status == "pending") {
    return <CandidateRowEmployerLoader />;;
  }
  if (error) {
    toast.error("An error occured");
  }

  return (
    <>
    <section className="container mx-auto px-4">
          
            <div className="mt-4">
                {/* <VirtualBtsCandidatesList candidates={allCandidates} count={allRecordsCount} /> */}
                <VirtualizedEmployerCandidateList candidates={allCandidates} />
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
  );
}
