import { Link } from "react-router-dom";
import { gulfCountries, mainNav, site } from "../lib/site";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t, isArabic } = useLanguage();

  return (
    <footer className="navy-panel pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center"
                style={{ width: 40, height: 40, border: "1px solid var(--gold)" }}
              >
                <span className="text-gold fw-bold" style={{ fontFamily: "var(--font-serif)" }}>
                  EG
                </span>
              </span>
              <span className="fs-5 fw-bold text-white" style={{ fontFamily: "var(--font-serif)" }}>
                {site.name}
              </span>
            </div>
            <p className="text-white-50 small mb-1">{site.tagline}</p>
            <p className="ar text-gold small">{site.nameAr}</p>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="text-white mb-3">{t("footer.navigate")}</h6>
            <ul className="list-unstyled">
              {mainNav.map((item) => (
                <li key={item.href} className="mb-2">
                  <Link to={item.href} className="text-white-50 small text-decoration-none">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="text-white mb-3">{t("footer.marketsWeServe")}</h6>
            <ul className="list-unstyled">
              {gulfCountries.map((c) => (
                <li key={c.code} className="text-white-50 small mb-1">
                  {isArabic ? c.nameAr : c.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="text-white mb-3">{t("footer.contact")}</h6>
            <p className="text-white-50 small mb-2">{site.address.full}</p>
            <p className="text-white-50 small mb-2">
              <a href={`mailto:${site.email}`} className="text-white-50 text-decoration-none">
                {site.email}
              </a>
            </p>
            <p className="text-white-50 small mb-0">
              <a href={`tel:${site.phoneDial}`} className="text-white-50 text-decoration-none">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <hr className="border-white-50 my-4" style={{ opacity: 0.15 }} />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <p className="text-white-50 small mb-0">
            &copy; {year} {site.legalName}. {t("footer.rights")}
          </p>
          <p className="text-white-50 small mb-0">{t("footer.noFees")}</p>
        </div>
      </div>
    </footer>
  );
}
