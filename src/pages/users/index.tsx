import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

type User = {
  id?: string;
  name: string;
  city: string;
  teach?: string[]; // что может преподавать
  learn?: string[]; // что хочет изучать
  skills?: string; // старое поле, на всякий случай
};

const accent = "#5B21B6";

export default function UsersPage() {
  const router = useRouter();
  const initialView =
    (router.query.view as string) === "table" ? "table" : "cards";
  const [view, setView] = useState<"cards" | "table">(initialView);
  const [query, setQuery] = useState<string>((router.query.q as string) || "");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Грузим данные из /api/community (там уже teach/learn)
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/community");
      const data = await res.json();
      // если нет id — проставим индекс как id (временно)
      const withIds: User[] = (data.users || []).map(
        (u: User, idx: number) => ({
          id: u.id ?? String(idx + 1),
          ...u,
        })
      );
      setUsers(withIds);
      setLoading(false);
    })();
  }, []);

  // нормализуем teach/learn, если пришло только skills (обратная совместимость)
  function normalize(u: User) {
    const teach = u.teach ?? [];
    const learn = u.learn ?? [];
    if (!teach.length && !learn.length && u.skills) {
      const parts = u.skills.split(",").map((s) => s.trim());
      // примитивно: всё кидаем в teach
      return { ...u, teach: parts, learn: [] as string[] };
    }
    return u;
  }

  // фильтр по имени/городу/teach/learn
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = users.map(normalize);
    if (!q) return list;
    return list.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        (u.teach || []).some((s) => s.toLowerCase().includes(q)) ||
        (u.learn || []).some((s) => s.toLowerCase().includes(q))
    );
  }, [users, query]);

  // для синхронизации URL (необязательно)
  useEffect(() => {
    const params = new URLSearchParams();
    if (view === "table") params.set("view", "table");
    if (query) params.set("q", query);
    const url = params.toString() ? `/users?${params}` : "/users";
    // не перезагружаем
    window.history.replaceState(null, "", url);
  }, [view, query]);

  return (
    <>
      <Head>
        <title>Users — StudyBuddy</title>
        <meta
          name="description"
          content="Browse users by what they can teach and want to learn"
        />
      </Head>

      {/* фон как на login/register */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 16px",
          background:
            "radial-gradient(800px 400px at 80% -10%, rgba(124,58,237,.35), transparent 60%)," +
            "radial-gradient(700px 400px at 10% 110%, rgba(91,33,182,.25), transparent 60%)," +
            "linear-gradient(135deg, #0f0a1f 0%, #1a103b 100%)",
        }}
      >
        <div
          className="card shadow-lg w-100"
          style={{
            maxWidth: 1200,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="card-body p-4">
            {/* Заголовок + переключатель вида */}
            <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
              <div>
                <h1
                  className="h4 m-0"
                  style={{ color: "#fff", fontWeight: 800 }}
                >
                  Users
                </h1>
                <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
                  Filter by what people <strong>can teach</strong> and{" "}
                  <strong>want to learn</strong>
                </div>
              </div>

              <div className="btn-group" role="group" aria-label="view">
                <button
                  className={`btn btn-sm ${
                    view === "cards" ? "" : "btn-outline-light"
                  }`}
                  style={
                    view === "cards"
                      ? { backgroundColor: accent, color: "#fff" }
                      : {}
                  }
                  onClick={() => setView("cards")}
                >
                  Cards
                </button>
                <button
                  className={`btn btn-sm ${
                    view === "table" ? "" : "btn-outline-light"
                  }`}
                  style={
                    view === "table"
                      ? { backgroundColor: accent, color: "#fff" }
                      : {}
                  }
                  onClick={() => setView("table")}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Поиск */}
            <form
              className="row g-2 mb-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="col-md-9">
                <input
                  className="form-control"
                  placeholder="Type a skill or name…  (musik / mathe / anna)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ backgroundColor: "rgba(255,255,255,.9)" }}
                />
              </div>
              <div className="col-md-3 d-flex gap-2">
                <button
                  className="btn btn-lg w-50"
                  type="submit"
                  style={{
                    backgroundColor: accent,
                    borderColor: accent,
                    color: "#fff",
                  }}
                >
                  Search
                </button>
                <button
                  className="btn btn-lg btn-outline-light w-50"
                  type="button"
                  onClick={() => setQuery("")}
                >
                  Reset
                </button>
              </div>
            </form>

            {/* VIEW: Cards */}
            {view === "cards" && (
              <div className="row g-3">
                {filtered.map((user) => (
                  <div
                    className="col-12 col-md-6 col-lg-4"
                    key={user.id ?? user.name}
                  >
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

                      {/* Teach */}
                      <div className="mt-3">
                        <div
                          className="mb-1"
                          style={{ opacity: 0.9, fontWeight: 600 }}
                        >
                          Kann unterrichten
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {(normalize(user).teach || []).map((t, idx) => (
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

                      {/* Learn */}
                      <div className="mt-3">
                        <div
                          className="mb-1"
                          style={{ opacity: 0.9, fontWeight: 600 }}
                        >
                          Möchte lernen
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {(normalize(user).learn || []).map((l, idx) => (
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

                      <div className="d-flex gap-2 mt-3">
                        <a
                          className="btn btn-sm"
                          href={`/users/${user.id ?? ""}`}
                          style={{
                            borderColor: accent,
                            color: "#fff",
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderStyle: "solid",
                          }}
                        >
                          Profil
                        </a>
                        <a
                          className="btn btn-sm"
                          href={`/users/${user.id ?? ""}`}
                          style={{
                            backgroundColor: accent,
                            borderColor: accent,
                            color: "#fff",
                          }}
                        >
                          Nachricht
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {!loading && filtered.length === 0 && (
                  <div
                    className="text-center py-5"
                    style={{ color: "rgba(255,255,255,.75)" }}
                  >
                    No results
                  </div>
                )}
              </div>
            )}

            {/* VIEW: Table */}
            {view === "table" && (
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>City</th>
                      <th>Kann unterrichten</th>
                      <th>Möchte lernen</th>
                      <th style={{ width: 120 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => {
                      const n = normalize(u);
                      return (
                        <tr key={u.id ?? u.name}>
                          <td>{u.name}</td>
                          <td>{u.city}</td>
                          <td>{(n.teach || []).join(", ")}</td>
                          <td>{(n.learn || []).join(", ")}</td>
                          <td>
                            <a
                              className="btn btn-sm"
                              href={`/users/${u.id ?? ""}`}
                              style={{
                                borderColor: accent,
                                color: "#fff",
                                backgroundColor: "transparent",
                                borderWidth: 1,
                                borderStyle: "solid",
                              }}
                            >
                              Profil
                            </a>
                          </td>
                        </tr>
                      );
                    })}

                    {!loading && filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center"
                          style={{ color: "rgba(255,255,255,.75)" }}
                        >
                          No results
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
