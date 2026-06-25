import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    pdf: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({  }) => {
    
    // console.log("file url", file.ufsUrl);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

