import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getJobBySlug, getRelatedJobs, jf } from "../lib/jobs";
import { buildApplicationMessage, openWhatsApp, whatsappLink } from "../lib/whatsapp";
import JobCard from "../components/JobCard.jsx";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

const DETAIL_ROWS = [
  ["experience", "experience"],
  ["workingHours", "workingHours"],
  ["accommodation", "accommodation"],
  ["transportation", "transportation"],
  ["medicalInsurance", "medicalInsurance"],
  ["contractDuration", "contractDuration"],
];

export default function JobDetail() {
  const { slug } = useParams();
  const job = getJobBySlug(slug);
  const { t, language, isArabic } = useLanguage();

  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    nationality: "",
    age: "",
    experience: "",
    location: "",
    message: "",
  });

  if (!job) {
    return <Navigate to="/jobs" replace />;
  }

  const related = getRelatedJobs(job, 3);

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = buildApplicationMessage(job, values);
    openWhatsApp(whatsappLink(message));
  }

  const description = jf(job, "description", language);
  const benefits = jf(job, "benefits", language);
  const requirements = jf(job, "requirements", language);

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">{t("common.home")}</Link>
            <span className="mx-2">/</span>
            <Link to="/jobs" className="text-white-50 text-decoration-none">{t("jobDetail.breadcrumbJobs")}</Link>
            <span className="mx-2">/</span>
            <span>{jf(job, "title", language)}</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">{jf(job, "category", language) || t("common.vacancy")}</p>
          <h1 className="text-white display-6 mb-2">{jf(job, "title", language)}</h1>
          <p className="text-white-50 mb-0">
            <i className="bi bi-geo-alt me-2"></i>
            {isArabic ? job.locationLabelAr : job.locationLabel}
          </p>
          <p className="fs-4 fw-semibold text-gold mt-2">{isArabic ? job.salaryLabelAr : job.salaryLabel}</p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              {description?.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: "1.4rem" }}>{t("jobDetail.aboutRole")}</h2>
                  <div className="rule-gold my-3"></div>
                  {description.map((p, i) => (
                    <p key={i} className="text-muted-custom">{p}</p>
                  ))}
                </div>
              )}

              <div className="mb-5">
                <h2 style={{ fontSize: "1.4rem" }}>{t("jobDetail.jobDetailsTitle")}</h2>
                <div className="rule-gold my-3"></div>
                <div className="row row-cols-1 row-cols-sm-2 g-0 border border-line">
                  {DETAIL_ROWS.filter(([key]) => job[key]).map(([key, labelKey]) => (
                    <div className="col border border-line p-3" key={key}>
                      <p className="small text-uppercase text-muted-custom mb-1" style={{ letterSpacing: "0.06em", fontSize: "0.72rem" }}>
                        {t(`jobDetail.detailLabels.${labelKey}`)}
                      </p>
                      <p className="mb-0 fw-medium text-navy">{jf(job, key, language)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {benefits?.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: "1.4rem" }}>{t("jobDetail.benefitsTitle")}</h2>
                  <div className="rule-gold my-3"></div>
                  <ul className="list-unstyled">
                    {benefits.map((b, i) => (
                      <li key={i} className="d-flex gap-2 mb-2">
                        <i className="bi bi-check2 text-gold-dark mt-1"></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirements?.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: "1.4rem" }}>{t("jobDetail.requirementsTitle")}</h2>
                  <div className="rule-gold my-3"></div>
                  <ul className="list-unstyled">
                    {requirements.map((r, i) => (
                      <li key={i} className="d-flex gap-2 mb-2">
                        <i className="bi bi-check2 text-gold-dark mt-1"></i>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Apply form */}
            <div className="col-lg-5">
              <div className="border border-line bg-sand p-4 p-lg-5" style={{ position: "sticky", top: 96 }}>
                <h2 style={{ fontSize: "1.3rem" }}>{t("jobDetail.applyTitle")}</h2>
                <p className="text-muted-custom small mb-4">{t("jobDetail.applySubtitle")}</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.fullName")} *</label>
                    <input required name="fullName" className="form-control" value={values.fullName} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.whatsappNumber")} *</label>
                    <input required name="phone" className="form-control" value={values.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.email")}</label>
                    <input type="email" name="email" className="form-control" value={values.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.nationality")} *</label>
                    <input required name="nationality" className="form-control" value={values.nationality} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.age")}</label>
                    <input name="age" className="form-control" value={values.age} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.experience")} *</label>
                    <input required name="experience" className="form-control" value={values.experience} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">{t("jobDetail.form.location")}</label>
                    <input name="location" className="form-control" value={values.location} onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label className="field-label">{t("jobDetail.form.message")}</label>
                    <textarea name="message" rows="3" className="form-control" value={values.message} onChange={handleChange}></textarea>
                  </div>
                  <button type="submit" className="btn btn-whatsapp w-100 py-3">
                    <i className="bi bi-whatsapp me-2"></i>
                    {t("jobDetail.applyBtn")}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-5 pt-5 border-top border-line">
              <h2 style={{ fontSize: "1.4rem" }}>{t("jobDetail.relatedTitle")}</h2>
              <div className="rule-gold my-3"></div>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                {related.map((r) => (
                  <JobCard key={r.slug} job={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
