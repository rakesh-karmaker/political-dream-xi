import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import FootballField from "./components/football-field/footballField";
import usePlayers from "./hooks/usePlayers";
import { fetchGoals } from "./lib/playersUpload";
import { useQuery } from "@tanstack/react-query";
import { useSocketStore } from "./stores/useSocketStore";
import HeroContent from "./components/hero-content/heroContent";
import ImageSwiper from "./components/swiper/imageSwiper";

function App() {
  const { setGoals } = usePlayers();

  // set up socket
  const connect = useSocketStore((s) => s.connect);
  const disconnect = useSocketStore((s) => s.disconnect);
  const socket = useSocketStore((s) => s.socket);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("image-created", (data) => {
        setGoals(parseInt(data.goals ?? 0, 10));
      });
    }
  }, [socket]);

  // Fetch goals
  const { data, isLoading } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setGoals(data);
    }
  }, [data, isLoading]);

  return (
    <div className="relative w-screen h-full min-h-screen flex justify-center items-center">
      <div className="max-w-[2900px] w-screen h-full min-h-screen flex max-xl:flex-col justify-between items-center px-[min(5vh,5vw)] gap-[4vh]">
        <HeroContent />
        <div className="max-xl:hidden">
          <FootballField />
        </div>
      </div>
      <ImageSwiper />
      <Toaster position="bottom-left" />
    </div>
  );
}

export default App;
