import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    users: [
      { name: "Anna", skills: "🎵 Musik, ➕ Mathe" },
      { name: "Mark", skills: "🎨 Kunst, ➕ Bio" },
      { name: "Lara", skills: "🧮 Mathe, ➕ Musik" },
      { name: "Erik", skills: "🎵 Musik, ➕ Mathe" },
      { name: "Karina", skills: "🎨 Kunst, ➕ Bio" },
      { name: "Louise", skills: "🧮 Mathe, ➕ Musik" }
    ]
  });
}
