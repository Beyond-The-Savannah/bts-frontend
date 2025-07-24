"use client";

import { Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ReusmeUpload1() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log("RESUME FILE", binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { acceptedFiles, isDragActive,isDragAccept,isDragReject, getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5242880,
    accept: { ".pdf": [".pdf"], ".doc": [".doc"], ".docx": [".docx"] },
  });
  const files = acceptedFiles.map((file) => (
    <div key={file.name}>{file.name}</div>
  ));

  return (
    <>
      <section className="py-10 ml-0 lg:-ml-20">
        <div className="min-h-[35vh]  space-y-4 px-4 py-8 bg-bts-BrownOne/50 rounded-lg w-full lg:w-[47rem]">
          <p className="font-semibold text-xl">ResumeUpload</p>
          <div
            {...getRootProps()}
            className=" grid place-content-center gap-4 border-4 text-center border-dashed rounded-lg px-4 py-2"
          >
            <input {...getInputProps()} disabled/>
            
          <div className="text-center">
            {!isDragActive &&(<p className="text-sm">Drag & drop a file here, or click to select a file</p>)}
            {isDragAccept &&(<p className="text-sm">Accepting File</p>)}
            {isDragReject &&(<p className="text-sm text-red-300"> File rejected</p>)}
          </div>
            <Upload className="w-40 mx-auto" />
            <div className="space-y-2">
              <em className="text-xs block">
                Only .pdf or .doc or .docx files will be accepted{" "}
              </em>
              <span className="text-xs block">
                Only 1 file of maxsize 5MB will be accepted{" "}
              </span>
            </div>
          </div>
          {}
          {files.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm pb-2">Your Document</p>
              {files}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
