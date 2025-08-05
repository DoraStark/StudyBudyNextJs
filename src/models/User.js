import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  city: String,
  roles: [String],
  skills: [String]
});

module.exports = mongoose.model('User', userSchema);

