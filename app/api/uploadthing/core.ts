import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "1MB",
      maxFileCount: 3,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload complete for");

    console.log("file url", file.url);
    return { uploadedBy: "John" };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
