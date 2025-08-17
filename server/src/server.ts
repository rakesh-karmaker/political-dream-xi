import app from "./app.js";
import config from "./config/config.js";
import mongoose from "mongoose";
import setUpSocket from "./lib/socket.js";
import https from "https";

// TODO: remove this when in a paid hosting
setInterval(
  () => {
    const options = {
      hostname: config.serverUrl.replace(/^https?:\/\//, ""), // Remove protocol if present
      port: 443,
      path: "/",
      method: "GET",
      headers: {
        Origin: config.serverUrl,
      },
    };

    https.get(options).on("error", (e) => {
      console.error(`Got error: ${e.message}`);
    });
  },
  2 * 60 * 1000
); // every 2 minutes

mongoose
  .connect(config.mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

setUpSocket(server);
