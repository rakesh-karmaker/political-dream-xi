import config from "../config/config.js";
import { Server } from "http";
import { Server as IOServer, Socket } from "socket.io";
import redisClient from "../config/redis/client.js";

const userSocketMap = new Map<string, string>();

export default function setUpSocket(server: Server) {
  const io = new IOServer(server, {
    cors: {
      origin: config.clientUrl,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const disconnect = async (socket: Socket) => {
    console.log(`User disconnected: ${socket.id}`);
  };

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap.set(userId, socket.id.toString());
      console.log(
        `"User connected:", userId: ${userId}, socketId: ${socket.id}`
      );
    } else {
      console.log("No user ID provided");
    }

    socket.on("image-created", async () => {
      const goals = await redisClient.get("goals");
      for (const [_, socketId] of userSocketMap) {
        if (socketId !== socket.id.toString()) {
          io.to(socketId).emit("image-created", { goals });
        }
      }
    });

    socket.on("disconnect", () => disconnect(socket));
  });
}
