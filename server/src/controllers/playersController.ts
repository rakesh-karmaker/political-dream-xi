import { Request, Response } from "express";
import sharp from "sharp";
import editImage from "../lib/editImage.js";
import { playerPositions } from "../services/data/positions.js";
import fetchImage from "../utils/fetchImage.js";
import config from "../config/config.js";
import redisClient from "../config/redis/client.js";
import { uploadFile } from "../lib/upload.js";

// Tune sharp for low-CPU environments
sharp.cache({ memory: 50, files: 0, items: 0 });
sharp.concurrency(1);

// Simple in-memory cache for the football field to avoid refetching/decoding
let cachedFootballField: Buffer | null = null;
let cachedFootballFieldMeta: { width: number; height: number } | null = null;

export async function getGoals(_: Request, res: Response): Promise<void> {
  try {
    const goals = await redisClient.get("goals");
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function uploadPlayers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const formation = req.body.formation as keyof typeof playerPositions;
    const isSharing = req.body.isSharing;
    if (!formation || !playerPositions[formation] || !isSharing) {
      res.status(400).send("Invalid request.");
      return;
    }
    if (!req.files || req.files.length === 0) {
      res.status(400).send("No files uploaded.");
      return;
    }

    // Get football field image and metadata (use cached copy when available)
    if (!cachedFootballField) {
      cachedFootballField = await fetchImage(
        `${config.clientUrl}/footballfield.png`
      );
      const meta = await sharp(cachedFootballField).metadata();
      cachedFootballFieldMeta = { width: meta.width!, height: meta.height! };
    }
    const footballField = cachedFootballField!;
    const footballFieldWidth = cachedFootballFieldMeta!.width;
    const footballFieldHeight = cachedFootballFieldMeta!.height;

    // Get player positions
    const positions = playerPositions[formation];

    // Build composites array first
    const composites: { input: Buffer; top: number; left: number }[] = [];

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
        playerImageBuffer = await fetchImage(
          `${config.clientUrl}/default-player.png`
        );
      }

      // Edit player image
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

      const top =
        Math.floor(footballFieldHeight * (1 - position.y / 100)) -
        340 +
        (position.yOffset || 0);
      const left =
        Math.floor(footballFieldWidth * (position.x / 100)) +
        47 +
        (position.xOffset || 0);

      composites.push({ input: compositeImage, top, left });
    }

    // Composite all players in a single pass
    let finalImageBuffer = await sharp(footballField)
      .composite(composites)
      .toBuffer();

    // Get current goals from Redis
    const goals = await redisClient.get("goals");

    // Add goal scorer text
    const text = parseInt(goals || "0") + 1;
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

    // Composite text onto the final image
    finalImageBuffer = await sharp(finalImageBuffer)
      .composite([
        {
          input: textBuffer,
          top: footballFieldHeight - textHeight - 285,
          left: footballFieldWidth / 2 - 495,
        },
      ])
      .toBuffer();

    let url: string = "";
    if (isSharing === "true") {
      const uploadResult = await uploadFile(res, {
        buffer: finalImageBuffer,
        fieldname: "finalImage",
        originalname: "final-image.png",
        encoding: "7bit",
        mimetype: "image/png",
        size: finalImageBuffer.length,
      } as Express.Multer.File);
      if (
        uploadResult &&
        typeof uploadResult === "object" &&
        "url" in uploadResult
      ) {
        url = uploadResult.url;
        console.log("Image uploaded to Cloudinary:", url);
      }
    }

    // Update goals in Redis
    await redisClient.set("goals", parseInt(goals || "0") + 1);

    // Send the final image buffer as the response
    res.set("Content-Type", "application/json");
    res.send({
      goals: parseInt(goals || "0") + 1,
      url,
      buffer: finalImageBuffer.toString("base64"),
    });
  } catch (error) {
    console.error("Error uploading players:", error);
    res.status(500).send("Internal Server Error");
  }
}
