import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>StudyBuddy — Learn smarter</title>
        <meta
          name="description"
          content="Find study partners, share skills, stay motivated."
        />
      </Head>

      <section
        style={{
          minHeight: "72vh",
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          background:
            "radial-gradient(800px 400px at 80% -10%, rgba(124,58,237,.35), transparent 60%)," +
            "radial-gradient(700px 400px at 10% 110%, rgba(91,33,182,.25), transparent 60%)," +
            "linear-gradient(135deg, #0f0a1f 0%, #1a103b 100%)",
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <span
            style={{
              display: "inline-block",
              padding: ".35rem .6rem",
              borderRadius: 9999,
              background: "linear-gradient(90deg, #5B21B6, #7C3AED)",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            NEW
          </span>

          <h1 style={{ fontWeight: 800, marginBottom: 12 }}>
            StudyBuddy{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #5B21B6, #7C3AED)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              helps you grow
            </span>
          </h1>

          <p className="lead" style={{ margin: "0 auto 24px", maxWidth: 760 }}>
            Find people with the skills you need, learn together, and keep your
            motivation high.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              href="/register"
              className="btn btn-lg shadow-sm"
              style={{
                backgroundColor: "#5B21B6",
                borderColor: "#5B21B6",
                color: "#fff",
              }}
            >
              Create account
            </Link>
            <Link href="/login" className="btn btn-outline-light btn-lg">
              I already have an account
            </Link>
          </div>

          <div style={{ marginTop: 24, opacity: 0.7, fontSize: 14 }}>
            No spam. You own your data.
          </div>
        </div>
      </section>

      {/* Features (на белом фоне) */}
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🎯 Skill-matching</h5>
                <p className="card-text">
                  Search by skills (Mathe, Musik) and connect instantly.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🤝 Community</h5>
                <p className="card-text">
                  Join a supportive group of learners who keep you accountable.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🔔 Simple messaging</h5>
                <p className="card-text">
                  Message people right from their profile — no friction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/users"
            style={{
              color: "#5B21B6",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Browse the community →
          </Link>
        </div>
      </section>

      <footer className="text-center text-muted py-4">
        © {new Date().getFullYear()} StudyBuddy
      </footer>
    </>
  );
}
