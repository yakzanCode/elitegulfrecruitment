import { useMemo, useState } from "react";
import { getAllJobs, getCategories, getCountries } from "../lib/jobs";
import { site } from "../lib/site";
import { quickMessage, whatsappLink } from "../lib/whatsapp";
import JobCard from "../components/JobCard.jsx";

export default function Jobs() {
  const jobs = getAllJobs();
  const countries = getCountries();
  const categories = getCategories();

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.city.toLowerCase().includes(query.toLowerCase());
      const matchesCountry = !country || job.country === country;
      const matchesCategory = !category || job.category === category;
      return matchesQuery && matchesCountry && matchesCategory;
    });
  }, [jobs, query, country, category]);

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <a href="/" className="text-white-50 text-decoration-none">Home</a>
            <span className="mx-2">/</span>
            <span className="text-white-75">Jobs</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">Current openings</p>
          <h1 className="text-white display-6 mb-2">Available Jobs</h1>
          <p className="ar text-gold mb-3">الوظائف المتاحة</p>
          <p className="text-white-50" style={{ maxWidth: 640 }}>
            Every position below is a live vacancy with a legal contract, sponsored visa and
            the salary and benefits shown on the job page. Open a job to read the full details
            and apply directly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-3 mb-4 p-3 border border-line bg-sand">
            <div className="col-md-5">
              <label className="field-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Job title or city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="field-label">Country</label>
              <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">All countries</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="field-label">Category</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {filtered.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          ) : (
            <div className="border border-line bg-sand p-5 text-center">
              <h2 style={{ fontSize: "1.4rem" }}>No jobs match your search</h2>
              <p className="text-muted-custom mt-2 mb-0">
                Try clearing a filter, or message us directly with what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-top border-line bg-sand py-5">
        <div className="container text-center">
          <h2 style={{ fontSize: "1.5rem" }}>Cannot find the right job?</h2>
          <p className="text-muted-custom mx-auto mt-3" style={{ maxWidth: 640 }}>
            Send us your trade, years of experience and preferred country on WhatsApp. We add new
            Gulf vacancies every week and will contact you when a matching position opens.
          </p>
          <a
            href={whatsappLink(quickMessage("job opportunities in the Gulf"))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-3"
          >
            <i className="bi bi-whatsapp me-2"></i>
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
