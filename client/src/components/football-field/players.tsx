import usePlayers from "@/hooks/usePlayers";
import { formations, type PlayerPosition } from "@/services/data/positions";
import type React from "react";
import { useEffect, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";

export default function Players(): React.ReactNode {
  const { formation, setFormation } = usePlayers();
  const [position, setPosition] = useState<PlayerPosition[]>(
    formations[formation]
  );
  return (
    <div className="w-full h-full absolute inset-0 ">
      {position.map((position, index) => (
        <PlayerInput key={index} index={index} position={position} />
      ))}
      {/* Accessible label for formation select */}
      <label htmlFor="formation-select" className="sr-only">
        Formation
      </label>
      <select
        id="formation-select"
        name="formation"
        value={formation}
        onChange={(e) => {
          const newFormation = e.target.value as keyof typeof formations;
          setFormation(newFormation);
          setPosition(formations[newFormation]);
        }}
        className="absolute top-2 right-2 bg-white border border-gray-300 rounded p-2 shadow"
      >
        <option value="formation442">4-4-2</option>
        <option value="formation334">3-3-4</option>
        <option value="formation1144">1-1-4-4</option>
        <option value="formation1243">1-2-4-3</option>
        <option value="formation145">1-4-5</option>
        <option value="formation1234">1-2-3-4</option>
      </select>
    </div>
  );
}

function PlayerInput({
  index,
  position,
}: {
  index: number;
  position: PlayerPosition;
}): React.ReactNode {
  const { players, setPlayers } = usePlayers();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (players[index].image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(players[index].image);
    }
  }, [players[index].image]);

  return (
    <div
      className="w-[15.5%] h-fit flex flex-col items-center gap-[0.05em] absolute transition-all duration-200"
      style={{
        bottom: `${position.y}%`,
        left: `${position.x}%`,
      }}
    >
      <label
        htmlFor={`player-${index}-image`}
        className="w-[57%] aspect-square rounded-full relative cursor-pointer"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
            }
          }}
        />
        {image === "" && (
          <div className="absolute inset-0 flex justify-center items-center rounded-full backdrop-brightness-75 backdrop-blur-xl hover:backdrop-brightness-50 transition-all duration-200">
            <RiFolderUploadFill className="text-white text-[1.7em]" />
          </div>
        )}
      </label>
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
