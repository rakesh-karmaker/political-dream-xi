import usePlayers from "@/hooks/usePlayers";
import type React from "react";
import { useEffect, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";

export default function Players(): React.ReactNode {
  return (
    <div className="w-full h-full absolute inset-0 ">
      <div className="w-full h-full max-h-[77%] flex flex-col gap-[9%] items-center">
        <div className="w-full h-fit flex justify-center gap-[12%] pt-[5%]">
          <PlayerInput index={0} />
          <PlayerInput index={1} />
        </div>
        <div className="w-full h-fit flex justify-center gap-[12%]">
          <div className="w-full h-fit flex justify-end items-center gap-[6%]">
            <PlayerInput index={2} />
            <PlayerInput index={3} />
          </div>
          <div className="w-full h-fit flex items-center gap-[6%]">
            <PlayerInput index={4} />
            <PlayerInput index={5} />
          </div>
        </div>
        <div className="w-full h-fit flex justify-center gap-[12%]">
          <div className="w-full h-fit flex justify-end items-center gap-[6%]">
            <PlayerInput index={6} />
            <PlayerInput index={7} />
          </div>
          <div className="w-full h-fit flex items-center gap-[6%]">
            <PlayerInput index={8} />
            <PlayerInput index={9} />
          </div>
        </div>
        <div className="w-full h-fit flex justify-center items-center mt-[3%]">
          <PlayerInput index={10} />
        </div>
      </div>
      <div className="absolute bottom-[6%] left-[0.5%]">
        <PlayerInput index={11} />
      </div>
    </div>
  );
}

function PlayerInput({ index }: { index: number }): React.ReactNode {
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
    <div className="w-[min(14vh,14vw)] h-fit flex flex-col items-center gap-[1%]">
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
              setPlayers((prev) => {
                const newPlayers = [...prev];
                newPlayers[index] = { ...newPlayers[index], image: file };
                return newPlayers;
              });
            }
          }}
        />
        {image === "" && (
          <div className="absolute inset-0 flex justify-center items-center rounded-full backdrop-brightness-75 backdrop-blur-xl hover:backdrop-brightness-50 transition-all duration-200">
            <RiFolderUploadFill className="text-white text-[min(3.2vh,3.2vw)]" />
          </div>
        )}
      </label>
      <input
        type="text"
        name={`player-${index}-name`}
        id={`player-${index}-name`}
        className="w-full border-b-[0.2em] border-darkest-green p-[0.2em] outline-none text-[0.65em] text-center rounded-none text-darkest-green focus-within:border-dark-green transition-all duration-200"
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
