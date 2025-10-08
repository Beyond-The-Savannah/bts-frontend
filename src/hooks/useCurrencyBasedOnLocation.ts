"use client";

import { IpNotFoundError, publicIpv4 } from "public-ip";
import { useEffect, useState } from "react";

const ipInfoToken = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
export function useCurrencyBasedOnLocation() {
  const [currencyValue, setCurrencyValue] = useState<string>("USD");

  useEffect(() => {
    async function DetermineCurrecny() {
      try {
        const ip = await publicIpv4({ timeout: 5000 });
        const response = await fetch(`https://ipinfo.io/${ip}/json?token=${ipInfoToken}`);
        const response2 = await response.json();
        if (response2.country === "KE") {setCurrencyValue("KES");} else {setCurrencyValue("USD");}
      } 
      catch (error: unknown) {
        if (error instanceof IpNotFoundError) {
          console.log("Could not determine public IP Address");
        } else if (error instanceof DOMException && error.name) {
          console.log("request was cancelled");
        } else {
          console.log("An error occured", (error as Error).message);
        }
      }
    }
    DetermineCurrecny()
  }, []);
  return currencyValue
}
