import type React from "react";

export default function UploadBtn({
  social,
  onClick,
  title,
  isLoading,
}: {
  social?: "facebook" | "linkedin";
  onClick: (social?: "facebook" | "linkedin") => void;
  title: string;
  isLoading: boolean;
}): React.ReactNode {
  return (
    <button
      onClick={() => onClick(social ?? undefined)}
      className="w-full h-fit p-3 bg-pure-white/25 backdrop-blur-lg rounded-md cursor-pointer text-pure-white text-xl hover:bg-pure-white/30 disabled:pointer-events-none disabled:opacity-60 transition-all duration-300"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : title}
    </button>
  );
}
