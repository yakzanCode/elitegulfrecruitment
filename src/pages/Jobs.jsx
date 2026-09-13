import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs, getCategoryOptions, getCountryOptions, jf } from "../lib/jobs";
import { site } from "../lib/site";
import { quickMessage, whatsappLink } from "../lib/whatsapp";
import JobCard from "../components/JobCard.jsx";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function Jobs() {
  const { t, language } = useLanguage();
  const jobs = getAllJobs();
  const countryOptions = getCountryOptions(language);
  const categoryOptions = getCategoryOptions(language);

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const title = jf(job, "title", language);
      const city = jf(job, "city", language);
      const matchesQuery =
        !query ||
        title.toLowerCase().includes(query.toLowerCase()) ||
        city.toLowerCase().includes(query.toLowerCase());
      const matchesCountry = !country || job.country === country;
      const matchesCategory = !category || job.category === category;
      return matchesQuery && matchesCountry && matchesCategory;
    });
  }, [jobs, query, country, category, language]);

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">{t("common.home")}</Link>
            <span className="mx-2">/</span>
            <span className="text-white-75">{t("jobsPage.breadcrumb")}</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">{t("jobsPage.eyebrow")}</p>
          <h1 className="text-white display-6 mb-2">{t("jobsPage.title")}</h1>
          <p className="text-white-50" style={{ maxWidth: 640 }}>{t("jobsPage.description")}</p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-3 mb-4 p-3 border border-line bg-sand">
            <div className="col-md-5">
              <label className="field-label">{t("jobsPage.searchLabel")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t("jobsPage.searchPlaceholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="field-label">{t("jobsPage.countryLabel")}</label>
              <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">{t("jobsPage.allCountries")}</option>
                {countryOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="field-label">{t("jobsPage.categoryLabel")}</label>
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">{t("jobsPage.allCategories")}</option>
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
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
              <h2 style={{ fontSize: "1.4rem" }}>{t("jobsPage.noResultsTitle")}</h2>
              <p className="text-muted-custom mt-2 mb-0">{t("jobsPage.noResultsText")}</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-top border-line bg-sand py-5">
        <div className="container text-center">
          <h2 style={{ fontSize: "1.5rem" }}>{t("jobsPage.cantFindTitle")}</h2>
          <p className="text-muted-custom mx-auto mt-3" style={{ maxWidth: 640 }}>{t("jobsPage.cantFindText")}</p>
          <a
            href={whatsappLink(quickMessage("job opportunities in the Gulf"))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-3"
          >
            <i className="bi bi-whatsapp me-2"></i>
            {t("jobsPage.whatsappBtn")} {site.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
