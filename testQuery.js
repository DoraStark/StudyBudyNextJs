const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/studybuddy";

const userSchema = new mongoose.Schema({
  name: String,
  city: String,
  roles: [String],
  skills: [String]
});

const User = mongoose.model("User", userSchema);

async function run() {
  await mongoose.connect(dbUrl);

  console.log("Alle Benutzer:");
  const allUsers = await User.find();
  console.log(allUsers);

  console.log("\nNur die, die Python können:");
  const pythonUsers = await User.find({ skills: "Python" });
  console.log(pythonUsers);

  await mongoose.disconnect();
}

run();
