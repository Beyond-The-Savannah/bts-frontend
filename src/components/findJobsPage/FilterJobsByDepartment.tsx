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
import { DropDownListProps } from "@/types/remoteJobsListing";
import { useTransitionRouter } from "next-view-transitions";
// import { useSearchParams } from "next/navigation";

export default function FilterJobsByDepartment({remoteData}:{remoteData:DropDownListProps[]}) {

const router = useTransitionRouter();
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name") || "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

//   function handleClearFilter({
//     remoteData,
//   }: {
//     remoteData: ListingRemoteJobs[];
//   }) {
//     router.push(`/find-jobs`);
//   }
  return (
    <>
      <div className="flex  gap-4 items-end">
        <div className="">
          <p>Filter by Department</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full md:min-w-[380px] justify-between"
              >
                {value
                  ? remoteData?.find((data) => data.label == value)?.label
                  : "Select Job Name..."}
                <ChevronsUpDown className="opacity-50 " />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[380px] p-0">
              <Command>
                <CommandInput placeholder="Search Job Name..." />
                <CommandList>
                  <CommandEmpty>Department Not Found.</CommandEmpty>
                  <CommandGroup>
                    {remoteData.map((job, index) => (
                      <CommandItem
                        key={index}
                        value={job.label}
                        onSelect={(currentValue) => {
                          setValue(currentValue == value ? "" : currentValue);
                        //   router.push(`find-jobs/?name=${currentValue}`);
                        // ?jobSubCategoryId=10&companyId=0&jobCategoryId=0
                          router.push(`find-jobs/?jobSubCategoryId=${currentValue}&companyId=0&jobCategoryId=0`);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={clsx(
                            value == job.label ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {job.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {/* <div className="c">
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
        </div> */}
      </div>
    </>
  );
}
