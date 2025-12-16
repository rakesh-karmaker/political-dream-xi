import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    playerName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Suggestion", SuggestionSchema);
