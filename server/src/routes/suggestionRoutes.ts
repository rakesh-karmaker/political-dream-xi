import { Router } from "express";
import {
  deleteSuggestion,
  getSuggestions,
  suggestPlayer,
} from "../controllers/suggestionController.js";

const suggestionRouter = Router();

suggestionRouter.get("/suggestions", getSuggestions);
suggestionRouter.post("/suggest-player", suggestPlayer);
suggestionRouter.delete("/suggestions/:id", deleteSuggestion);

export default suggestionRouter;
