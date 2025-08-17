import type React from "react";
import HeroTop from "./heroTop";

export default function HeroContent(): React.ReactNode {
  return (
    <div className="w-full h-full min-h-[min(90vh,90vw,1700px)] flex flex-col justify-between max-w-[50em]">
      <HeroTop />
    </div>
  );
}
