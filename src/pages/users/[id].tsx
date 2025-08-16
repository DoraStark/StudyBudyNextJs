import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type User = {
  id?: string;
  name: string;
  city: string;
  teach?: string[];
  learn?: string[];
  skills?: string; // на случай старых данных
};

const accent = "#5B21B6";

export default function UserProfilePage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({ from: "", text: "" });
  const [status, setStatus] = useState<null | "ok" | "err">(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      // Берём список из /api/community и выбираем юзера по id,
      // т.к. на /users мы проставляли id = index+1
      const res = await fetch("/api/community");
      const data = await res.json();
      const list: User[] = (data.users || []).map((u: User, idx: number) => ({
        id: String(idx + 1),
        ...u,
      }));
      const found = list.find((u) => u.id === String(id)) || null;

      // если teach/learn отсутствуют, но есть skills — разложим skills в teach
      if (
        found &&
        !found.teach?.length &&
        !found.learn?.length &&
        found.skills
      ) {
        const parts = found.skills.split(",").map((s) => s.trim());
        setUser({ ...found, teach: parts, learn: [] });
      } else {
        setUser(found);
      }
    })();
  }, [id]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toUserId: id,
        from: form.from.trim(),
        text: form.text.trim(),
      }),
    });
    setStatus(res.ok ? "ok" : "err");
    if (res.ok) setForm({ from: "", text: "" });
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <a href="/users" className="btn btn-link mb-3">
        ← Back
      </a>

      <h2 className="mb-1" style={{ fontWeight: 800 }}>
        {user.name}
      </h2>
      <div className="mb-3">
        <span
          className="badge"
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,.85)",
          }}
        >
          {user.city}
        </span>
      </div>

      {/* Teach */}
      <div className="mb-3">
        <div className="mb-1" style={{ opacity: 0.9, fontWeight: 600 }}>
          Kann unterrichten
        </div>
        <div className="d-flex flex-wrap gap-2">
          {(user.teach || []).map((t, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                padding: ".25rem .6rem",
                borderRadius: 9999,
                fontSize: 13,
                background:
                  "linear-gradient(90deg, rgba(91,33,182,.95), rgba(124,58,237,.95))",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {t}
            </span>
          ))}
          {(!user.teach || user.teach.length === 0) && (
            <span className="text-white-50">—</span>
          )}
        </div>
      </div>

      {/* Learn */}
      <div className="mb-4">
        <div className="mb-1" style={{ opacity: 0.9, fontWeight: 600 }}>
          Möchte lernen
        </div>
        <div className="d-flex flex-wrap gap-2">
          {(user.learn || []).map((l, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                padding: ".25rem .6rem",
                borderRadius: 9999,
                fontSize: 13,
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                border: `1px solid ${accent}`,
              }}
            >
              {l}
            </span>
          ))}
          {(!user.learn || user.learn.length === 0) && (
            <span className="text-white-50">—</span>
          )}
        </div>
      </div>

      {/* Сообщение */}
      <div
        className="p-3 shadow-sm"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          borderRadius: 12,
        }}
      >
        <h5 className="mb-3" style={{ fontWeight: 700 }}>
          Nachricht senden
        </h5>
        <form className="vstack gap-3" onSubmit={send}>
          <input
            className="form-control"
            placeholder="Ihr Name oder E-Mail"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
            required
            style={{ backgroundColor: "rgba(255,255,255,.9)" }}
          />
          <textarea
            className="form-control"
            rows={3}
            placeholder="Ihre Nachricht…"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
            style={{ backgroundColor: "rgba(255,255,255,.9)" }}
          />
          <button
            className="btn btn-lg align-self-start"
            style={{
              backgroundColor: accent,
              borderColor: accent,
              color: "#fff",
            }}
          >
            Senden
          </button>
          {status === "ok" && <div className="text-success">Gesendet</div>}
          {status === "err" && (
            <div className="text-danger">Fehler beim Senden</div>
          )}
        </form>
      </div>
    </div>
  );
}
