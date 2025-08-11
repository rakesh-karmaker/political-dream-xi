import { usePlayersStore } from "@/stores/usePlayersStore";

export default function usePlayers() {
  const players = usePlayersStore((state) => state.players);
  const setPlayers = usePlayersStore((state) => state.setPlayers);

  return { players, setPlayers };
}
