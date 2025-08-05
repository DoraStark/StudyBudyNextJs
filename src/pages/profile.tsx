// src/pages/profile.tsx
import type { GetServerSideProps, NextPage } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

type Props = {
  languages: string[];
  learn: string[];
  teach: string[];
  preferences: { title: string; text: string }[];
};

const Profile: NextPage<Props> = ({ languages, learn, teach, preferences }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Profil von Alex</h2>
      <a href="#" className="btn btn-sm btn-outline-primary ms-2">Edit</a>

      <h3>Sprachen</h3>
      <ul>{languages.map((lang, i) => <li key={i}>{lang}</li>)}</ul>

      <h3>Ich möchte lernen</h3>
      <ul>{learn.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3>Ich kann unterrichten</h3>
      <ul>{teach.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3>Präferenzen</h3>
      <ul>{preferences.map((p, i) => <li key={i}><strong>{p.title}</strong>: {p.text}</li>)}</ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectToDatabase();
  const user = await User.findOne({ username: "Alex" });

  if (!user) {
    return { notFound: true };
  }

return {
  props: {
    languages: JSON.parse(JSON.stringify(user.languages)),
    learn: JSON.parse(JSON.stringify(user.learn)),
    teach: JSON.parse(JSON.stringify(user.teach)),
    preferences: JSON.parse(JSON.stringify(user.preferences)),
  },
};
};

export default Profile;
