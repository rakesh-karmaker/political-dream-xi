import api from "@/config/axios";
import type { formations } from "@/services/data/positions";

export async function fetchGoals() {
  const res = await api.get("/goals");
  return res.data;
}

export async function uploadPlayerImages(
  playerData: {
    index: number;
    image: File | null;
    name: string;
    placeHolder: string;
  }[],
  formation: keyof typeof formations,
  isSharing: boolean
) {
  const formData = new FormData();
  playerData.forEach((player) => {
    if (player.image) {
      formData.append(`player-image`, player.image);
    }
    formData.append(
      `player-${player.index}-name`,
      player.name === "" ? player.placeHolder : player.name
    );
  });

  formData.append("formation", formation);
  formData.append("isSharing", isSharing.toString());

  return await api.post("/upload-players", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
