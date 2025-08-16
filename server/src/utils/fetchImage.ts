import axios from "axios";

export default async function fetchImage(url: string): Promise<Buffer> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
  } catch (error) {
    console.error("Error getting image:", error);
    throw new Error("Failed to get image");
  }
}
