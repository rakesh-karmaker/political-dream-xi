import toast from "react-hot-toast";
import UploadBtn from "../ui/uploadBtn";
import { useMutation } from "@tanstack/react-query";
import { uploadPlayerImages } from "@/lib/playersUpload";
import type { AxiosError } from "axios";
import usePlayers from "@/hooks/usePlayers";
import type React from "react";

export default function UploadBtns(): React.ReactNode {
  const { players, formation, setGoals } = usePlayers();
  const downloadMutation = useMutation({
    mutationFn: (isSharing: boolean) =>
      uploadPlayerImages(players, formation, isSharing),
  });

  function handleUpload(social?: "facebook" | "linkedin") {
    downloadMutation.mutate(social ? true : false, {
      onSuccess(res) {
        setGoals(parseInt(res.data.goals ?? 0, 10));

        // Share the image or download
        if (res.data.url && res.data.url !== "") {
          if (social === "facebook") {
            window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${res.data.url}`;
          } else if (social === "linkedin") {
            window.location.href = `https://www.linkedin.com/sharing/share-offsite/?url=${res.data.url}`;
          }
        } else {
          handleDownload(res.data.buffer);
        }

        // Show a success toast
        toast.success(
          `Congrats! You are the ${res.data.goals}th person to generate an image`,
          {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background:
                "color-mix(in oklab, var(--pure-black) 25%, transparent)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            },
          }
        );
      },
      // Handle errors
      onError(error) {
        const axiosError = error as AxiosError;
        if (axiosError.status === 400) {
          // Handle bad request errors
          toast.error("Please upload player images.", {
            style: {
              borderRadius: "10px",
              background:
                "color-mix(in oklab, var(--pure-black) 25%, transparent)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            },
          });
        } else {
          // Handle other errors
          toast.error("Failed to generate image. Please try again.", {
            style: {
              borderRadius: "10px",
              background:
                "color-mix(in oklab, var(--pure-black) 25%, transparent)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            },
          });
        }
      },
    });
  }

  // download the image
  function handleDownload(buffer: string) {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${buffer}`;
    link.download = "football-field-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="w-full flex gap-2">
      <UploadBtn
        onClick={handleUpload}
        title="Download"
        isLoading={downloadMutation.isPending}
      />
      <UploadBtn
        social="facebook"
        onClick={handleUpload}
        title="Share on Facebook"
        isLoading={downloadMutation.isPending}
      />
      <UploadBtn
        social="linkedin"
        onClick={handleUpload}
        title="Share on LinkedIn"
        isLoading={downloadMutation.isPending}
      />
    </div>
  );
}
