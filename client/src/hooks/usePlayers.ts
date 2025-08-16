import { usePlayersStore } from "@/stores/usePlayersStore";

export default function usePlayers() {
  const players = usePlayersStore((state) => state.players);
  const setPlayers = usePlayersStore((state) => state.setPlayers);
  const goals = usePlayersStore((state) => state.goals);
  const setGoals = usePlayersStore((state) => state.setGoals);
  const formation = usePlayersStore((state) => state.formation);
  const setFormation = usePlayersStore((state) => state.setFormation);

  return { players, setPlayers, goals, setGoals, formation, setFormation };
}
