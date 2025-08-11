import type React from "react";
import FieldPatches from "./fieldPatches";

export default function FootballField(): React.ReactNode {
  return (
    <div className="h-[90vh] aspect-square relative overflow-hidden px-13.5 bg-green-500 flex justify-center items-center">
      <FieldPatches />
    </div>
  );
}
