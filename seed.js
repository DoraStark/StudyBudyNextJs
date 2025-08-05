const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/studybuddy";

const userSchema = new mongoose.Schema({
  name: String,
  city: String,
  roles: [String],
  skills: [String]
});

const User = mongoose.model("User", userSchema);

async function seed() {
  await mongoose.connect(dbUrl);
  await User.deleteMany({});

  await User.insertMany([
    {
      name: "Basil Paner",
      city: "Berlin",
      roles: ["learner"],
      skills: ["Python", "Datenbanken"]
    },
    {
      name: "Maria Svendsen",
      city: "Berlin",
      roles: ["teacher"],
      skills: ["Chemie", "Erklären"]
    },
    {
      name: "Alex Beispiel",
      city: "Berlin",
      roles: ["learner", "teacher"],
      skills: ["Python", "MongoDB", "Erklären"]
    }
  ]);

  console.log(" Seed abgeschlossen");
  await mongoose.disconnect();
}

seed();
