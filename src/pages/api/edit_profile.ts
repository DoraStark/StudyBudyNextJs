import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectToDatabase();
  const { username, languages, learn, teach, preferences } = req.body;

  const updated = await User.findOneAndUpdate(
    { username },
    { languages, learn, teach, preferences },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "Updated", user: updated });
}
