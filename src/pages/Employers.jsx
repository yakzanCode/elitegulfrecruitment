import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import { gulfCountries, site } from "../lib/site";
import { buildEmployerMessage, openWhatsApp, quickMessage, whatsappLink } from "../lib/whatsapp";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function Employers() {
  const { t, isArabic } = useLanguage();
  const advantages = t("employers.advantages");
  const sectors = t("employers.sectors");
  const commitments = t("employers.commitments");

  const [values, setValues] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    country: "",
    position: "",
    workers: "",
    message: "",
  });

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = buildEmployerMessage(values);
    openWhatsApp(whatsappLink(message));
  }

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">{t("common.home")}</Link>
            <span className="mx-2">/</span>
            <span>{t("employers.breadcrumb")}</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">{t("employers.eyebrow")}</p>
          <h1 className="text-white display-6 mb-3" style={{ maxWidth: 760 }}>{t("employers.heroTitle")}</h1>
          <div className="rule-gold mb-4"></div>
          <p className="text-white-50" style={{ maxWidth: 640 }}>{t("employers.heroDescription")}</p>
          <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
            <a href="#request" className="btn btn-gold px-4 py-3">{t("employers.requestWorkersBtn")}</a>
            <a
              href={whatsappLink(quickMessage("manpower supply for our company"))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light-gold px-4 py-3"
            >
              <i className="bi bi-whatsapp me-2"></i>
              {t("employers.whatsappDeskBtn")}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <SectionHeading
            eyebrow={t("employers.whyEyebrow")}
            title={t("employers.whyTitle")}
            description={t("employers.whyDescription")}
          />
          <div className="row row-cols-1 row-cols-sm-2 g-4 mt-3">
            {advantages.map((a) => (
              <div className="col" key={a.title}>
                <div className="d-flex gap-3 h-100 p-4 border border-line bg-white card-hover">
                  <span className="icon-box flex-shrink-0"><i className={`bi ${a.icon}`}></i></span>
                  <div>
                    <h3 style={{ fontSize: "1.1rem" }}>{a.title}</h3>
                    <p className="text-muted-custom small mb-0">{a.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-5">
        <div className="container">
          <SectionHeading
            eyebrow={t("employers.sectorsEyebrow")}
            title={t("employers.sectorsTitle")}
            description={t("employers.sectorsDescription")}
          />
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-0 border border-line mt-4">
            {sectors.map((s) => (
              <div className="col border border-line p-4 bg-white" key={s.title}>
                <h3 style={{ fontSize: "1.05rem" }}>{s.title}</h3>
                <div className="rule-gold my-2"></div>
                <p className="text-muted-custom small mb-0">{s.roles}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <SectionHeading eyebrow={t("employers.commitmentEyebrow")} title={t("employers.commitmentTitle")} />
              <ul className="list-unstyled mt-4">
                {commitments.map((c) => (
                  <li key={c} className="d-flex gap-2 mb-3">
                    <i className="bi bi-check2 text-gold-dark mt-1"></i>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="border border-line bg-sand p-4 p-lg-5">
                <h3 style={{ fontSize: "1.2rem" }}>{t("employers.marketsTitle")}</h3>
                <div className="rule-gold my-3"></div>
                <ul className="list-unstyled">
                  {gulfCountries.map((c) => (
                    <li key={c.code} className="d-flex justify-content-between py-2 border-bottom border-line">
                      <span className="fw-medium text-navy">{isArabic ? c.nameAr : c.name}</span>
                      <span className="ar text-muted-custom small">{c.nameAr}</span>
                    </li>
                  ))}
                </ul>
                <p className="small text-muted-custom mt-3 mb-0">
                  {t("employers.headOffice")} {site.address.full}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="request" className="border-top border-line bg-sand py-5">
        <div className="container">
          <div className="mx-auto" style={{ maxWidth: 720 }}>
            <SectionHeading
              align="center"
              eyebrow={t("employers.requestSectionEyebrow")}
              title={t("employers.requestSectionTitle")}
              description={t("employers.requestSectionDescription")}
            />
            <form onSubmit={handleSubmit} className="mt-4 bg-white border border-line p-4 p-lg-5">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="field-label">{t("employers.form.companyName")} *</label>
                  <input required name="companyName" className="form-control" value={values.companyName} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">{t("employers.form.contactPerson")} *</label>
                  <input required name="contactPerson" className="form-control" value={values.contactPerson} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">{t("employers.form.whatsappNumber")} *</label>
                  <input required name="phone" className="form-control" value={values.phone} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">{t("employers.form.email")}</label>
                  <input type="email" name="email" className="form-control" value={values.email} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">{t("employers.form.country")} *</label>
                  <select required name="country" className="form-select" value={values.country} onChange={handleChange}>
                    <option value="">{t("employers.form.selectCountry")}</option>
                    {gulfCountries.map((c) => (
                      <option key={c.code} value={c.name}>{isArabic ? c.nameAr : c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="field-label">{t("employers.form.numberOfWorkers")}</label>
                  <input name="workers" className="form-control" value={values.workers} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="field-label">{t("employers.form.positionNeeded")} *</label>
                  <input required name="position" className="form-control" value={values.position} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="field-label">{t("employers.form.message")}</label>
                  <textarea name="message" rows="4" className="form-control" value={values.message} onChange={handleChange}></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-whatsapp w-100 py-3 mt-4">
                <i className="bi bi-whatsapp me-2"></i>
                {t("employers.sendRequestBtn")}
              </button>
            </form>

            <div className="mt-4 border border-line bg-white p-4 text-center">
              <p className="text-muted-custom mb-3">{t("employers.preferToTalk")}</p>
              <a
                href={whatsappLink(quickMessage("manpower supply for our company"))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <i className="bi bi-whatsapp me-2"></i>
                {t("jobsPage.whatsappBtn")} {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
