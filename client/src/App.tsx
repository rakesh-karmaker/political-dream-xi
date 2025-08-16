import { useState } from "react";
import "./App.css";
import FootballField from "./components/football-field/footballField";
import usePlayers from "./hooks/usePlayers";
import { uploadPlayerImages } from "./lib/playersUpload";

function App() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const { players, formation } = usePlayers();
  async function handleUpload() {
    // Call the upload function here
    const res = await uploadPlayerImages(players, formation);
    console.log("Upload response:", res);
    if (res.status === 200) {
      const imageBuffer = new Blob([res.data]);
      const imageUrl = URL.createObjectURL(imageBuffer);
      console.log("Uploaded image URL:", imageUrl);
      setUploadedImageUrl(imageUrl);
    }
  }
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
