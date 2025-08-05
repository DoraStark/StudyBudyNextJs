import mongoose from "mongoose";
import User from "../src/models/User";

async function run() {
  await mongoose.connect("mongodb://localhost:27017/studybuddy");

 
  const users = await User.find();
  console.log("All users:", users);

  
  const alex = await User.findOne({ username: "Alex" });
  console.log("User Alex:", alex);

  await mongoose.disconnect();
}

run();
