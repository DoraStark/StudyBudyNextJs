export default function LoginPage() {
  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form>
        <input className="form-control mb-2" placeholder="Username" />
        <input className="form-control mb-2" placeholder="Password" type="password" />
        <button className="btn btn-sm btn-outline-primary">Login</button>
      </form>
    </div>
  );
}
