// src/lib/mongoose.ts
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
   
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
};
