import usePlayers from "@/hooks/usePlayers";
import type React from "react";

export default function FieldText(): React.ReactNode {
  const { goals } = usePlayers();
  return (
    <>
      <div className="absolute bottom-[15%] flex flex-col items-center z-40">
        <p className="text-lime text-[2.45em]/[80%] font-bold">{goals}</p>
      </div>
      <p className="text-lime text-[1.25em] font-semibold absolute bottom-[8.92%] z-20">
        Goals
      </p>
      <div className="w-[6%] h-[4%] bg-green absolute bottom-[9%] left-[44%]"></div>
      <div className="w-[6%] h-[4%] bg-dark-green absolute bottom-[9%] left-[50%]"></div>

      <div className="absolute bottom-[2%]">
        <p className="text-[2.2em] font-bold bg-clip-text bg-[linear-gradient(92.26deg,rgba(48,255,52,0.78)-62.95%,rgba(0,255,204,0.78)157.87%)] text-transparent">
          Political Dream XI
        </p>
      </div>
    </>
  );
}
