import type { NextApiRequest, NextApiResponse } from "next";
import { USERS } from "./data"; // IMPORTANT: "./data" (same folder), not "../users/data"

type User = {
  id?: string;
  _id?: string;
  name: string;
  city: string;
  skills?: string[];
  roles?: string[];
  teach?: string[];
  learn?: string[];
  about?: string;
};

const toArray = (v: unknown): string[] | undefined => {
  if (Array.isArray(v)) return v.map(String);
  return undefined;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  const idx = (USERS as any[]).findIndex(
    (u: any) => String(u._id ?? u.id) === String(id)
  );

  if (req.method === "GET") {
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    return res.status(200).json((USERS as any[])[idx]);
  }

  if (req.method === "PUT") {
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const cur = (USERS as any[])[idx] as User;
    const b = req.body ?? {};
    const updated: User = {
      ...cur,
      name: typeof b.name === "string" ? b.name : cur.name,
      city: typeof b.city === "string" ? b.city : cur.city,
      about: typeof b.about === "string" ? b.about : cur.about,
      skills: toArray(b.skills) ?? cur.skills,
      roles: toArray(b.roles) ?? cur.roles,
      teach: toArray(b.teach) ?? cur.teach,
      learn: toArray(b.learn) ?? cur.learn,
    };
    (USERS as any[])[idx] = updated;
    return res.status(200).json(updated);
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).end();
}
