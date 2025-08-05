import { useState } from "react";

export default function EditProfile() {
  const [username, setUsername] = useState("Alex");
  const [languages, setLanguages] = useState("🇩🇪 Deutsch, 🇬🇧 Englisch");
  const [learn, setLearn] = useState("🌍 Geografie");
  const [teach, setTeach] = useState("🎵 Musik, ➕ Mathe");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/edit_profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        languages: languages.split(",").map((s) => s.trim()),
        learn: learn.split(",").map((s) => s.trim()),
        teach: teach.split(",").map((s) => s.trim()),
      }),
    });

    if (res.ok) alert("Profile updated!");
    else alert("Update failed.");
  };

  return (
    <div className="container mt-4">
      <h2>Profil bearbeiten</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Benutzername"
        />
        <input
          className="form-control mb-2"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          placeholder="Sprachen (comma separated)"
        />
        <input
          className="form-control mb-2"
          value={learn}
          onChange={(e) => setLearn(e.target.value)}
          placeholder="Ich möchte lernen (comma separated)"
        />
        <input
          className="form-control mb-2"
          value={teach}
          onChange={(e) => setTeach(e.target.value)}
          placeholder="Ich kann unterrichten (comma separated)"
        />
        <button className="btn btn-sm btn-outline-primary">Speichern</button>
      </form>
    </div>
  );
}
