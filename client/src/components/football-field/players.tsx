import usePlayers from "@/hooks/usePlayers";
import { formations, type PlayerPosition } from "@/services/data/positions";
import type React from "react";
import { useState } from "react";

import PlayerInput from "./playerInput";

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
