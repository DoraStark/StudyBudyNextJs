import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const users = await User.find({}, "username teach location");

  res.status(200).json({
    users: users.map((u) => ({
      name: u.username,
      skills: u.teach.join(", "),
      location: u.location || "Berlin", // если location нет — Berlin
    })),
  });
}
