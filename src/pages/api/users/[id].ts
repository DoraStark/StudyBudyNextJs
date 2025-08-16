// src/pages/api/users/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { USERS } from "./data"; // if your file sits next to [id].ts; use "../users/data" only if needed

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
  if (typeof v === "string")
    return v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
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

    const current = (USERS as any[])[idx] as User;
    const body = req.body ?? {};

    const updated: User = {
      ...current,
      name: typeof body.name === "string" ? body.name : current.name,
      city: typeof body.city === "string" ? body.city : current.city,
      about: typeof body.about === "string" ? body.about : current.about,
      skills: toArray(body.skills) ?? current.skills,
      roles: toArray(body.roles) ?? current.roles,
      teach: toArray(body.teach) ?? current.teach,
      learn: toArray(body.learn) ?? current.learn,
    };

    (USERS as any[])[idx] = updated; // in-memory update (dev only)
    return res.status(200).json(updated);
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).end();
}
