"use client";

import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
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
import { Countries, Departments } from "@/staticData/Employer/entries";
import clsx from "clsx";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCandidatesProfile } from "@/app/actions/EmployerForms";

export default function CandidatesProfile() {
  // const [open,setOpen]=useState(false)
  const [professionValue, setProfessionValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName,setResumeName]=useState("")

  const candidatesFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    resumeLink: z.instanceof(Buffer),
    resumeName: z.string(),
    country: z.string(),
    profession: z.string(),
    experienceYears: z.number().int(),
    certifications: z.string(),
  });

  type candidatesFormFields = z.infer<typeof candidatesFormSchema>;

  function handleResumeUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files !=null) {
      if (e.target.files[0].size > 2 * 1024 * 1024) {
        toast.warning(
          "Selected resume file is too big. It should be less than 2MB"
        );
      } else {
        const file = e.target.files[0];
        setResumeFile(e.target.files[0]);
        // setResumeName(e.target.files[0].name)
        setResumeName(file.name)
        const reader= new FileReader()
        reader.readAsArrayBuffer(e.target.files[0])
        reader.onloadend= function(){
          const arrayBuffer=reader.result as ArrayBuffer
          const buffer=Buffer.from(arrayBuffer)
          setValue('resumeLink',buffer)
          setValue('resumeName',file.name)
          console.log('Resume File->',resumeFile )
          console.log('Resume File Name->',resumeName )
        }
      }
    }
  }
  const {
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<candidatesFormFields>({
    resolver: zodResolver(candidatesFormSchema),
  });

  async function formSubmit(data:candidatesFormFields) {
    try {
      await AddCandidatesProfile(data)
      toast.success("Profile Added")
      reset()
    } catch (error) {
      console.log("Error Adding Candidates Profile", error);
      console.error("Form errors", errors);
    }

  }
  return (
    <>
      <section className="px-4">
        <p className="font-bold text-3xl">Candidates Form</p>
        
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="space-y-16 border rounded-lg p-4 my-10">
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <label htmlFor="firstName">First Name</label>
                <Input {...register('firstName')} type="text" name="firstName" id="firstName" />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName">Last Name</label>
                <Input type="text" {...register('lastName')} name="lastName" id="lastName" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input type="tel" {...register('phone')} name="phoneNumber" id="phoneNumber" />
              </div>
              <div className="flex-1">
                <label htmlFor="emailAddress">Email Address</label>
                <Input type="email" {...register("email")} name="emailAddress" id="emailAddress" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <label htmlFor="profession">Profession</label>
                {/* <Popover open={open} onOpenChange={setOpen}> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      // aria-expanded={open}
                      className="flex justify-between mx-2 w-full md:w-[450px]"
                    >
                      {professionValue
                        ? Departments.find(
                            (depart) => depart.value == professionValue
                          )?.label
                        : "Select Your Profession"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full md:w-[450px]">
                    <Command>
                      <CommandInput placeholder="Search Your Profession" />
                      <CommandList>
                        <CommandEmpty>Profession Not Found</CommandEmpty>
                        <CommandGroup>
                          {Departments.map((depart) => (
                            <CommandItem
                              key={depart.value}
                              value={depart.value}
                              onSelect={(currentValue) => {
                                setProfessionValue(
                                  currentValue == professionValue
                                    ? ""
                                    : currentValue
                                );
                                // setOpen(false)
                                setValue('profession',currentValue)
                              }}
                            >
                              {depart.label}
                              <Check
                                className={clsx(
                                  "ml-auto",
                                  professionValue == depart.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1">
                <label htmlFor="experienceYears">Experience Years</label>
                <Input
                  type="number"
                  min={0}
                  max={60}
                  {...register('experienceYears',{valueAsNumber:true})}
                  name="experienceYears"
                  id="experienceYears"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="country">Country</label>
                {/* <Popover open={open} onOpenChange={setOpen}> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="flex justify-between mx-2 w-full md:w-[450px]"
                    >
                      {countryValue
                        ? Countries.find(
                            (country) => country.value == countryValue
                          )?.label
                        : "Select YourCountry"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full md:w-[450px]">
                    <Command>
                      <CommandInput placeholder="Search Your Country" />
                      <CommandList>
                        <CommandEmpty>Country Not Found</CommandEmpty>
                        <CommandGroup>
                          {Countries.map((country) => (
                            <CommandItem
                              key={country.value}
                              value={country.value}
                              onSelect={(currentValue) => {
                                setCountryValue(
                                  currentValue === countryValue
                                    ? ""
                                    : currentValue
                                );
                                // setOpen(false)
                                setValue('country',currentValue)
                              }}
                            >
                              {country.label}
                              <Check
                                className={clsx(
                                  "ml-auto",
                                  countryValue == country.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <label htmlFor="certifcations">Certifications</label>
                <Input multiple type="text" {...register('certifications')} name="certifcations" id="certifcations" />
              </div>
              <div className="flex-1">
                <label htmlFor="resume">Resume</label>
                <Input
                  type="file"
                  name="resume"
                  id="resume"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                />
              </div>
            </div>
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-green-400 hover:bg-green-600"
          >
            {isSubmitting ? "Submiting profile details..." : "Submit"}
          </Button>
        </form>
      </section>
    </>
  );
}
