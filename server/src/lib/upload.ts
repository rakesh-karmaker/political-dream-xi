import cloudinary from "../config/cloudinary.js";
import { Response } from "express";
import getDate from "../utils/getDate.js";
import { Readable } from "stream";

export async function uploadFile(
  res: Response,
  file: Express.Multer.File
): Promise<{ url: string } | Response> {
  try {
    if (
      !file ||
      !file.buffer ||
      file.size == 0 ||
      file.size > 10 * 1024 * 1024 // 10 MB limit
    ) {
      return res.status(400).send({ error: "File is empty or too large." });
    }

    const uploadOptions: {
      folder: string;
      resource_type: "auto" | "image" | "video" | "raw" | undefined;
      public_id: string;
    } = {
      folder: `political-dream-xi/`,
      resource_type: file.mimetype.includes("pdf") ? "raw" : "auto",
      public_id: `${new Date().getTime()}-${file.originalname}`,
    };

    const streamUpload = (fileBuffer: Buffer) =>
      new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            use_filename: true,
            unique_filename: true,
            ...uploadOptions,
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject("No result from Cloudinary");
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        );

        Readable.from(fileBuffer).pipe(stream);
      });

    const result = await streamUpload(file.buffer);

    return { url: result.secure_url };
  } catch (err) {
    console.log("Error uploading file -", getDate(), "\n---\n", err);
    return res.status(500).send({ error: "Failed to upload file." });
  }
}
