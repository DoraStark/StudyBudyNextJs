import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

type User = {
  id?: string;
  _id?: string;
  name: string;
  city: string;
  roles?: string[];
  teach?: string[];
  learn?: string[];
  skills?: string[];
  about?: string;
};

type FormState = {
  name: string;
  city: string;
  roles: string;
  teach: string;
  learn: string;
  skills: string;
};

const accent = "#5B21B6";
const toList = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
const fromList = (a?: string[]) => (Array.isArray(a) ? a.join(", ") : "");

export default function EditProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    city: "",
    roles: "",
    teach: "",
    learn: "",
    skills: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

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
      .then((u: User) => {
        setForm({
          name: u.name ?? "",
          city: u.city ?? "",
          roles: fromList(u.roles),
          teach: fromList(u.teach),
          learn: fromList(u.learn),
          skills: fromList(u.skills),
        });
      })
      .catch((e: any) => {
        if (e.name !== "AbortError") setError(String(e.message || e));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [router.isReady, id]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return;

    setSubmitting(true);
    setError(null);

    const payload = {
      name: form.name,
      city: form.city,
      roles: toList(form.roles),
      teach: toList(form.teach),
      learn: toList(form.learn),
      skills: toList(form.skills),
    };

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Save failed (HTTP ${res.status})`);
      await res.json().catch(() => null);
      router.push(`/profiles/${userId}`);
    } catch (e: any) {
      setSubmitting(false);
      setError(e?.message || "Error saving");
    }
  }

  if (loading) return <p>Loading…</p>;
  if (error === "not-found") return <p>Profile not found.</p>;

  const rolesPreview = toList(form.roles);
  const teachPreview = toList(form.teach);
  const learnPreview = toList(form.learn);
  const skillsPreview = toList(form.skills);

  return (
    <>
      <Head>
        <title>Edit Profile — StudyBuddy</title>
      </Head>

      <div className="d-flex justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h4 m-0" style={{ color: "#fff", fontWeight: 800 }}>
            Edit profile
          </h1>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
            Update info and interests
          </div>
        </div>

        <Link
          href={`/profiles/${Array.isArray(id) ? id[0] : id}`}
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
      </div>

      {error && error !== "not-found" && (
        <p style={{ color: "crimson", marginBottom: 12 }}>{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="shadow-sm"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          borderRadius: 12,
          padding: 16,
          color: "#fff",
          maxWidth: 860,
        }}
      >
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label" style={{ opacity: 0.9 }}>
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Anna"
              required
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label" style={{ opacity: 0.9 }}>
              City
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="form-control"
              placeholder="Berlin"
              required
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
              }}
            />
          </div>
        </div>

        <div className="row g-3 mt-1">
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label" style={{ opacity: 0.9 }}>
              Roles
            </label>
            <input
              name="roles"
              value={form.roles}
              onChange={handleChange}
              className="form-control"
              placeholder="QA, Tutor"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
              }}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label" style={{ opacity: 0.9 }}>
              Can teach
            </label>
            <input
              name="teach"
              value={form.teach}
              onChange={handleChange}
              className="form-control"
              placeholder="Java, SQL"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
              }}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label" style={{ opacity: 0.9 }}>
              Wants to learn
            </label>
            <input
              name="learn"
              value={form.learn}
              onChange={handleChange}
              className="form-control"
              placeholder="Docker, Cypress"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
              }}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label className="form-label" style={{ opacity: 0.9 }}>
              Skills
            </label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="form-control"
              placeholder="musik, mathe"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
              }}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn"
            style={{
              padding: ".6rem 1.1rem",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,.18)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.12), rgba(255,255,255,.06)),\
linear-gradient(90deg, rgba(91,33,182,1), rgba(124,58,237,1))",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "0 12px 32px rgba(91,33,182,.45)",
              opacity: submitting ? 0.85 : 1,
            }}
          >
            {submitting ? "Saving…" : "Save"}
          </button>

          <Link
            href={`/profiles/${Array.isArray(id) ? id[0] : id}`}
            className="btn"
            style={{
              padding: ".6rem 1.1rem",
              borderRadius: 9999,
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,.28)",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
