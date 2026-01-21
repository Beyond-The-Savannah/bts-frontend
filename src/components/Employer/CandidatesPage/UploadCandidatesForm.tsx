"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export default function UploadCandidatesForm() {
    const[csvData,setCsvData]=useState([])
    async function  handleUpload(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
         const file=e.currentTarget.files[0]
        toast.info(`testing phase... ${file.name}`)

    }
  return (
    <>
    <div className="grid place-content-center min-h-[50dvh] ">
        <form onSubmit={handleUpload}>
            <div className="space-y-4">
                <div className="c">
                    <Label htmlFor="candidatesCSV">Upload CSV</Label>
                    <Input type="file" accept=".csv" name="candidatesCSV" required/>
                </div>
                <div className="c">
                    <Button variant="outline" type="submit">Upload</Button>
                </div>

            </div>
        </form>
        <div className="max-w-xl mx-auto border-4 rounded-lg mt-10 px-4 py-8">
            <ul>
                {csvData.map((dat,indx)=>(
                    <li key={indx} className=""></li>
                ))}

            </ul>
        </div>
    </div>
    </>
  )
}
