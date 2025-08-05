import type { GetServerSideProps, NextPage } from "next";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/User";

type Props = {
  users: {
    name: string;
    skills: string;
    location: string;
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
            <p>{user.location}</p>

            <a href="#" className="btn btn-outline-primary">Details</a>
            <a href="#" className="btn btn-outline-primary ms-2">Nachricht</a>
          </div>
        </div>
      ))}
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
