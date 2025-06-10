
import type { GetServerSideProps, NextPage } from "next";

type Props = {
  users: {
    name: string; skills: string; city: string;
}[];
};

const Community: NextPage<Props> = ({ users }) => {
  return (
    <div className="flex">
      {users.map((user, i) => (
        <div className="flex-md-4" key={i}>
          <div className="p-4 m-2 bg-white shadow-sm border rounded">
            <h5>{user.name}</h5>
            <p>{user.skills}</p>
            <p>{user.city}</p>

            <a href="#" className="btn btn-outline-primary">Details</a>
            <a href="#" className="btn btn-outline-primary ms-2">Nachricht</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/community");
  const data = await res.json();
  return { props: { users: data.users } };
};

export default Community;
