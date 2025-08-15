import type React from "react";
import FieldPatches from "./fieldPatches";
import FieldOutline from "./fieldOutline";
import FieldText from "./fieldText";
import Players from "./players";

export default function FootballField(): React.ReactNode {
  return (
    <div className="field w-[min(90vh,90vw)] h-[min(90vh,90vw)] max-w-[min(90vh,90vw)] max-h-[min(90vh,90vw)] text-[min(2vh,2vw)] aspect-square rounded-md relative overflow-hidden flex justify-center items-center border-[0.45em] border-solid border-black">
      <FieldPatches />
      <FieldOutline />
      {/* <img
        src="/145.png"
        alt="334"
        className="w-full h-full absolute top-0 left-0"
      /> */}
      <FieldText />
      <Players />
    </div>
  );
}
