import { create } from "zustand";

export type PlayerStateType = {
  players: {
    index: number;
    image: File | null; // Using string for image URL or File for file input
    name: string;
  }[];
  setPlayers: (
    players:
      | { index: number; image: File | null; name: string }[]
      | ((
          prev: { index: number; image: File | null; name: string }[]
        ) => { index: number; image: File | null; name: string }[])
  ) => void;
};

export const usePlayersStore = create<PlayerStateType>((set) => ({
  players: [
    {
      index: 0,
      image: null,
      name: "Striker 1",
    },
    {
      index: 1,
      image: null,
      name: "Striker 2",
    },
    {
      index: 2,
      image: null,
      name: "Midfielder 1",
    },
    {
      index: 3,
      image: null,
      name: "Midfielder 2",
    },
    {
      index: 4,
      image: null,
      name: "Midfielder 3",
    },
    {
      index: 5,
      image: null,
      name: "Midfielder 4",
    },
    {
      index: 6,
      image: null,
      name: "Defender 1",
    },
    {
      index: 7,
      image: null,
      name: "Defender 2",
    },
    {
      index: 8,
      image: null,
      name: "Defender 3",
    },
    {
      index: 9,
      image: null,
      name: "Defender 4",
    },
    {
      index: 10,
      image: null,
      name: "Goalkeeper",
    },
    {
      index: 11,
      image: null,
      name: "Dr. Yunus",
    },
  ],
  setPlayers: (players) =>
    set((state) => ({
      players: typeof players === "function" ? players(state.players) : players,
    })),
}));
