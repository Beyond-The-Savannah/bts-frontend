"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import Papa from "papaparse";
import { CandidateCSVDataProp } from "@/types/globals";
import { AddMassCandidatesToPool } from "@/app/actions/BTSCandidatesForm";




export default function UploadCandidatesForm() {
  const [csvData, setCsvData] = useState<CandidateCSVDataProp[]>([]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      Papa.parse<CandidateCSVDataProp>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length > 0) {
            setCsvData(results.data);
            // console.log("Parsedata=>",results.data)
          }
        },
      });
    } else {
      toast.error("No file found");
    }
  };
  const submitUploadedCsvFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (csvData.length != 0) {
      try {
        await AddMassCandidatesToPool(csvData)
        toast.success("Candidates CSV Details Submitted Successfully");
      } catch (error) {
        console.log("Error Submitting Candiates CSV Details", error);
        toast.error("Error Submitting Candiates CSV Details");
      }
    }
  };
  return (
    <>
    <section className="px-4">
        <p className="font-bold text-3xl">Upload Candidates CSV Form</p>

      <div className="max-w-sm mx-auto">
        <form onSubmit={submitUploadedCsvFile} className="space-y-2 mt-10 grid place-content-center">
          <Label htmlFor="csvFile"></Label>
          <Input
            type="file"
            accept=".csv"
            name="csvFile"
            required
            onChange={handleUpload}
          />
          <Button variant="outline" type="submit" className="my-4 bg-green-200 hover:bg-green-400">
            Upload
          </Button>
        </form>
      </div>
    </section>
      
    </>
  );
}
