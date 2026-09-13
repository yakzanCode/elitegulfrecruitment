import { Link } from "react-router-dom";
import { jf } from "../lib/jobs";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function JobCard({ job }) {
  const { language, t, isArabic } = useLanguage();

  return (
    <div className="col">
      <Link
        to={job.url}
        className="d-block h-100 p-4 border border-line bg-white text-decoration-none card-hover"
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="eyebrow">{jf(job, "category", language) || t("common.vacancy")}</span>
          {job.featured && (
            <span className="badge bg-gold-tint text-gold-dark border border-gold">
              {t("common.featured")}
            </span>
          )}
        </div>
        <h3 className="mb-1" style={{ fontSize: "1.15rem", color: "var(--navy)" }}>
          {jf(job, "title", language)}
        </h3>
        <p className="text-muted-custom small mb-3">
          <i className="bi bi-geo-alt me-1"></i>
          {isArabic ? job.locationLabelAr : job.locationLabel}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold" style={{ color: "var(--gold-dark)" }}>
            {isArabic ? job.salaryLabelAr : job.salaryLabel}
          </span>
          <span className="small text-muted-custom">
            {job.vacancies ? `${job.vacancies} ${t("common.openings")}` : ""}
          </span>
        </div>
      </Link>
    </div>
  );
}
