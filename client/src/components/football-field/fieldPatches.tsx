import type React from "react";

export default function FieldPatches(): React.ReactNode {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className="w-full h-[20%]"
          style={{
            background: i % 2 === 0 ? "var(--green)" : "var(--lime)",
          }}
        ></div>
      ))}
    </div>
  );
}
