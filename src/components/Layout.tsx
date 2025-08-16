import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const ACCENT = "#5B21B6";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const nav = [
    { href: "/profile", label: "Über mich" },
    { href: "/users", label: "Users" },
    { href: "/community", label: "Community" },
    { href: "/settings", label: "Einstellungen" },
    { href: "/messsages", label: "Nachrichten" },
  ];

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="app">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-inner">StudyBuddy</div>
        </header>

        <div className="wrap">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="side-title">Navigation</div>
            <nav className="side-nav">
              {nav.map((item) => {
                const active =
                  router.pathname === item.href ||
                  router.pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} legacyBehavior>
                    <a className={`nav-item ${active ? "active" : ""}`}>
                      {item.label}
                    </a>
                  </Link>
                );
              })}
              <a href="#" className="nav-item muted">
                Ausloggen
              </a>
            </nav>
          </aside>

          {/* Main */}
          <main className="main">
            <div className="panel">{children}</div>
          </main>
        </div>

        <footer className="footer">
          © {new Date().getFullYear()} StudyBuddy
        </footer>
      </div>

      <style jsx>{`
        /* Фон приложения */
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: radial-gradient(
              800px 400px at 80% -10%,
              rgba(124, 58, 237, 0.22),
              transparent 60%
            ),
            radial-gradient(
              700px 400px at 10% 110%,
              rgba(91, 33, 182, 0.18),
              transparent 60%
            ),
            linear-gradient(135deg, #0f0a1f 0%, #1a103b 100%);
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          color: #fff;
          backdrop-filter: blur(8px);
          background: rgba(15, 10, 31, 0.35);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .topbar-inner {
          padding: 14px 20px;
          font-weight: 800;
          letter-spacing: 0.2px;
        }

        .wrap {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        /* Sidebar — шире и спокойнее */
        .sidebar {
          display: none;
        }
        @media (min-width: 992px) {
          .sidebar {
            display: block;
            width: 320px;
            padding: 24px 20px;
            color: #fff;
            backdrop-filter: blur(10px);
            background: rgba(15, 10, 31, 0.22);
            border-right: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
        .side-title {
          opacity: 0.85;
          font-weight: 600;
          margin-bottom: 16px;
        }

        /* ЕДИНЫЙ стиль для всех пунктов */
        .side-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          height: 48px; /* одинаковая высота */
          padding: 0 18px; /* крупная зона клика */
          border-radius: 12px;
          color: #fff;
          text-decoration: none;
          background: transparent;
          transition: background 0.16s ease, box-shadow 0.16s ease,
            opacity 0.16s ease;
          opacity: 0.95;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nav-item:hover {
          background: rgba(124, 58, 237, 0.22); /* явный hover у ВСЕХ */
          opacity: 1;
        }
        .nav-item.active {
          background: rgba(124, 58, 237, 0.3); /* спокойный active */
          box-shadow: inset 0 0 0 1px rgba(124, 58, 237, 0.45);
        }
        .nav-item.muted {
          color: rgba(255, 255, 255, 0.9);
        } /* Ausloggen тот же hover */

        .main {
          flex: 1;
          padding: 28px;
          min-width: 0;
          display: flex;
        }
        .panel {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          color: #fff;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 24px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
        }

        .footer {
          color: rgba(255, 255, 255, 0.65);
          text-align: center;
          padding: 10px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
          background: rgba(15, 10, 31, 0.22);
        }
      `}</style>

      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
        }
        body {
          margin: 0;
          background: #0f0a1f;
        }
        a {
          color: inherit;
          text-decoration: none;
        } /* без подчёркиваний везде */
      `}</style>
    </>
  );
}
