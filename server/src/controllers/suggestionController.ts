import { Request, Response } from "express";
import Suggestion from "../models/Suggestion.js";

export async function getSuggestions(_: Request, res: Response): Promise<void> {
  try {
    // Fetch suggestions from the database
    const suggestions = await Suggestion.find();
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function suggestPlayer(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { teamName, playerName } = req.body;

    // Validate input
    if (!teamName || !playerName) {
      res
        .status(400)
        .json({ message: "Team name and player name are required." });
      return;
    }

    // Create and save the suggestion
    const newSuggestion = await Suggestion.create({ teamName, playerName });
    res.status(201).json(newSuggestion);
  } catch (error) {
    console.error("Error suggesting player:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteSuggestion(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const deletedSuggestion = await Suggestion.findByIdAndDelete(id);

    if (!deletedSuggestion) {
      res.status(404).json({ message: "Suggestion not found." });
      return;
    }
    res.status(200).json({ message: "Suggestion deleted successfully." });
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
