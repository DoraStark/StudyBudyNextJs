import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProfileDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/profile/${id}`)
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>City: {profile.city}</p>
      <p>Roles: {profile.roles.join(', ')}</p>
      <p>Skills: {profile.skills.join(', ')}</p>
      <Link href={`/profiles/${id}/edit`}>Edit</Link>
    </div>
  );
}

