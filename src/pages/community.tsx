import type { GetServerSideProps, NextPage } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

type Props = {
  users: {
    username: string;
    teach: string[];
    location?: string;
  }[];
};

const Community: NextPage<Props> = ({ users }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Community</h2>
      <div className="row">
        {users.map((user, i) => (
          <div className="col-md-4" key={i}>
            <div className="p-3 m-2 bg-white shadow-sm border rounded">
              <h5>{user.username}</h5>
              <p>{user.teach.join(", ")}</p>
              <p><strong>Ort:</strong> {user.location || "Unbekannt"}</p>
              <a href={`/profile/${user.username}`} className="btn btn-sm btn-outline-primary">Details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await connectToDatabase();
  const users = await User.find({}, "username teach location");
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default Community;
