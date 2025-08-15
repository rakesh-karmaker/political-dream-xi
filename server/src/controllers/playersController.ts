import { Request, Response } from "express";
import sharp from "sharp";
import getFootballField from "../utils/getFootballField.js";

export async function uploadPlayers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    console.log(req.body, req.files);
    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }

    const footballField = await getFootballField();

    const userImage = Array.isArray(req.files)
      ? req.files[0]
      : Object.values(req.files)[0][0];
    // const footballFieldPath = path.join(__dirname, "football-field.png");

    // Resize user image
    const userImageBuffer = await sharp(userImage.buffer)
      .resize(250, 250) // size inside the field
      .toBuffer();

    // Composite over football field
    const finalImageBuffer = await sharp(footballField)
      .composite([{ input: userImageBuffer, top: 157, left: 895 }]) // position
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(finalImageBuffer); // Send the final image as response
  } catch (error) {
    console.error("Error uploading players:", error);
    res.status(500).send("Internal Server Error");
  }
}
