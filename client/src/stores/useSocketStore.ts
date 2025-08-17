import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { SERVER } from "@/config/constants";

interface SocketState {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,

  connect: () => {
    const socket = io(SERVER, {
      withCredentials: true,
    });

    set({ socket });

    socket.on("connect", () => {
      console.log("Socket connected");
    });
  },

  disconnect: () => {
    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
      console.log("❌ Socket disconnected");
    }
  },
}));
