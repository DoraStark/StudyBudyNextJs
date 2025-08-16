import Head from "next/head";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";

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

export default function NewProfile() {
  const [form, setForm] = useState<FormState>({
    name: "",
    city: "",
    roles: "",
    teach: "",
    learn: "",
    skills: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          city: form.city,
          roles: toList(form.roles),
          teach: toList(form.teach),
          learn: toList(form.learn),
          skills: toList(form.skills),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const created = await res.json();
      router.push(`/profiles/${created.id ?? created._id}`);
    } catch (e: any) {
      setErr(e?.message || "Save failed");
      setSubmitting(false);
    }
  }

  const preview = {
    roles: toList(form.roles),
    teach: toList(form.teach),
    learn: toList(form.learn),
    skills: toList(form.skills),
  };

  return (
    <>
      <Head>
        <title>New Profile — StudyBuddy</title>
      </Head>

      <div className="d-flex justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h4 m-0" style={{ color: "#fff", fontWeight: 800 }}>
            New profile
          </h1>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
            Fill the basic info and interests
          </div>
        </div>

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
          ← Back to list
        </Link>
      </div>

      {err && (
        <p style={{ color: "crimson", marginBottom: 12 }}>Error: {err}</p>
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
              placeholder="Anna"
              className="form-control"
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
              placeholder="Berlin"
              className="form-control"
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
              Roles (comma-separated)
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
            href="/profiles"
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
