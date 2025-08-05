export default function RegisterPage() {
  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form>
        <input className="form-control mb-2" placeholder="Username" />
        <input className="form-control mb-2" placeholder="Password" type="password" />
        <button className="btn btn-sm btn-outline-primary">Register</button>
      </form>
    </div>
  );
}
