import api from "@/config/axios";

export async function uploadPlayerImages(
  playerData: { index: number; image: File | null; name: string }[]
) {
  const formData = new FormData();
  playerData.forEach((player) => {
    if (player.image) {
      formData.append(`player-image`, player.image);
    }
    formData.append(`player-${player.index}-name`, player.name);
  });

  return await api.post("/upload-players", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "arraybuffer",
  });
}
