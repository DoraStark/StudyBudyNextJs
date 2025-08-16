import Head from "next/head";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

type User = {
  name: string;
  city: string;
  teach: string[];
  learn: string[];
};

type Props = { users: User[] };

const accent = "#5B21B6";

const Community: NextPage<Props> = ({ users }) => {
  return (
    <>
      <Head>
        <title>Community — StudyBuddy</title>
        <meta
          name="description"
          content="Discover people and their skills/interests"
        />
      </Head>

      {/* Заголовок */}
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h1 className="h4 m-0" style={{ color: "#fff", fontWeight: 800 }}>
            Community
          </h1>
          <div style={{ color: "rgba(255,255,255,.65)", fontSize: 14 }}>
            Wer kann dir helfen — und was möchten sie lernen?
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,.75)" }}>
          {users.length} member(s)
        </div>
      </div>

      {/* Сетка карточек */}
      <div className="row g-3">
        {users.map((user, i) => (
          <div className="col-12 col-md-6 col-lg-4" key={i}>
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
                <div className="mb-1" style={{ opacity: 0.9, fontWeight: 600 }}>
                  Kann unterrichten
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

              {/* Learn */}
              <div className="mt-3">
                <div className="mb-1" style={{ opacity: 0.9, fontWeight: 600 }}>
                  Möchte lernen
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

              {/* Действия */}
              <div className="d-flex gap-2 mt-3">
                <Link
                  href="/users"
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
                  href="/users"
                  className="btn btn-sm"
                  style={{
                    backgroundColor: accent,
                    borderColor: accent,
                    color: "#fff",
                  }}
                >
                  Nachricht
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/community`);
  const data = await res.json();

  return { props: { users: data.users } };
};

export default Community;
