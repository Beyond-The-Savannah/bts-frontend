"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import Papa from "papaparse";

interface CSVDataProp {
  created_at: string;
  email: string;
  event_name: string;
  first_name: string;
  id: string;
  last_name: string;
  phone_number: string;
  updated_at: string;
}

export default function UploadCandidatesForm() {
  const [csvData, setCsvData] = useState<CSVDataProp[]>([]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      Papa.parse<CSVDataProp>(file, {
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
  const submitUploadedCsvFile= (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(csvData.length!=0){
        toast.info(`Uploading ${JSON.stringify(csvData)}`)
    }
  }
  return (
    <>
      <div className="max-w-sm mx-auto">
        <form onSubmit={submitUploadedCsvFile} className="space-y-2 mt-10">
          <Label htmlFor="csvFile"></Label>
          <Input
            type="file"
            accept=".csv"
            name="csvFile"
            required
            onChange={handleUpload}
          />
          <Button variant="outline" type="submit" className="my-4">
            Upload
          </Button>
        </form>
      </div>
      {/* <div className="grid place-content-center gap-2 max-w-7xl mx-auto border-4 rounded-lg my-4 px-2 py-4">
        {csvData.length != 0 ? (
          <>
            <ul>
              {csvData.map((csv, indx) => (
                <div key={indx} className="flex items-center gap-2">
                  <li className="text-xs">{csv.id}</li>
                  <li className="text-xs">{csv.first_name}</li>
                  <li className="text-xs">{csv.last_name}</li>
                  <li className="text-xs">{csv.email}</li>
                  <li className="text-xs">{csv.phone_number}</li>
                  <li className="text-xs">{csv.created_at}</li>
                  <li className="text-xs">{csv.updated_at}</li>
                </div>
              ))}
            </ul>
          </>
        ) : null}
      </div> */}
    </>
  );
}
