import type React from "react";
import FieldPatches from "./fieldPatches";
import FieldOutline from "./fieldOutline";
import FieldText from "./fieldText";
import Players from "./players";

export default function FootballField(): React.ReactNode {
  return (
    <div className="field w-[min(90vh,90vw,1700px)] h-[min(90vh,90vw,1700px)] max-w-[min(90vh,90vw,1700px)] max-h-[min(90vh,90vw,1700px)] min-w-[min(90vh,90vw,1700px)] min-h-[min(90vh,90vw,1700px)] text-[min(2vh,2vw,43px)] aspect-square rounded-md relative overflow-hidden flex justify-center items-center border-[0.45em] border-solid border-black">
      <FieldPatches />
      <FieldOutline />
      <FieldText />
      <Players />
    </div>
  );
}
