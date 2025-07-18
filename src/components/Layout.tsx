import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Study Buddy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      
      <header className="bg-dark text-white py-3 px-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h4 m-0">Study Buddy</h1>
          <form className="d-flex" style={{ maxWidth: "750px", width: "100%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Suche..."
            />
            <button className="btn btn-outline-primary" type="submit">
              Suchen
            </button>
          </form>
        </div>
      </header>
            

      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 sidebar bg-dark text-white p-3">
            <Link href="/profile" className="d-block text-white mb-2">Über mich</Link>
            <Link href="/community" className="d-block text-white mb-2">Community</Link>
            <Link href="/settings" className="d-block text-white mb-2">Einstellungen</Link>
            <Link href="#" className="d-block text-white mb-2">Ausloggen</Link>
          </nav>

          <main className="col-md-10 p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
