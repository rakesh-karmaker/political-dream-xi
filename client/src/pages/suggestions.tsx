import { deleteSuggestion, getSuggestions } from "@/lib/suggestUpload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Suggestions(): ReactNode {
  const {
    data: suggestions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  });

  const suggestionMutation = useMutation({
    mutationFn: (id: string) => deleteSuggestion(id),
    onSuccess: () => {
      toast.success("Suggestion deleted successfully!");
    },
    onError: (err) => {
      console.error("Error deleting suggestion:", err);
      toast.error(`Error deleting suggestion: ${err.message}`);
    },
  });

  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {
    if (suggestions) {
      setSuggestionList(suggestions);
    }
  }, [suggestions]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen px-10 flex justify-center items-center">
        Loading suggestions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-screen h-screen px-10 flex justify-center items-center">
        Error loading suggestions.
      </div>
    );
  }

  function handleDelete(id: string) {
    suggestionMutation.mutate(id);
    setSuggestionList(
      suggestionList.filter(
        (suggestion: { _id: string }) => suggestion._id !== id
      )
    );
  }

  return (
    <>
      <section className="w-full h-full min-h-screen flex justify-center items-center p-10 max-sm:p-4 max-sm:items-start max-xs:p-2">
        <div className="w-full max-w-130 flex flex-col gap-3">
          <h1 className="text-3xl font-bold mb-6">Player Suggestions</h1>
          <div className="w-full h-full max-h-100 max-sm:max-h-[calc(100vh-8rem)] overflow-y-auto flex flex-col gap-3">
            {suggestionList && suggestionList.length > 0 ? (
              suggestionList.map(
                (
                  suggestion: {
                    teamName: string;
                    playerName: string;
                    _id: string;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="w-full p-2 pl-3 bg-light-gray/5 border border-black/7 rounded-md flex justify-between items-center gap-3"
                  >
                    <div>
                      <p>
                        {" "}
                        <span className="font-semibold">Team:</span>{" "}
                        {suggestion.teamName}{" "}
                      </p>
                      <p>
                        {" "}
                        <span className="font-semibold">Player:</span>{" "}
                        {suggestion.playerName}{" "}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(suggestion._id)}
                      className="text-xl w-10 h-10 rounded-md flex justify-center items-center bg-red-500 text-white cursor-pointer hover:bg-red-200 transition-all duration-200"
                    >
                      &#10005;
                    </button>
                  </div>
                )
              )
            ) : (
              <p>No suggestions available.</p>
            )}
          </div>
        </div>
      </section>
      <Toaster position="bottom-left" />
    </>
  );
}
