
import type { GetServerSideProps, NextPage } from "next";

type Props = {
  languages: string[];
  learn: string[];
  teach: string[];
  preferences: { title: string; text: string }[];
};

const Profile: NextPage<Props> = ({ languages, learn, teach, preferences }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mein Profil</h2>

      <section className="mb-4">
        <h3>
          Sprachen{" "}
          <a href="#" className="btn btn-outline-primary">
            Edit
          </a>
        </h3>
        {languages.map((lang, i) => (
          <p key={i}>{lang}</p>
        ))}
      </section>

      <section className="mb-4">
        <h3>
          Themen{" "}
          <a href="#" className="btn btn-outline-primary">
            Edit
          </a>
        </h3>
        <p>
          <strong>Ich möchte lernen:</strong>
        </p>
        <ul>
          {learn.map((item, i) => (
            <li key={`learn-${i}`}>{item}</li>
          ))}
        </ul>

        <p>
          <strong>Ich kann unterrichten:</strong>
        </p>
        <ul>
          {teach.map((item, i) => (
            <li key={`teach-${i}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>
          Lernpräferenzen{" "}
          <a href="#" className="btn btn-outline-primary">
            Edit
          </a>
        </h3>
        <div className="row g-3">
          {preferences.map((pref, i) => (
            <div className="col-md-4" key={i}>
              <div className="p-3 bg-light border rounded">
                <strong>{pref.title}</strong>
                <br />
                {pref.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button className="btn btn-outline-primary">Profil speichern</button>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/profile");
  const data = await res.json();

  return {
    props: {
      ...data,
    },
  };
};

export default Profile;
