import type { NextApiRequest, NextApiResponse } from "next";
import { USERS } from "./data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }

  const q = String(req.query.q ?? "")
    .trim()
    .toLowerCase();
  if (!q) return res.status(200).json({ users: USERS });

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.city.toLowerCase().includes(q) ||
      u.skills.some((s) => s.toLowerCase().includes(q))
  );

  return res.status(200).json({ users: filtered });
}
