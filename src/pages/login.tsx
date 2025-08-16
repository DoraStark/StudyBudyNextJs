import Head from "next/head";
import Link from "next/link";

export default function Login() {
  const accent = "#5B21B6";

  return (
    <>
      <Head>
        <title>Login — StudyBuddy</title>
        <meta name="description" content="Sign in to your StudyBuddy account" />
      </Head>

      {/* Тот же градиентный фон, что и на лендинге */}
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
          className="card shadow-lg"
          style={{
            width: "100%",
            maxWidth: 440,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="card-body p-4">
            <h1 className="h4 mb-1" style={{ color: "#fff", fontWeight: 800 }}>
              Welcome back
            </h1>
            <p className="mb-4" style={{ color: "rgba(255,255,255,.7)" }}>
              Sign in to your StudyBuddy account
            </p>

            <form className="vstack gap-3">
              <div>
                <label
                  className="form-label"
                  style={{ color: "rgba(255,255,255,.75)" }}
                >
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label
                  className="form-label"
                  style={{ color: "rgba(255,255,255,.75)" }}
                >
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                className="btn btn-lg w-100"
                style={{
                  backgroundColor: accent,
                  borderColor: accent,
                  color: "#fff",
                }}
              >
                Login
              </button>
            </form>

            <div className="d-flex justify-content-between mt-3">
              <a
                href="#"
                style={{
                  color: "rgba(255,255,255,.8)",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
              <Link
                href="/register"
                style={{
                  color: "rgba(255,255,255,.9)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
