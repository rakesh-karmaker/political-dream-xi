import { Router } from "express";
import { uploadPlayers } from "../controllers/playersController.js";
import upload from "../middlewares/multer.js";

const playersRouter = Router();

playersRouter.post(
  "/upload-players",
  upload.array("player-image", 11),
  uploadPlayers
);

export default playersRouter;
