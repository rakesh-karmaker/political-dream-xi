import type React from "react";
import UploadBtns from "./uploadBtns";

export default function HeroTop(): React.ReactNode {
  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-[3.4em]/[1.3] font-semibold text-pure-white max-w-[20ch]">
        From the Streets to the Stadium - Build Your Political Dream XI
      </h1>
      <div className="w-full flex flex-col gap-5">
        <p className="text-lg text-pure-white/80">
          Where protest meets pitch. Assemble your ultimate team from the faces
          of the July Revolution, see them take the field, and watch the score
          climb in real time. Share your winning Political XI with the world.
        </p>
        <UploadBtns />
      </div>
    </div>
  );
}
