// "use client";

// import { useState } from "react";
// import { FileInputButton, FileCard, ExtFile } from "@files-ui/react";

// export default function ReusmeUpload1() {
//   const [files, setFiles] = useState<ExtFile[]>([]);

//   const updateFiles = (incomingFiles: ExtFile[]) => {
//     setFiles(incomingFiles);
//   };

//   const removeFile = (id: number | string | undefined) => {
//     setFiles(files.filter((x) => x.id !== id));
//   };

//   if (files.length > 0) {
//     console.log("REUSME FILE", files);
//   }

//   return (
//     <>
//       <section className="py-10 ml-0 lg:-ml-20">
//         <div className="min-h-[32vh]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full md:w-[33rem]">
//           <p className="font-semibold text-xl">ResumeUpload</p>
//           <div className="flex justify-evenly items-center gap-4">
//             <FileInputButton
//               onChange={updateFiles}
//               value={files}
//               maxFiles={1}
//               accept={".pdf,.doc,.docx"}
//               maxFileSize={5 * 10124 * 1024}
//               actionButtons={{position:"bottom"}}
//               disabled
//             />
//             {files.length > 0 && (
//               <div className="flex justify-center gap-4 min-w-[50%]">
//                 {files.map((file: ExtFile) => (
//                   <FileCard
//                     key={file.id}
//                     {...file}
//                     onDelete={removeFile}
//                     info
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
