import mongoose, { Schema, Model } from "mongoose";

// Просто определяем тип, без связки с Mongoose Document
export interface IUser {
  name: string;
  city: string;
  roles: string[];
  skills: string[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  roles: [{ type: String }],
  skills: [{ type: String }],
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
