import api from "@/config/axios";

export async function getSuggestions() {
  const res = await api.get("/suggestions");
  return res.data;
}

export async function suggestPlayer(teamName: string, playerName: string) {
  const res = await api.post("/suggest-player", {
    teamName,
    playerName,
  });
  return res.data;
}

export async function deleteSuggestion(id: string) {
  const res = await api.delete(`/suggestions/${id}`);
  return res.data;
}
