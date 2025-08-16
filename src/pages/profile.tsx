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
      <h2 className="mb-4 text-white">Znatok M</h2>

      <section className="mb-4">
        <h3 className="text-white">
          Sprachen{" "}
          <a href="#" className="btn btn-outline-light ms-2">
            Edit
          </a>
        </h3>
        <div className="text-white-50">
          {languages.map((lang, i) => (
            <p key={i} className="mb-1">
              {lang}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="text-white">
          Themen{" "}
          <a href="#" className="btn btn-outline-light ms-2">
            Edit
          </a>
        </h3>

        <p className="text-white mb-1">
          <strong>Ich möchte lernen:</strong>
        </p>
        <ul className="text-white-50">
          {learn.map((item, i) => (
            <li key={`learn-${i}`}>{item}</li>
          ))}
        </ul>

        <p className="text-white mb-1">
          <strong>Ich kann unterrichten:</strong>
        </p>
        <ul className="text-white-50">
          {teach.map((item, i) => (
            <li key={`teach-${i}`}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-white">
          Lernpräferenzen{" "}
          <a href="#" className="btn btn-outline-light ms-2">
            Edit
          </a>
        </h3>

        <div className="row g-3">
          {preferences?.map((pref, i) => (
            <div className="col-md-4" key={i}>
              {/* ВАЖНО: делаем тёмный текст на светлом фоне */}
              <div className="p-3 bg-white text-dark border rounded shadow-sm">
                <strong>{pref.title}</strong>
                <br />
                <span>{pref.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button className="btn btn-outline-light ms-2">
            Profil speichern
          </button>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const host = context.req.headers.host;
  const protocol = host?.startsWith("localhost") ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/profile`);
  const data = await res.json();

  return { props: { ...data } };
};

export default Profile;
