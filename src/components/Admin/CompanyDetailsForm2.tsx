"use client";
import dynamic from "next/dynamic";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { axiosInstance } from "@/remoteData/mutateData";
import axios from "axios";
import { toast } from "sonner";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading text editor...</p>,
});

export default function CompanyDetailsForm2() {
  const [cDValue, setcDValue] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | ArrayBuffer | null>(
    null
  );
  const [logo, setLogo] = useState("");
  const [logoName, setLogoName] = useState("");

  function handleLogo(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const data = new FileReader();
      data.addEventListener("load", () => {
        if (typeof data.result === "string") {
          setLogoPreview(data.result);
          const commaIndex = data.result.indexOf(",");
          const base64String = data.result.slice(commaIndex + 1);
          setLogo(base64String);
        }
      });
      data.readAsDataURL(e.target.files[0]);
      setLogoName(e.target.files[0].name)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const companyForm = new FormData(e.currentTarget);

    const companyFormData = {
      name: companyForm.get("companyName"),
      description: cDValue,
      phoneNumber: companyForm.get("companyContactPhone"),
      headQuarters: companyForm.get("companyHeadQuaters"),
      attachmentName:logoName,
      attachment:logo,
      email: companyForm.get("companyContactEmail"),
      location: companyForm.get("location"),
      imageUrl: "",
      createdBy: "",
      modifiedBy: "",
    };

    // alert(JSON.stringify(companyFormData));
    console.log(companyFormData);
    const postRequest = async () => {
      try {
        const response = await axiosInstance.post(
          `/api/Companies/addCompanies`,
          companyFormData
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.message);
        }
      }
    };
    toast.promise(postRequest(), {
      loading: "Adding",
      success: () => {
        console.log("added");
        return "Company Details Added";
      },
      error: "Error, try again later",
    });
  }

  return (
    <>
      <div className="mt-10 mb-20">
        <h2 className="text-xl">Company Form</h2>
        <div className="border-2 rounded-md border-bts-GreenOne w-36"></div>
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                placeholder="Name"
                name="companyName"
                className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
              />
            </div>
            <div>
              <Label>Company Headquaters</Label>
              <Input
                type="text"
                placeholder="Header Quaters"
                name="companyHeadQuaters"
                className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
              />
            </div>
            <div>
              <Label>Company Contact Email</Label>
              <Input
                type="email"
                placeholder="email@address.com"
                name="companyContactEmail"
                className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div>
              <Label>Company Location</Label>
              <Input
                type="text"
                placeholder="location"
                name="location"
                className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
              />
            </div>
            <div>
              <Label>Company Contact Phone</Label>
              <Input
                type="tel"
                placeholder="company name"
                name="companyContactPhone"
                className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
              />
            </div>
          </div>
          <div className="flex  items-center justify-center gap-4">
            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogo}
                // name="imageUrl"
                className="w-[90vw] md:w-[30vw] lg:w-[24vw]"
              />
            </div>
            {typeof logoPreview == "string" && (
              <Image
                src={logoPreview}
                height={200}
                width={200}
                alt="logo preview"
                className="size-24 rounded-lg"
              />
            )}
            <div></div>
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              value={cDValue}
              onChange={setcDValue}
              // style={{width:"90%"}}
              className="w-[50vw]"
            />
          </div>
          <Button
            type="submit"
            className="bg-bts-BrownThree hover:bg-green-800"
          >
            Add Company
          </Button>
        </form>
      </div>
    </>
  );
}
