import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewProfile() {
  const [form, setForm] = useState({ name: '', city: '', roles: '', skills: '' });
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        city: form.city,
        roles: form.roles.split(',').map(r => r.trim()),
        skills: form.skills.split(',').map(s => s.trim())
      })
    });
    router.push('/profiles');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Profile</h1>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="roles" placeholder="Roles (comma separated)" onChange={handleChange} />
      <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} 
/>
      <button type="submit">Save</button>
    </form>
  );
}

