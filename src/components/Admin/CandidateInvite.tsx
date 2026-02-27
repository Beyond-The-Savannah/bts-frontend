"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CandidateProp } from "@/db/schema";
import axios from "axios";
import { useState } from "react";

export default function CandidateInvite({
  candidates,
}: {
  candidates: CandidateProp[];
}) {
  const [isSending, setIsSending] = useState(false);

  async function handleSendInvite() {
    setIsSending(true);
    for (const candidate of candidates) {
      try {
        await axios.post(`/api/send-bts-candidates-invite`, {
          email: candidate.email,
          firstName: candidate.firstName,
        });
        await new Promise((res) => setTimeout(res, 1000));
      } catch (error) {
        console.log("Error in handleSend Invite function", error);
        toast.error(
          `Failed to sent invite to ${candidate.firstName} - ${candidate.email}`,
        );
      } finally {
        setIsSending(false);
      }
    }
  }
  return (
    <>
      <Button
        variant="secondary"
        onClick={handleSendInvite}
        disabled={isSending}
      >
        {isSending ? "Sending email invites..." : "Send Email Invites"}
      </Button>
    </>
  );
}
