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
import { useSearchParams } from "next/navigation";

export default function FilterJobsByDepartment({
  remoteData,
}: {
  remoteData: DropDownListProps[];
}) {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const jobSubCategoryId = searchParams?.get("jobSubCategoryId") || "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  function handleClearFilter() {
    // router.push(`/find-jobs`);
    router.push(`/Customer/find-jobs`);
  }
  return (
    <>
      <div className="flex  flex-wrap gap-4 items-end">
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
                {value !== null
                  ? remoteData.find((data) => data.value === value)?.label
                  : "Type & Select Department Name..."}
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
                        onSelect={(selectedLabel) => {
                          const selectedDepartment = remoteData.find(
                            (data) => data.label == selectedLabel
                          );
                          setValue(
                            selectedDepartment ? selectedDepartment.value : null
                          );
                          router.push(
                            `find-jobs/?jobSubCategoryId=${selectedDepartment?.value ?? 0}`
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={clsx(
                            value == job.value ? "opacity-100" : "opacity-0"
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
        <div className="c">
          {jobSubCategoryId != "undefined" &&
            jobSubCategoryId != "NaN" &&
            jobSubCategoryId != "" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleClearFilter()}
                className="hover:bg-bts-BrownFour"
              >
                Clear Department Filter
              </Button>
            )}
        </div>
      </div>
    </>
  );
}
