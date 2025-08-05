
import mongoose from "mongoose";
import User from "../src/models/User";

async function seed() {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/studybuddy");

  await User.deleteMany({}); 

  await User.insertMany([
    {
      username: "Alex",
      languages: ["🇩🇪 Deutsch", "🇬🇧 Englisch"],
      learn: ["🌍 Geografie"],
      teach: ["🎵 Musik", "➕ Mathe"],
      preferences: [
        { title: "Was ich erwarte?", text: "Möchte gerne mehr über Klima und verschiedene Länder wissen und auch Saturn Bewegungen", },
        { title: "Wie kann ich helfen?",text:"Kann dir mit Mathe helfen, Geometrie und Algebra im Rahmen des Schulkurses und auch Musiktheorie",},
        { title: "Was noch?", text: "Ich wohne in Berlin (Prenzlauer Berg), habe Zeit mittwochs nachmittags, können uns treffen oder online – bin flexibel." },
      ],
    },
    {
      username: "Lara",
      languages: ["🇩🇪 Deutsch"],
      learn: ["📐 Geometrie"],
      teach: ["🎨 Kunst", "📖 Deutsch"],
      preferences: [
        { title: "Was ich erwarte?", text: "Kreatives Arbeiten" },
        { title: "Wie kann ich helfen?", text: "Kunst-Projekte" },
        { title: "Was noch?", text: "Bin flexibel nachmittags" },
      ],
    },
    {
      username: "Mark",
      languages: ["🇬🇧 Englisch"],
      learn: ["🎵 Musik"],
      teach: ["➕ Mathe"],
      preferences: [
        { title: "Was ich erwarte?", text: "Regelmäßiger Austausch" },
        { title: "Wie kann ich helfen?", text: "Mathe-Nachhilfe" },
        { title: "Was noch?", text: "Online-Termine bevorzugt" },
      ],
    },
  ]);

  
  await mongoose.disconnect();
}

seed();