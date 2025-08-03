import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUser extends Document {
  name: string;
  city: string;
  roles: string[];
  skills: string[];
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  roles: [{ type: String, required: true }],
  skills: [{ type: String, required: true }],
});


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', 
UserSchema);
export default User;
