"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import clsx from "clsx";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";

export default function FilterJobsByName({
  remoteData,
}: {
  remoteData: ListingRemoteJobs[];
}) {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function handleClearFilter() {
    router.push(`/find-jobs`);
  }

  return (
    <>
      <div className="flex  gap-4 items-end">
        <div className="">
          <p>Filter by Name</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full md:min-w-[380px] justify-between"
              >
                {value
                  ? remoteData?.find((data) => data.jobName == value)?.jobName
                  : "Select Job Name..."}
                <ChevronsUpDown className="opacity-50 " />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[380px] p-0">
              <Command>
                <CommandInput placeholder="Search Job Name..." />
                <CommandList>
                  <CommandEmpty>No Job Name Found.</CommandEmpty>
                  <CommandGroup>
                    {remoteData.map((job, index) => (
                      <CommandItem
                        key={index}
                        value={job.jobName}
                        onSelect={(currentValue) => {
                          setValue(currentValue == value ? "" : currentValue);
                          router.push(`find-jobs/?name=${currentValue}`);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={clsx(
                            value == job.jobName ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {job.jobName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="c">
          {name != "" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleClearFilter()}
              className="hover:bg-bts-BrownFour"
            >
              Clear Filter
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
