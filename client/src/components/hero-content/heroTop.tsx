import type React from "react";
import UploadBtns from "./uploadBtns";

export default function HeroTop(): React.ReactNode {
  return (
    <div className="w-full flex flex-col gap-6 max-xl:items-center max-md:gap-4">
      <h1 className="text-[3.4em]/[1.3] font-semibold text-pure-white max-w-[20ch] max-2xl:text-[2.5em] max-xl:text-center max-xl:text-[3em] max-md:text-4xl">
        From the Streets to the Stadium - Build Your Political Dream XI
      </h1>
      <div className="w-full flex flex-col gap-5 max-xl:items-center">
        <p className="text-lg text-pure-white/80 max-2xl:text-[1em] max-xl:max-w-[60ch] max-xl:text-center max-xl:text-lg max-md:text-[1em]">
          Where protest meets pitch. Assemble your ultimate team from the faces
          of the July Revolution, see them take the field, and watch the score
          climb in real time. Share your winning Political XI with the world.
        </p>
        <div className="max-xl:hidden">
          <UploadBtns />
        </div>
      </div>
    </div>
  );
}
