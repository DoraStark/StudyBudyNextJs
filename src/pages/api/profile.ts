import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    languages: ['🇩🇪 Deutsch', '🇬🇧 Englisch'],
    learn: ['🌍 Geografie', '🔭 Astronomy'],
    teach: ['➕ Mathe', '🎵 Musik'],
    preferences: [
      {
        title: "Was ich erwarte?",
        text: "Möchte gerne mehr über Klima und verschiedene Länder wissen und auch Saturn Bewegungen"
      },
      {
        title: "Wie kann ich dir helfen?",
        text: "Kann dir mit Mathe helfen, Geometrie und Algebra im Rahmen des Schulkurses und auch Musiktheorie"
      },
      {
        title: "Was noch?",
        text: "Ich wohne in Berlin (Prenzlauer Berg), habe Zeit mittwochs nachmittags, können uns treffen oder online – bin flexibel."
      }
    ]
  });
}
