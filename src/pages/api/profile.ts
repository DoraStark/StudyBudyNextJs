
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const user = await User.findOne({ username: "Alex" });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    languages: user.languages,
    learn: user.learn,
    teach: user.teach,
    preferences: user.preferences,
  });
}
