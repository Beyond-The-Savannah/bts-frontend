'use client'

import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export default function ResumeDisplay({url}:{url:string}) {
  return (
   <div className="grid place-content-center">
   <EmbedPDF mode="inline" style={{width:1200, height:500}} documentURL={url}/>
   </div>
  )
}
