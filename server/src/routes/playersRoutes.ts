import { Router } from "express";
import { getGoals, uploadPlayers } from "../controllers/playersController.js";
import upload from "../middlewares/multer.js";

const playersRouter = Router();

playersRouter.get("/goals", getGoals);

playersRouter.post(
  "/upload-players",
  upload.array("player-image", 11),
  uploadPlayers
);

export default playersRouter;
