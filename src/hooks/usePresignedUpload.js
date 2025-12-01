import { useMutation } from "@tanstack/react-query";

export function usePresignedUpload() {
  return useMutation({
    mutationFn: async ({ file, meta }) => {
      // Validate < 1GB
      console.log(file);
      console.log(meta);
      if (file.size > 5_000_000_000) {
        throw new Error("File too large (max 5GB)");
      }

      // 1️⃣ Get presigned URL
      const reqBody = JSON.stringify({
        fileName: meta.fileName,
        fileType: file.type,
        dateUploaded: new Date().toISOString(),
        className: meta.class,
      });
      console.log(reqBody);
      const res = await fetch(
        "https://hbp7x7111f.execute-api.us-east-2.amazonaws.com/generateUrl",
        {
          method: "POST",
          body: reqBody,
          cache: "no-store",
        }
      );

      const { uploadURL } = await res.json();
      console.log(uploadURL);
      if (!uploadURL) {
        throw new Error("Failed to get upload URL");
      }
      // 2️⃣ Upload directly to S3
      await fetch(uploadURL, {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      return uploadURL;
    },
  });
}
