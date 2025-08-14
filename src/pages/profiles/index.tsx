import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => setProfiles(data.users || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Profiles</h1>
      <Link href="/profiles/new">➕ Add New Profile</Link>
      <ul>
        {profiles.map(user => (
          <li key={user._id}>
 <Link href={`/profiles/${user._id}`}>{user.name}</Link> – {user.city} {' '}
      <Link href={`/profiles/${user._id}/edit`}> Edit</Link>
           

          </li>
        ))}
      </ul>
    </div>
  );
}

