import app from "./app.js";
import config from "./config/config.js";
import mongoose from "mongoose";
import setUpSocket from "./lib/socket.js";

mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

setUpSocket(server);
