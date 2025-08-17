import { useEffect, useState } from "react";
import "./App.css";
import FootballField from "./components/football-field/footballField";
import usePlayers from "./hooks/usePlayers";
import { fetchGoals, uploadPlayerImages } from "./lib/playersUpload";
import { useQuery } from "@tanstack/react-query";
import { useSocketStore } from "./stores/useSocketStore";

function App() {
  // set up socket
  const connect = useSocketStore((s) => s.connect);
  const disconnect = useSocketStore((s) => s.disconnect);
  const socket = useSocketStore((s) => s.socket);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { players, formation, setGoals } = usePlayers();

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

  async function handleUpload() {
    // Call the upload function here
    const res = await uploadPlayerImages(players, formation, false);
    if (res.status === 200) {
      const imageUrl = `data:image/png;base64,${res.data.buffer}`;
      setUploadedImageUrl(imageUrl);
      setGoals(parseInt(res.data.goals ?? 0, 10));
      if (res.data.url && res.data.url !== "") {
        window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${res.data.url}`;
      }
    }
  }

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
    <div className="w-screen h-full flex flex-col justify-center items-center">
      <FootballField />
      <button onClick={handleUpload}>upload</button>
      <img
        src={uploadedImageUrl}
        alt="Uploaded Player"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default App;
