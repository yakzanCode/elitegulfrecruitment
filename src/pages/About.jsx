import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import { gulfCountries, site } from "../lib/site";
import { quickMessage, whatsappLink } from "../lib/whatsapp";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function About() {
  const { t, isArabic } = useLanguage();
  const paragraphs = t("about.paragraphs");
  const facts = t("about.facts");
  const values = t("about.values");

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">{t("common.home")}</Link>
            <span className="mx-2">/</span>
            <span>{t("about.breadcrumb")}</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">{t("about.eyebrow")}</p>
          <h1 className="text-white display-6 mb-2">{site.name}</h1>
          <p className="ar text-gold mb-3">{site.nameAr}</p>
          <div className="rule-gold mb-4"></div>
          <p className="text-white-50" style={{ maxWidth: 640 }}>{t("about.heroDescription")}</p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <SectionHeading eyebrow={t("about.whoWeAreEyebrow")} title={t("about.whoWeAreTitle")} />
              <div className="mt-4">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/employers" className="btn btn-navy">
                  {t("about.forEmployersBtn")} <i className="bi bi-arrow-right ms-1"></i>
                </Link>
                <Link to="/jobs" className="btn btn-outline-navy">
                  {t("about.browseJobsBtn")}
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="border border-line bg-sand p-4 p-lg-5">
                <h2 style={{ fontSize: "1.3rem" }}>{t("about.atAGlanceTitle")}</h2>
                <div className="rule-gold my-3"></div>
                <ul className="list-unstyled">
                  {facts.map((fact) => (
                    <li key={fact} className="d-flex gap-2 mb-3">
                      <i className="bi bi-check2 text-gold-dark mt-1"></i>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
                <hr className="border-line" />
                <p className="d-flex gap-2 text-muted-custom small">
                  <i className="bi bi-geo-alt mt-1"></i>
                  {site.address.full}
                </p>
                <p className="d-flex gap-2 text-muted-custom small mb-0">
                  <i className="bi bi-envelope mt-1"></i>
                  <a href={`mailto:${site.email}`} className="text-navy">{site.email}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-5">
        <div className="container">
          <SectionHeading
            eyebrow={t("about.principlesEyebrow")}
            title={t("about.principlesTitle")}
            description={t("about.principlesDescription")}
          />
          <div className="row row-cols-1 row-cols-sm-2 g-0 border border-line mt-4">
            {values.map((value, index) => (
              <div key={value.title} className="col border border-line p-4 bg-white">
                <span className="fw-semibold text-gold" style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.1em" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2" style={{ fontSize: "1.1rem" }}>{value.title}</h3>
                <p className="text-muted-custom small mb-0">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <SectionHeading align="center" eyebrow={t("about.coverageEyebrow")} title={t("about.coverageTitle")} />
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

      <section className="navy-panel py-5">
        <div className="container text-center">
          <h2 className="text-white" style={{ fontSize: "1.7rem" }}>{t("about.ctaTitle")}</h2>
          <p className="text-white-50 mx-auto mt-3" style={{ maxWidth: 640 }}>{t("about.ctaDescription")}</p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            <a href={whatsappLink(quickMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp px-4 py-3">
              <i className="bi bi-whatsapp me-2"></i>
              {t("common.whatsappOurTeam")} {site.phoneDisplay}
            </a>
            <Link to="/contact" className="btn btn-outline-light-gold px-4 py-3">
              {t("about.contactPageBtn")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
