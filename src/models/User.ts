
import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  languages: [String],
  learn: [String],
  teach: [String],
  preferences: [PreferenceSchema],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
