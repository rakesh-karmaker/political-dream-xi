import usePlayers from "@/hooks/usePlayers";
import type { PlayerType } from "@/services/data/players";
import {
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { FaChevronDown } from "react-icons/fa";

type PlayersDropdownProps = {
  teamName: string;
  players: PlayerType[];

  color: string;
  index: number;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

export default function PlayersDropdown({
  teamName,
  players,
  color,
  index,
  isLoading,
  setIsLoading,
  setIsDropdownOpen,
}: PlayersDropdownProps): ReactNode {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setPlayers } = usePlayers();

  return (
    <div className="w-full h-auto flex flex-col">
      <div
        className="w-full p-2 pb-3 flex justify-between items-center gap-3 cursor-pointer hover:opacity-75 transition-all duration-300 border-b-1 border-black/20 text-black/70"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: color,
        }}
      >
        <p>{teamName}</p> <FaChevronDown />
      </div>
      <div
        className="w-full grid gap-1 h-full transition-all duration-300"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="w-full h-full flex flex-col relative overflow-y-hidden text-left">
          <div className="w-full h-full">
            {players.map((player) => (
              <button
                key={player.name}
                className="w-full py-2 flex gap-2 items-center text-left cursor-pointer hover:bg-black/10 rounded-md px-1 text-[1em] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  const imgUrl = player.imageUrl;
                  setIsLoading(true);
                  fetch(imgUrl)
                    .then((res) => res.blob())
                    .then((blob) => {
                      const file = new File(
                        [blob],
                        `player-${index}-${player.name}`,
                        { type: blob.type }
                      );
                      setPlayers((prev) => {
                        const newPlayers = [...prev];
                        newPlayers[index] = {
                          ...newPlayers[index],
                          image: file,
                          name: player.name,
                        };
                        return newPlayers;
                      });
                      setIsLoading(false);
                      setIsDropdownOpen(false);
                    });
                }}
                disabled={isLoading}
              >
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-[0.9em]">{player.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
