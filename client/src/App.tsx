import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import FootballField from "./components/football-field/footballField";
import usePlayers from "./hooks/usePlayers";
import { fetchGoals } from "./lib/playersUpload";
import { useQuery } from "@tanstack/react-query";
import { useSocketStore } from "./stores/useSocketStore";
import HeroContent from "./components/hero-content/heroContent";

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
      <div className="max-w-[2900px] w-screen h-full min-h-screen flex justify-between items-center px-[5vh] gap-[2vh]">
        <HeroContent />
        <FootballField />
      </div>
      <img
        src="/slide-img-1.png"
        alt="slide-img-1"
        className="absolute top-0 left-0 w-full h-full object-cover -z-[9999] brightness-25"
      />
      <Toaster position="bottom-left" />
    </div>
  );
}

export default App;
