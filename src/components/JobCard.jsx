import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="col">
      <Link
        to={job.url}
        className="d-block h-100 p-4 border border-line bg-white text-decoration-none card-hover"
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="eyebrow">{job.category || "Vacancy"}</span>
          {job.featured && <span className="badge bg-gold-tint text-gold-dark border border-gold">Featured</span>}
        </div>
        <h3 className="mb-1" style={{ fontSize: "1.15rem", color: "var(--navy)" }}>
          {job.title}
        </h3>
        <p className="text-muted-custom small mb-3">
          <i className="bi bi-geo-alt me-1"></i>
          {job.locationLabel}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold" style={{ color: "var(--gold-dark)" }}>
            {job.salaryLabel}
          </span>
          <span className="small text-muted-custom">
            {job.vacancies ? `${job.vacancies} openings` : ""}
          </span>
        </div>
      </Link>
    </div>
  );
}
