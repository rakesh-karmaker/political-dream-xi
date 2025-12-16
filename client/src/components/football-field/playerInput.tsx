import usePlayers from "@/hooks/usePlayers";
import type { PlayerPosition } from "@/services/data/positions";
import { useEffect, useRef, useState, type RefObject } from "react";
import { GoPlus } from "react-icons/go";
import Dropdown from "./dropdown";

export default function PlayerInput({
  index,
  position,
}: {
  index: number;
  position: PlayerPosition;
}): React.ReactNode {
  const { players, setPlayers } = usePlayers();
  const [image, setImage] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (players[index].image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(players[index].image);
    }

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const modals = document.getElementsByClassName("team-modal");
      for (let i = 0; i < modals.length; i++) {
        if (modals[i].contains(target)) {
          return;
        }
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    });

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, [players[index].image]);

  const [showOnRight, setShowOnRight] = useState(false);

  useEffect(() => {
    if (isDropdownOpen && btnRef.current && dropdownRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      const dropdownLeft = btnRect.left - dropdownWidth;
      if (dropdownLeft < 0) {
        setShowOnRight(true);
      } else {
        setShowOnRight(false);
      }
    }
  }, [isDropdownOpen]);

  return (
    <div
      className="w-[15.5%] h-fit flex flex-col items-center gap-[0.05em] absolute transition-all duration-200"
      style={{
        bottom: `${position.y}%`,
        left: `${position.x}%`,
      }}
    >
      {isDropdownOpen ? (
        <Dropdown
          index={index}
          showOnRight={showOnRight}
          dropdownRef={dropdownRef as RefObject<HTMLDivElement>}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      ) : null}
      <button
        ref={btnRef}
        className="w-[57%] aspect-square rounded-full relative cursor-pointer"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={(e) => {
          e.preventDefault();
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {image === "" && (
          <div className="absolute inset-0 flex justify-center items-center rounded-full backdrop-brightness-75 backdrop-blur-xl hover:backdrop-brightness-50 transition-all duration-200">
            <GoPlus
              className="text-white text-[2.7em] transition-all duration-100"
              style={{
                rotate: isDropdownOpen ? "-45deg" : "0deg",
              }}
            />
          </div>
        )}
      </button>

      <input
        type="text"
        name={`player-${index}-name`}
        id={`player-${index}-name`}
        className="w-full border-b-[0.2em] border-pure-white p-[0.2em] outline-none text-[0.8em] text-center rounded-none text-pure-white focus-within:border-black transition-all duration-200 placeholder:text-pure-white/70"
        placeholder={players[index].placeHolder}
        value={players[index].name}
        onChange={(e) => {
          const newName = e.target.value;
          setPlayers((prev) => {
            const newPlayers = [...prev];
            newPlayers[index] = { ...newPlayers[index], name: newName };
            return newPlayers;
          });
        }}
      />
    </div>
  );
}
