import config from "../config/config.js";
import { Server } from "http";
import { Server as IOServer, Socket } from "socket.io";
import redisClient from "../config/redis/client.js";

export default function setUpSocket(server: Server) {
  const io = new IOServer(server, {
    cors: {
      origin: config.clientUrl,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const socketsIds: string[] = [];

  const disconnect = async (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);
  };

  io.on("connection", async (socket) => {
    socketsIds.push(socket.id.toString());
    console.log(`User connected socketId: ${socket.id}`);

    socket.on("image-created", async () => {
      console.log("Image created event received");
      const goals = await redisClient.get("goals");
      for (const socketId of socketsIds) {
        console.log(`Emitting image-created event to socketId: ${socketId}`);
        io.to(socketId).emit("image-created", { goals });
      }
    });

    socket.on("disconnect", () => disconnect(socket));
  });
}
