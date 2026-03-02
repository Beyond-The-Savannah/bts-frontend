"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
// import { CandidateProp } from "@/db/schema";
// import axios from "axios";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Mail } from "lucide-react";
import { SendAllCandidatesEmailInvites } from "@/app/actions/SendAllCandidatesEmailInvites";


// export default function CandidateInvite({candidates,}: {candidates: CandidateProp[];}) {
export default function CandidateInvite() {
  const [isSending, setIsSending] = useState(false);

  // async function handleSendInvite() {
  //   setIsSending(true);
  //   for (const candidate of candidates) {
  //     try {
  //       await axios.post(`/api/send-bts-candidates-invite`, {
  //         email: candidate.email,
  //         firstName: candidate.firstName,
  //       });
  //       await new Promise((res) => setTimeout(res, 1000));
  //     } catch (error) {
  //       console.log("Error in handleSend Invite function", error);
  //       toast.error(
  //         `Failed to sent invite to ${candidate.firstName} - ${candidate.email}`,
  //       );
  //     } finally {
  //       setIsSending(false);
  //     }
  //   }
  // }
  async function handleSendInvite(){
    setIsSending(true)
    try {
        const workflowRunId=await SendAllCandidatesEmailInvites()
      toast.success(`Sending Email Invites To All Candidates - ${workflowRunId}`)
    } catch (error) {
            console.log("Error in handleSendInvite function", error);
            toast.error("Failed To Send Email Invites ")
    }finally{
      setIsSending(false)
    }
  }
  return (
    <>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <Mail/>
        Send Email Invites To All

        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Email all candidates an invite email</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-6/12 mx-auto flex justify-center items-center gap-4">
          <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
          <AlertDialogAction asChild>
          <Button
          className="bg-green-400 hover:bg-green-500"
            variant="secondary"
            onClick={handleSendInvite}
            // disabled
            disabled={isSending}
          >
            {isSending ? "Sending email invites..." : "Send Email Invites"}
          </Button>

          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
