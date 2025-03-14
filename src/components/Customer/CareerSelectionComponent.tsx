"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, TriangleAlertIcon } from "lucide-react";
import { useGetJobSubCategoryDropDownList } from "@/remoteData/getData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import clsx from "clsx";

export default function CareerSelectionComponent() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const [selectedCareerDepartmentValue, setSelectedCareerDepartmentValue] =
    useState<string|null>(null);

  const { data: jobDepartments } = useGetJobSubCategoryDropDownList();

  useEffect(() => {
    if (value !== null) {
      const stringValue = value.toString();
      localStorage.setItem("CareerDeparmentValue", stringValue);
    }
  }, [value]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("CareerDeparmentValue") ?? "";
      setSelectedCareerDepartmentValue(storedValue);
    }
  }, []);

  const selectedCareer = jobDepartments?.find(
    (department) => department.value == Number(selectedCareerDepartmentValue)
  );
  return (
    <>
      {selectedCareerDepartmentValue ? (
        <>
          <p className="text-xs">
            Selected Career:
            <span className="font-semibold text-base pl-2">
              {selectedCareer?.label}
            </span>{" "}
          </p>
        </>
      ) : (
        <div className="space-y-4">
          
          <p className="text-">
            Please select a career category that best matches your career
          </p>
          <div className="bg-gray-300 px-4 py-4 max-w-lg text-sm flex items-center gap-1 rounded-lg">
            <TriangleAlertIcon /> You can only select your career once, hence
            select carefully
          </div>
          <div className="c">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full md:min-w-[380px] justify-between"
                >
                  {value !== null
                    ? jobDepartments?.find(
                        (department) => department.value === value
                      )?.label
                    : "Type & Select A Career"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="min-w-[380px] p-0">
                <Command>
                  <CommandInput placeholder="Search Career Name..." />
                  <CommandList>
                    <CommandEmpty>Career not found</CommandEmpty>
                    <CommandGroup>
                      {jobDepartments?.map((department, index) => (
                        <CommandItem
                          key={index}
                          value={department.label}
                          onSelect={(selectedLabel) => {
                            const selectedDepartment = jobDepartments.find(
                              (department) => department.label == selectedLabel
                            );
                            setValue(
                              selectedDepartment
                                ? selectedDepartment.value
                                : null
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={clsx(
                              value == department.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {department.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
}
