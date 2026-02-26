"use client";
import { GetCandidateDetailsBYEmail } from "@/app/actions/BTSCandidatesForm";
import { CandidateProp } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function useShowCandidateProfileLink() {
  const { user } = useUser();
  const [candidateDetails, setCandidateDetails] = useState<CandidateProp[]>([]);

  const userEmailAddress = user?.primaryEmailAddress?.emailAddress;


  useEffect(() => {
    async function GetCurrentCandidateDetails() {
      if (userEmailAddress !== undefined) {
        try {
          const data = await GetCandidateDetailsBYEmail(userEmailAddress);
          // console.log("Fetched candidate data:", data); 
          setCandidateDetails(data);
        } catch (err) {
          console.error("Failed to fetch candidate details:", err);
        }
      } else {
        console.log("userEmailAddress is undefined, skipping fetch");
      }
    }
    GetCurrentCandidateDetails();
  }, [userEmailAddress]);

  return candidateDetails;
}
