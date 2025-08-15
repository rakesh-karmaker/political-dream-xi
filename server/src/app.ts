import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import playersRouter from "./routes/playersRoutes.js";

const app = express();

app.use(errorHandler);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(playersRouter);

export default app;
