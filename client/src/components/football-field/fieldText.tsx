import type React from "react";

export default function FieldText(): React.ReactNode {
  const score: number = 260;
  return (
    <>
      <div className="absolute bottom-[12%] flex flex-col items-center">
        <p className="text-darkest-green text-[2em]/[80%] font-bold">
          {score}
          {/* <sup className="text-lg font-semibold -top-4.5">th</sup> */}
        </p>
        <p className="text-darkest-green text-[1.05em] font-semibold">Goals</p>
      </div>

      <div className="absolute bottom-[2%]">
        <p className="text-dark-green text-[2.2em] font-bold">
          Political Dream XI
        </p>
      </div>
    </>
  );
}
