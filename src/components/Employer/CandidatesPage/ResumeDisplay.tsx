'use client'

import { EmbedPDF } from "@simplepdf/react-embed-pdf";

export default function ResumeDisplay({url}:{url:string}) {
  return (
   <div className="grid place-content-center">
   <EmbedPDF companyIdentifier="react-viewer" mode="inline" style={{width:1200, height:800}} documentURL={url}/>
   </div>
  )
}
