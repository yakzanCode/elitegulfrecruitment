import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="bg-white py-5">
      <div className="container text-center py-5">
        <p className="eyebrow mb-2">404</p>
        <h1 style={{ fontSize: "2rem" }}>Page not found</h1>
        <p className="text-muted-custom mx-auto mt-3" style={{ maxWidth: 480 }}>
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn btn-navy mt-3">
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
