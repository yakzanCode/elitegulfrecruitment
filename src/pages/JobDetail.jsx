import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getJobBySlug, getRelatedJobs } from "../lib/jobs";
import { buildApplicationMessage, openWhatsApp, whatsappLink } from "../lib/whatsapp";
import JobCard from "../components/JobCard.jsx";

const DETAIL_ROWS = [
  ["experience", "Experience Required"],
  ["workingHours", "Working Hours"],
  ["accommodation", "Accommodation"],
  ["transportation", "Transportation"],
  ["medicalInsurance", "Medical Insurance"],
  ["contractDuration", "Contract Duration"],
];

export default function JobDetail() {
  const { slug } = useParams();
  const job = getJobBySlug(slug);

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

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/jobs" className="text-white-50 text-decoration-none">Jobs</Link>
            <span className="mx-2">/</span>
            <span>{job.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">{job.category || "Vacancy"}</p>
          <h1 className="text-white display-6 mb-2">{job.title}</h1>
          {job.titleAr && <p className="ar text-gold mb-3">{job.titleAr}</p>}
          <p className="text-white-50 mb-0">
            <i className="bi bi-geo-alt me-2"></i>
            {job.locationLabel}
          </p>
          <p className="fs-4 fw-semibold text-gold mt-2">{job.salaryLabel}</p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              {job.description?.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: "1.4rem" }}>About the role</h2>
                  <div className="rule-gold my-3"></div>
                  {job.description.map((p, i) => (
                    <p key={i} className="text-muted-custom">{p}</p>
                  ))}
                </div>
              )}

              <div className="mb-5">
                <h2 style={{ fontSize: "1.4rem" }}>Job details</h2>
                <div className="rule-gold my-3"></div>
                <div className="row row-cols-1 row-cols-sm-2 g-0 border border-line">
                  {DETAIL_ROWS.filter(([key]) => job[key]).map(([key, label]) => (
                    <div className="col border border-line p-3" key={key}>
                      <p className="small text-uppercase text-muted-custom mb-1" style={{ letterSpacing: "0.06em", fontSize: "0.72rem" }}>
                        {label}
                      </p>
                      <p className="mb-0 fw-medium text-navy">{job[key]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {job.benefits?.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: "1.4rem" }}>Benefits</h2>
                  <div className="rule-gold my-3"></div>
                  <ul className="list-unstyled">
                    {job.benefits.map((b, i) => (
                      <li key={i} className="d-flex gap-2 mb-2">
                        <i className="bi bi-check2 text-gold-dark mt-1"></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements?.length > 0 && (
                <div className="mb-5">
                  <h2 style={{ fontSize: "1.4rem" }}>Requirements</h2>
                  <div className="rule-gold my-3"></div>
                  <ul className="list-unstyled">
                    {job.requirements.map((r, i) => (
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
                <h2 style={{ fontSize: "1.3rem" }}>Apply for this job</h2>
                <p className="text-muted-custom small mb-4">
                  Fill this in and WhatsApp opens with your application already written.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="field-label">Full Name *</label>
                    <input required name="fullName" className="form-control" value={values.fullName} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">WhatsApp Number *</label>
                    <input required name="phone" className="form-control" value={values.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">Email</label>
                    <input type="email" name="email" className="form-control" value={values.email} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">Nationality *</label>
                    <input required name="nationality" className="form-control" value={values.nationality} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">Age</label>
                    <input name="age" className="form-control" value={values.age} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">Relevant Experience *</label>
                    <input required name="experience" className="form-control" value={values.experience} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="field-label">Current Location</label>
                    <input name="location" className="form-control" value={values.location} onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label className="field-label">Message</label>
                    <textarea name="message" rows="3" className="form-control" value={values.message} onChange={handleChange}></textarea>
                  </div>
                  <button type="submit" className="btn btn-whatsapp w-100 py-3">
                    <i className="bi bi-whatsapp me-2"></i>
                    Apply on WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-5 pt-5 border-top border-line">
              <h2 style={{ fontSize: "1.4rem" }}>Related vacancies</h2>
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
