import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import JobCard from "../components/JobCard.jsx";
import { getAllJobs, getFeaturedJobs } from "../lib/jobs";
import { gulfCountries, site } from "../lib/site";
import { quickMessage, whatsappLink } from "../lib/whatsapp";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function Home() {
  const { t, isArabic } = useLanguage();
  const featured = getFeaturedJobs(3);
  const totalJobs = getAllJobs().length;

  const services = t("home.services");
  const steps = t("home.steps");

  const stats = [
    { value: "6", label: t("home.stats.marketsServed") },
    { value: `${totalJobs}`, label: t("home.stats.liveVacancies") },
    { value: "20+", label: t("home.stats.tradeCategories") },
    { value: "100%", label: t("home.stats.legalContracts") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="navy-panel">
        <div className="container py-5 py-lg-6">
          <div style={{ maxWidth: 720 }}>
            <p className="eyebrow eyebrow-light mb-3">
              {t("home.eyebrow")} {!isArabic && <span className="ar ms-2">{site.nameAr}</span>}
            </p>
            <h1 className="display-5 fw-semibold text-white mb-3" style={{ lineHeight: 1.15 }}>
              {t("home.heroTitle")}
            </h1>
            <div className="rule-gold mb-4"></div>
            <p className="text-white-50 fs-5 mb-4">{t("home.heroParagraph")}</p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/employers" className="btn btn-gold btn-lg px-4">
                {t("home.requestWorkersBtn")}
              </Link>
              <Link to="/jobs" className="btn btn-outline-light-gold btn-lg px-4">
                {t("home.viewJobsBtn")} <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>

          <div className="row mt-5 pt-4 border-top border-white-50" style={{ borderColor: "rgba(255,255,255,.15) !important" }}>
            {stats.map((stat) => (
              <div className="col-6 col-lg-3 mb-3" key={stat.label}>
                <div className="stat-value fs-2">{stat.value}</div>
                <div className="text-white-50 small text-uppercase" style={{ letterSpacing: "0.1em" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="bg-white border-bottom border-line py-5">
        <div className="container">
          <SectionHeading
            eyebrow={t("home.marketsEyebrow")}
            title={t("home.marketsTitle")}
            description={t("home.marketsDescription")}
          />
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-6 g-0 border border-line mt-4">
            {gulfCountries.map((country) => (
              <div key={country.code} className="col text-center py-4 border border-line">
                <p className="fw-semibold text-navy mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  {isArabic ? country.nameAr : country.name}
                </p>
                <p className="ar text-muted-custom small mb-0">{country.nameAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand py-5">
        <div className="container">
          <SectionHeading
            eyebrow={t("home.servicesEyebrow")}
            title={t("home.servicesTitle")}
            description={t("home.servicesDescription")}
          />
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mt-3">
            {services.map((service) => (
              <div className="col" key={service.title}>
                <div className="h-100 p-4 border border-line bg-white card-hover">
                  <span className="icon-box mb-3">
                    <i className={`bi ${service.icon}`}></i>
                  </span>
                  <h3 style={{ fontSize: "1.15rem" }}>{service.title}</h3>
                  <p className="text-muted-custom small mb-0">{service.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/employers" className="btn btn-navy">
              {t("home.seeEmployerServicesBtn")} <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-5">
        <div className="container">
          <SectionHeading
            eyebrow={t("home.processEyebrow")}
            title={t("home.processTitle")}
            description={t("home.processDescription")}
          />
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-0 border border-line mt-4">
            {steps.map((step) => (
              <div className="col border border-line p-4" key={step.number}>
                <span className="fw-semibold text-gold" style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.1em" }}>
                  {step.number}
                </span>
                <h3 className="mt-2" style={{ fontSize: "1.1rem" }}>{step.title}</h3>
                <p className="text-muted-custom small mb-0">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      {featured.length > 0 && (
        <section className="bg-sand border-top border-bottom border-line py-5">
          <div className="container">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
              <SectionHeading
                eyebrow={t("home.featuredEyebrow")}
                title={t("home.featuredTitle")}
                description={t("home.featuredDescription")}
              />
              <Link to="/jobs" className="btn btn-outline-navy flex-shrink-0">
                {t("common.allJobs")} <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {featured.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Employer CTA */}
      <section className="navy-panel py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <SectionHeading
                light
                eyebrow={t("home.ctaEyebrow")}
                title={t("home.ctaTitle")}
                description={t("home.ctaDescription")}
              />
            </div>
            <div className="col-lg-5 d-flex flex-column flex-sm-row gap-3 justify-content-lg-end">
              <a
                href={whatsappLink(quickMessage("hiring workers for our company"))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp px-4 py-3"
              >
                <i className="bi bi-whatsapp me-2"></i>
                {t("common.whatsappOurTeam")}
              </a>
              <Link to="/employers" className="btn btn-gold px-4 py-3">
                <i className="bi bi-briefcase me-2"></i>
                {t("common.requestWorkers")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
