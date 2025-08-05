import type { GetServerSideProps, NextPage } from "next";

type Props = {
  username: string;
};

const UserProfile: NextPage<Props> = ({ username }) => {
  return (
    <div>
      <h1>Profil von {username}</h1>
      <p>Hier könnte eine Beschreibung von {username} stehen.</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };

  return {
    props: {
      username,
    },
  };
};

export default UserProfile;
