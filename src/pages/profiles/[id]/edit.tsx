import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ name: '', city: '', roles: '', skills: '' });

  useEffect(() => {
    if (id) {
      fetch(`/api/profile/${id}`)
        .then(res => res.json())
        .then(data => setForm({
          name: data.name,
          city: data.city,
          roles: data.roles.join(', '),
          skills: data.skills.join(', ')
        }))
        .catch(err => console.error(err));
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`/api/profile/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        city: form.city,
        roles: form.roles.split(',').map(r => r.trim()),
        skills: form.skills.split(',').map(s => s.trim())
      })
    });
    router.push(`/profiles/${id}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Profile</h1>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="city" value={form.city} onChange={handleChange} />
      <input name="roles" value={form.roles} onChange={handleChange} />
      <input name="skills" value={form.skills} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}

