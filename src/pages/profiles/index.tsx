import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type User = {
  _id?: string;
  id?: string;
  name: string;
  city: string;
  teach?: string[];
  learn?: string[];
  skills?: string[];
};

const accent = "#5B21B6";

export default function Profiles() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setErr(null);

    const params = q ? `?q=${encodeURIComponent(q)}` : "";
    fetch(`/api/users${params}`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.users)
          ? data.users
          : [];
        setUsers(list);
      })
      .catch((e: any) => {
        if (e.name !== "AbortError") setErr(String(e?.message || e));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [q]);

  const safeUsers = useMemo(() => (Array.isArray(users) ? users : []), [users]);

  return (
    <>
      <Head>
        <title>Profiles — StudyBuddy</title>
        <meta name="description" content="Create and browse user profiles" />
      </Head>

      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h4 m-0" style={{ color: "#fff", fontWeight: 800 }}>
            Profiles
          </h1>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
            Create a profile and find people by interests
          </div>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <input
            placeholder="Search users…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="form-control form-control-sm"
            style={{
              minWidth: 240,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "#fff",
            }}
          />

          <Link
            href="/profiles/new"
            className="btn"
            style={{
              padding: ".55rem 1rem",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,.18)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.06))," +
                "linear-gradient(90deg, rgba(91,33,182,1), rgba(124,58,237,1))",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 12px 32px rgba(91,33,182,.45)",
              transition: "transform .08s ease",
              whiteSpace: "nowrap",
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(1px)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
          >
            ➕ Create profile
          </Link>
        </div>
      </div>

      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}
      {loading && <p style={{ color: "rgba(255,255,255,.75)" }}>Loading…</p>}
      {!loading && !err && safeUsers.length === 0 && (
        <p style={{ color: "rgba(255,255,255,.75)" }}>No profiles yet.</p>
      )}

      <div className="row g-3">
        {safeUsers.map((user, i) => {
          const id = user._id ?? user.id ?? `${user.name}-${user.city}-${i}`;
          return (
            <div className="col-12 col-md-6 col-lg-4" key={id}>
              <div
                className="h-100 shadow-sm"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(6px)",
                  borderRadius: 12,
                  padding: 16,
                  color: "#fff",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="m-0" style={{ fontWeight: 700 }}>
                    {user.name}
                  </h5>
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

                {user.teach?.length ? (
                  <div className="mt-3">
                    <div
                      className="mb-1"
                      style={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Can teach
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {user.teach.map((t, idx) => (
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
                    </div>
                  </div>
                ) : null}

                {user.learn?.length ? (
                  <div className="mt-3">
                    <div
                      className="mb-1"
                      style={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Wants to learn
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {user.learn.map((l, idx) => (
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
                    </div>
                  </div>
                ) : null}

                {user.skills?.length ? (
                  <div className="mt-3">
                    <div
                      className="mb-1"
                      style={{ opacity: 0.9, fontWeight: 600 }}
                    >
                      Skills
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {user.skills.map((s, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: "inline-block",
                            padding: ".25rem .6rem",
                            borderRadius: 9999,
                            fontSize: 13,
                            background: "rgba(255,255,255,0.1)",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.18)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="d-flex gap-2 mt-3">
                  {user._id || user.id ? (
                    <>
                      <Link
                        href={`/profiles/${user._id ?? user.id}`}
                        className="btn btn-sm"
                        style={{
                          borderColor: accent,
                          color: "#fff",
                          backgroundColor: "transparent",
                          borderWidth: 1,
                          borderStyle: "solid",
                        }}
                      >
                        Details
                      </Link>
                      <Link
                        href={`/profiles/${user._id ?? user.id}/edit`}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: accent,
                          borderColor: accent,
                          color: "#fff",
                        }}
                      >
                        Edit
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/users"
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                        color: "#fff",
                      }}
                    >
                      More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
