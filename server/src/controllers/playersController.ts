import { Request, Response } from "express";
import sharp from "sharp";
import editImage from "../lib/editImage.js";
import { playerPositions } from "../services/data/positions.js";
import getImage from "../utils/getFootballField.js";

export async function uploadPlayers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const formation = req.body.formation as keyof typeof playerPositions;
    if (!formation || !playerPositions[formation]) {
      res.status(400).send("Formation is required.");
      return;
    }
    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }

    // Get football field image and metadata
    const footballField = await getImage(
      "http://localhost:5173/footballfield.png"
    );
    const footballFieldMetadata = await sharp(footballField).metadata();
    const footballFieldWidth = footballFieldMetadata.width!;
    const footballFieldHeight = footballFieldMetadata.height!;

    // Get player positions
    const positions = playerPositions[formation];
    let finalImageBuffer = footballField;

    for (const [index, position] of positions.entries()) {
      const playerImage = Array.isArray(req.files)
        ? req.files.find((file) =>
            file.originalname.startsWith(`player-${index}`)
          )
        : undefined;

      // Get player image buffer
      let playerImageBuffer: Express.Multer.File | Buffer;
      if (playerImage !== undefined) {
        playerImageBuffer = playerImage;
      } else {
        playerImageBuffer = await getImage(
          "http://localhost:5173/default-player.png"
        );
      }

      const compositeImage = await editImage(
        {
          buffer: Buffer.isBuffer(playerImageBuffer)
            ? playerImageBuffer
            : playerImageBuffer.buffer,
          fieldname: "playerImage",
          originalname: "default-player.png",
          encoding: "7bit",
          mimetype: "image/png",
        } as Express.Multer.File,
        req.body[`player-${index}-name`]
      );

      finalImageBuffer = await sharp(finalImageBuffer)
        .composite([
          {
            input: compositeImage,
            top:
              Math.floor(footballFieldHeight * (1 - position.y / 100)) -
              340 +
              position.yOffset,
            left:
              Math.floor(footballFieldWidth * (position.x / 100)) +
              47 +
              position.xOffset,
          },
        ])
        .toBuffer();
    }

    // Add goal scorer text
    const text = "1";
    const fontSize = 120;
    const textColor = "#a3e086";
    const textPadding = 200;
    const lineHeight = fontSize * 1.2;
    const textHeight = lineHeight + textPadding;

    const textSvg = `
    <svg width="1000px" height="${textHeight + 10}">
      <text x="50%" y="${fontSize}" font-family="Arial" font-size="${fontSize}" font-weight="bold"
        fill="${textColor}" text-anchor="middle" dominant-baseline="hanging">
        ${text}<tspan font-size="60" dy="-40" fill="${textColor}">th</tspan>
      </text>
    </svg>`;
    const textBuffer = Buffer.from(textSvg);

    finalImageBuffer = await sharp(finalImageBuffer)
      .composite([
        {
          input: textBuffer,
          top: footballFieldHeight - textHeight - 285,
          left: footballFieldWidth / 2 - 495,
        },
      ])
      .toBuffer();

    res.set("Content-Type", "image/png");
    res.send(finalImageBuffer);
  } catch (error) {
    console.error("Error uploading players:", error);
    res.status(500).send("Internal Server Error");
  }
}
