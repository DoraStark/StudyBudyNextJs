export default function HomePage() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Study Buddy</h1>
      <a href="/login" className="btn btn-outline-primary m-2">Login</a>
      <a href="/register" className="btn btn-outline-success m-2">Register</a>
    </div>
  );
}
