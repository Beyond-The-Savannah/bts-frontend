"use client";

import { useCurrencyBasedOnLocation } from "@/hooks/useCurrencyBasedOnLocation";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import clsx from "clsx";

export default function MpesaGlobalCardDialog() {
  const currencyValue = useCurrencyBasedOnLocation();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={clsx(
              "text-start mt-10 bg-slate-50 hover:bg-slate-100 cursor-pointer",
              currencyValue === "KES" ? "block" : "hidden",
            )}
          >
            Don&apos;t have a bank card? Use Mpesa Global Pay Card
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full px-4 py-6">
          <iframe
            src="https://www.youtube.com/embed/DhNvgG7AmnU?si=7wP4AiDZaInoKccw&amp;controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-square  m-3 rounded-md"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
