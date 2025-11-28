import mongoose from "mongoose";
import { GoalType } from "../types/goalTypes.js";

const GoalSchema = new mongoose.Schema<GoalType>({
  goals: {
    type: Number,
  },
});

export default mongoose.model("Goal", GoalSchema);
