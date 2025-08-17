import type React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import HeroTop from "./heroTop";
import FootballField from "../football-field/footballField";
import UploadBtns from "./uploadBtns";

export default function HeroContent(): React.ReactNode {
  return (
    <div className="w-full h-full min-h-[min(90vh,90vw,1700px)] flex flex-col justify-between gap-10 max-w-[50em] max-xl:max-w-full max-xl:min-h-fit max-xl:items-center max-xl:py-[min(10vh,10vw)]">
      <HeroTop />
      <div className="hidden max-xl:flex flex-col gap-3.5 items-center">
        <FootballField />
        <UploadBtns />
      </div>
      <QuoteBox />
    </div>
  );
}

function QuoteBox(): React.ReactNode {
  return (
    <div className="w-full p-6 bg-white/10 backdrop-blur-lg rounded-md flex flex-col gap-4 max-xl:max-w-[50em]">
      <FaQuoteLeft className="text-pure-white/40 text-3xl" />
      <div className="flex flex-col gap-2">
        <q className="text-pure-white/90 text-2xl italic font-medium max-2xl:text-xl max-md:text-lg">
          We weren't just fighting quotas; we were fighting the feeling of being
          invisible in our own meritocracy.
        </q>
        <p className="flex gap-1 items-center text-pure-white/80 text-sm italic">
          <span className="bg-pure-white/70 h-0.5 w-4" />
          Dibbo
        </p>
      </div>
    </div>
  );
}
