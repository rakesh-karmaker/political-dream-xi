import type React from "react";

export default function FieldPatches(): React.ReactNode {
  return (
    <div className="absolute w-full h-full top-0  flex flex-col justify-center items-center -z-40">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="w-full min-h-[12%]"
          style={{
            background: i % 2 === 0 ? "var(--lime)" : "var(--green)",
          }}
        ></div>
      ))}
    </div>
  );
}
