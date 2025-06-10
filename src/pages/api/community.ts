import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    users: [
      { name: "Anna", skills: "🎵 Musik, ➕ Mathe", city: "Berlin", },
      { name: "Mark", skills: "🎨 Kunst, ➕ Bio" , city: "London",},
      { name: "Lara", skills: "🧮 Mathe, ➕ Musik", city: "Mainz" ,},
      { name: "Erik", skills: "🎵 Musik, ➕ Mathe", city: "Paris", },
      { name: "Karina", skills: "🎨 Kunst, ➕ Bio" , city: "Oslo",},
      { name: "Louise", skills: "🧮 Mathe, ➕ Musik", city: "Berlin" }
    ]
  });
}
