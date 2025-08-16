import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  name: string;
  city: string;
  roles: string[];
  teach: string[];
  learn: string[];
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  roles: [{ type: String }],
  teach: [{ type: String }],
  learn: [{ type: String }],
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
