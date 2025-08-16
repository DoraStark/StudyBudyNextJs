import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type User = {
  id?: string;
  _id?: string;
  name: string;
  city: string;
  skills?: string[];
  teach?: string[];
  learn?: string[];
  about?: string;
};

const accent = "#5B21B6";

export default function ProfileDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return;

    const controller = new AbortController();
    setLoading(true);
    setErr(null);

    fetch(`/api/users/${encodeURIComponent(userId)}`, {
      signal: controller.signal,
    })
      .then(async (r) => {
        if (!r.ok) {
          if (r.status === 404) throw new Error("not-found");
          throw new Error(`HTTP ${r.status}`);
        }
        return r.json();
      })
      .then((data: User) => setUser(data))
      .catch((e: any) => {
        if (e.name !== "AbortError") setErr(String(e.message || e));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [router.isReady, id]);

  if (loading) return <p>Loading…</p>;
  if (err === "not-found") return <p>Profile not found.</p>;
  if (err) return <p>Error: {err}</p>;
  if (!user) return <p>No data.</p>;

  return (
    <>
      <Head>
        <title>{user.name} — Profile</title>
      </Head>

      <div className="d-flex justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h4 m-0" style={{ color: "#fff", fontWeight: 800 }}>
            {user.name}
          </h1>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
            {user.city}
          </div>
        </div>

        <div className="d-flex gap-2">
          <Link
            href="/profiles"
            className="btn btn-sm"
            style={{
              borderColor: "rgba(255,255,255,.35)",
              color: "#fff",
              backgroundColor: "transparent",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            ← Back
          </Link>
          {(user._id || user.id) && (
            <Link
              href={`/profiles/${user._id ?? user.id}/edit`}
              className="btn btn-sm"
              style={{
                backgroundColor: "#5B21B6",
                borderColor: "#5B21B6",
                color: "#fff",
              }}
            >
              Edit
            </Link>
          )}
        </div>
      </div>

      <div
        className="shadow-sm"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          borderRadius: 12,
          padding: 16,
          color: "#fff",
        }}
      >
        {user.about && (
          <p style={{ opacity: 0.9, marginBottom: 12 }}>{user.about}</p>
        )}

        {user.teach?.length ? (
          <section style={{ marginBottom: 12 }}>
            <div style={{ opacity: 0.9, fontWeight: 600, marginBottom: 6 }}>
              Can teach
            </div>
            <div className="d-flex flex-wrap gap-2">
              {user.teach.map((t, i) => (
                <span
                  key={`teach-${i}`}
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
          </section>
        ) : null}

        {user.learn?.length ? (
          <section style={{ marginBottom: 12 }}>
            <div style={{ opacity: 0.9, fontWeight: 600, marginBottom: 6 }}>
              Wants to learn
            </div>
            <div className="d-flex flex-wrap gap-2">
              {user.learn.map((l, i) => (
                <span
                  key={`learn-${i}`}
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
          </section>
        ) : null}

        {user.skills?.length ? (
          <section>
            <div style={{ opacity: 0.9, fontWeight: 600, marginBottom: 6 }}>
              Skills
            </div>
            <div className="d-flex flex-wrap gap-2">
              {user.skills.map((s, i) => (
                <span
                  key={`skills-${i}`}
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
          </section>
        ) : null}
      </div>
    </>
  );
}
