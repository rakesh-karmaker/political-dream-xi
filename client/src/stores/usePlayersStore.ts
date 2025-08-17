import { defaultPlayers } from "@/services/data/players";
import type { formations } from "@/services/data/positions";
import { create } from "zustand";

export type PlayerStateType = {
  players: {
    index: number;
    image: File | null; // Using string for image URL or File for file input
    name: string;
    placeHolder: string;
  }[];
  setPlayers: (
    players:
      | {
          index: number;
          image: File | null;
          name: string;
          placeHolder: string;
        }[]
      | ((
          prev: {
            index: number;
            image: File | null;
            name: string;
            placeHolder: string;
          }[]
        ) => {
          index: number;
          image: File | null;
          name: string;
          placeHolder: string;
        }[])
  ) => void;
  goals: number;
  setGoals: (goals: number) => void;
  formation: keyof typeof formations;
  setFormation: (formation: keyof typeof formations) => void;
};

export const usePlayersStore = create<PlayerStateType>((set) => ({
  players: defaultPlayers,
  setPlayers: (players) =>
    set((state) => ({
      players: typeof players === "function" ? players(state.players) : players,
    })),
  goals: 0,
  setGoals: (goals) => set({ goals }),
  formation: "formation442",
  setFormation: (formation) => set({ formation }),
}));
