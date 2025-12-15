export type PlayerType = {
  name: string;
  imageUrl: string;
};

export const teamPlayers: {
  [teamName: string]: PlayerType[];
} = {
  BNP: [
    {
      name: "Amir Khasru Mahmud Chowdhury",
      imageUrl: "/players/BNP/Amir Khasru Mahmud Chowdhury.webp",
    },
    {
      name: "Begum Khaleda Zia",
      imageUrl: "/players/BNP/Begum Khaleda Zia.webp",
    },
    {
      name: "Ishraque Hossain",
      imageUrl: "/players/BNP/Ishraque Hossain.webp",
    },

    {
      name: "Lutfozzaman Babar",
      imageUrl: "/players/BNP/Lutfozzaman Babar.webp",
    },
    {
      name: "Mirza Fakhrul Islam Alamgir",
      imageUrl: "/players/BNP/Mirza Fakhrul Islam Alamgir.webp",
    },
    {
      name: "Ruhul Kabir Rizvi",
      imageUrl: "/players/BNP/Ruhul Kabir Rizvi.webp",
    },
    {
      name: "Salahuddin Quader Chowdhury",
      imageUrl: "/players/BNP/Salahuddin Quader Chowdhury.webp",
    },
    {
      name: "Tarique Rahman",
      imageUrl: "/players/BNP/Tarique Rahman.webp",
    },
    {
      name: "Ziaur Rahman",
      imageUrl: "/players/BNP/Ziaur Rahman.webp",
    },
  ],
  JAMAT: [
    {
      name: "Syed Abdullah Md. Taher",
      imageUrl: "/players/JAMAT/Syed Abdullah Md. Taher.webp",
    },
  ],
  NCP: [
    {
      name: "Abdul Hannan Masud",
      imageUrl: "/players/NCP/Abdul Hannan Masud.webp",
    },
    {
      name: "Akhter Hossen",
      imageUrl: "/players/NCP/Akhter Hossen.webp",
    },
    {
      name: "Hasnat Abdullah",
      imageUrl: "/players/NCP/Hasnat Abdullah.webp",
    },
    {
      name: "Nahid Islam",
      imageUrl: "/players/NCP/Nahid Islam.webp",
    },
    {
      name: "Nasiruddin Patwary",
      imageUrl: "/players/NCP/Nasiruddin Patwary.webp",
    },
    {
      name: "Samantha Sharmin",
      imageUrl: "/players/NCP/Samantha Sharmin.webp",
    },
    {
      name: "Sarjis Alam",
      imageUrl: "/players/NCP/Sarjis Alam.webp",
    },
    {
      name: "Tasnim Jara",
      imageUrl: "/players/NCP/Tasnim Jara.webp",
    },
  ],
  "Independent Candidates": [
    {
      name: "Andaleeve Rahman Partho",
      imageUrl: "/players/Independent-Candidates/Andaleeve Rahman Partho.webp",
    },
    {
      name: "Asif Mahmud Shojib Bhuyain",
      imageUrl:
        "/players/Independent-Candidates/Asif Mahmud Shojib Bhuyain.webp",
    },
  ],
};
