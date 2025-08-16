import Head from "next/head";
import Link from "next/link";

export default function Register() {
  const accent = "#5B21B6";

  return (
    <>
      <Head>
        <title>Register — StudyBuddy</title>
        <meta name="description" content="Create your StudyBuddy account" />
      </Head>

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
            maxWidth: 480,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="card-body p-4">
            <h1 className="h4 mb-1" style={{ color: "#fff", fontWeight: 800 }}>
              Create your account
            </h1>
            <p className="mb-4" style={{ color: "rgba(255,255,255,.7)" }}>
              Join StudyBuddy to find partners and learn together.
            </p>

            <form className="vstack gap-3">
              <div>
                <label
                  className="form-label"
                  style={{ color: "rgba(255,255,255,.75)" }}
                >
                  Name
                </label>
                <input
                  className="form-control"
                  placeholder="Your name"
                  required
                />
              </div>

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

              <div>
                <label
                  className="form-label"
                  style={{ color: "rgba(255,255,255,.75)" }}
                >
                  Confirm password
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
                Create account
              </button>
            </form>

            <p className="mt-3" style={{ color: "rgba(255,255,255,.8)" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
