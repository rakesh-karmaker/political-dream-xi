import axios from "axios";

export default async function getFootballField() {
  try {
    const response = await axios.get(
      "https://res.cloudinary.com/dcq6gokha/image/upload/v1754924448/football-field-full_xkfkjl.png",
      { responseType: "arraybuffer" }
    );
    return Buffer.from(response.data);
  } catch (error) {
    console.error("Error getting football field:", error);
    throw new Error("Failed to get football field");
  }
}
