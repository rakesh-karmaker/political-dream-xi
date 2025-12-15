import usePlayers from "@/hooks/usePlayers";
import { teamPlayers } from "@/services/data/players";
import {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { IoMdSearch } from "react-icons/io";
import { RiFolderUploadFill } from "react-icons/ri";
import PlayersDropdown from "./playersDropdown";

type DropdownProps = {
  index: number;
  showOnRight: boolean;
  dropdownRef: RefObject<HTMLDivElement>;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Dropdown({
  index,
  showOnRight,
  dropdownRef,
  setIsDropdownOpen,
}: DropdownProps): ReactNode {
  const { setPlayers } = usePlayers();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640); // 640px = Tailwind 'sm'
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={
        isMobile
          ? "fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
          : "w-75 h-100 bg-white rounded-md flex flex-col gap-2 absolute right-full top-0 z-99 shadow-2xl drop-down p-2"
      }
      style={
        isMobile
          ? {}
          : {
              bottom: index == 11 ? "0" : "initial",
              top: index != 11 ? "0" : "initial",
              right: showOnRight ? "initial" : "100%",
              left: showOnRight ? "100%" : "initial",
            }
      }
    >
      {" "}
      <div
        ref={dropdownRef}
        className={
          isMobile
            ? "bg-white rounded-md flex flex-col gap-2 w-[90vw] max-w-md p-2"
            : " flex flex-col gap-2"
        }
      >
        <label
          htmlFor={`player-${index}-image`}
          className="w-full py-2 px-3 bg-light-gray/30 rounded-md flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all duration-200 text-base"
        >
          <RiFolderUploadFill className="text-black text-[1.5em] opacity-80" />
          <span className="text-[0.9em]">Upload From Device</span>
          <input
            type="file"
            id={`player-${index}-image`}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const renamedFile = new File(
                  [file],
                  `player-${index}-${file.name}`,
                  { type: file.type }
                );
                setPlayers((prev) => {
                  const newPlayers = [...prev];
                  newPlayers[index] = {
                    ...newPlayers[index],
                    image: renamedFile,
                  };
                  return newPlayers;
                });
                setIsDropdownOpen(false);
              }
            }}
          />
        </label>

        <div className="w-full h-full max-h-[21.125rem] py-2 px-3 bg-light-gray/30 rounded-md flex flex-col gap-2 text-[0.8em] max-lg:text-[0.9em] max-md:text-[1.2em] max-sm:text-[1rem]">
          <div className="w-full flex gap-1.5 items-center border-b-1 border-black/30 pb-1">
            <IoMdSearch className="text-lg" />
            <input
              type="text"
              className="w-full outline-none bg-transparent text-[0.9em]"
              placeholder="Search Player"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full h-full overflow-y-auto flex flex-col gap-1">
            {Object.entries(teamPlayers).map(([teamName, players]) => {
              // Filter players based on search term
              const filteredPlayers = players.filter((player) =>
                player.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              if (filteredPlayers.length === 0) return null;
              return (
                <PlayersDropdown
                  key={teamName}
                  teamName={teamName}
                  players={filteredPlayers}
                  index={index}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
