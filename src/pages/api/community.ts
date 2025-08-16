import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    users: [
      {
        name: "Anna",
        city: "Berlin",
        teach: ["🎵 Musik", "➕ Mathe"],
        learn: ["🌍 Geografie", "🔭 Astronomie"],
      },
      {
        name: "Mark",
        city: "London",
        teach: ["🎨 Kunst"],
        learn: ["🧬 Biologie", "🌍 Geografie"],
      },
      {
        name: "Lara",
        city: "Mainz",
        teach: ["🧮 Mathe"],
        learn: ["🎵 Musik"],
      },
      {
        name: "Erik",
        city: "Paris",
        teach: ["🎵 Musik", "➕ Mathe"],
        learn: ["🎨 Kunst"],
      },
      {
        name: "Karina",
        city: "Oslo",
        teach: ["🎨 Kunst"],
        learn: ["🧬 Biologie", "🔭 Astronomie"],
      },
      {
        name: "Louise",
        city: "Berlin",
        teach: ["🧮 Mathe"],
        learn: ["🎵 Musik"],
      },
    ],
  });
}
