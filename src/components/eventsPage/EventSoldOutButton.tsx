"use client";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function EventSoldOutButton() {
  function handleClick() {
    toast.warning("Event tickets are sold out", { duration: 10000 });
  }
  return (
    <>
      <Button
        onClick={handleClick}
        className="w-64  py-10 text-2xl font-bold bg-bts-BrownThree hover:bg-bts-BrownFour hover:scale-105 transition ease-in duration-300"
      >
        Register for Event
      </Button>
    </>
  );
}
