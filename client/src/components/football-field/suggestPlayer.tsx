import { suggestPlayer } from "@/lib/suggestUpload";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import toast from "react-hot-toast";

export default function SuggestPlayer(): ReactNode {
  const [teamName, setTeamName] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [isSuggestPlayerOpen, setIsSuggestPlayerOpen] =
    useState<boolean>(false);

  const suggestionMutation = useMutation({
    mutationFn: (newSuggestion: { teamName: string; playerName: string }) =>
      suggestPlayer(newSuggestion.teamName, newSuggestion.playerName),
    onSuccess: () => {
      toast.success("Suggestion submitted successfully!");
    },
    onError: (err) => {
      console.error("Error submitting suggestion:", err);
      toast.error(`Error submitting suggestion: ${err.message}`);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    suggestionMutation.mutate({ teamName, playerName });
    setIsSuggestPlayerOpen(false);
  }
  return (
    <>
      <button
        className="w-full py-2 px-3 bg-light-gray/30 border-1 border-black/10 rounded-md flex justify-center items-center gap-2 cursor-pointer hover:opacity-70 transition-all duration-200 text-base"
        onClick={() => setIsSuggestPlayerOpen(true)}
      >
        Suggest Player
      </button>
      <Modal
        open={isSuggestPlayerOpen}
        onClose={() => setIsSuggestPlayerOpen(false)}
        aria-labelledby="suggest-player-modal-title"
        aria-describedby="suggest-player-modal-description"
        className="w-full h-full flex justify-center items-center team-modal"
      >
        <div className="w-full max-w-70 h-fit p-4 flex flex-col gap-6 justify-center bg-white rounded-md">
          <h2>Suggest a Player</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col gap-3"
          >
            <TextField
              name="teamName"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
              label="Team Name"
              variant="outlined"
              fullWidth
              required
              size="small"
            />
            <TextField
              name="playerName"
              onChange={(e) => {
                setPlayerName(e.target.value);
              }}
              label="Player Name"
              variant="outlined"
              fullWidth
              required
              size="small"
            />
            <button
              type="submit"
              className="w-full py-2 px-3 bg-black text-white rounded-md flex justify-center items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200 text-base"
            >
              Submit Suggestion
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
