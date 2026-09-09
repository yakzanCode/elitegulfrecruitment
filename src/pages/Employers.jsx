import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import { gulfCountries, site } from "../lib/site";
import { buildEmployerMessage, openWhatsApp, quickMessage, whatsappLink } from "../lib/whatsapp";

const sectors = [
  { title: "Hospitality & Catering", roles: "Chefs, cooks, bakers, waiters, baristas, housekeeping, stewards" },
  { title: "Construction & Industrial", roles: "Welders, electricians, plumbers, masons, steel fixers, technicians, helpers" },
  { title: "Transport & Logistics", roles: "Heavy and light drivers, forklift operators, warehouse staff, delivery riders" },
  { title: "Facilities & Cleaning", roles: "Cleaners, supervisors, gardeners, security guards, maintenance staff" },
  { title: "Retail & Sales", roles: "Sales assistants, cashiers, merchandisers, store supervisors" },
  { title: "Domestic & Support", roles: "Domestic workers, nannies, kitchen helpers, general labour" },
];

const advantages = [
  { icon: "bi-people", title: "A ready candidate pool", text: "An active database of Moroccan and international candidates who are documented, available and prepared to travel." },
  { icon: "bi-shield-check", title: "Screened and trade tested", text: "Interviews, reference checks and practical trade tests before any profile reaches your desk." },
  { icon: "bi-file-earmark-text", title: "Full legal compliance", text: "Employment contracts, medical examinations, police clearance, attestation and visa stamping processed by our office." },
  { icon: "bi-airplane", title: "Fast mobilisation", text: "Ticketing, pre-departure briefing and arrival coordination so workers reach your site on schedule." },
];

const commitments = [
  "No placement fees charged to candidates, in line with international ethical recruitment standards",
  "Replacement guarantee within the agreed probation period",
  "Candidate profiles delivered with photos, documents and trade test results",
  "One dedicated coordinator for your account, reachable on WhatsApp",
  "Transparent pricing agreed in writing before we start sourcing",
  "Regular progress updates until every worker has arrived",
];

export default function Employers() {
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
            <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
            <span className="mx-2">/</span>
            <span>For Employers</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">For Gulf employers</p>
          <h1 className="text-white display-6 mb-3" style={{ maxWidth: 760 }}>
            Recruitment and manpower supply for companies across the Gulf
          </h1>
          <div className="rule-gold mb-4"></div>
          <p className="text-white-50" style={{ maxWidth: 640 }}>
            Elite Gulf Recruitment is a Morocco-based recruitment agency working with employers
            in Saudi Arabia, the UAE, Qatar, Kuwait, Bahrain and Oman. We source, screen and
            deploy skilled and general workers, and we handle the documentation from the first
            interview to the day your staff report for duty.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
            <a href="#request" className="btn btn-gold px-4 py-3">Request Workers</a>
            <a
              href={whatsappLink(quickMessage("manpower supply for our company"))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light-gold px-4 py-3"
            >
              <i className="bi bi-whatsapp me-2"></i>
              WhatsApp our desk
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <SectionHeading
            eyebrow="Why work with us"
            title="A recruitment partner, not just a supplier"
            description="We take responsibility for the whole hiring chain so your operation is not left waiting for staff."
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
            eyebrow="Categories we supply"
            title="Trades and positions"
            description="If a role is not listed here, send us the job description - in most cases we can source it."
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
              <SectionHeading eyebrow="Our commitment" title="What you can expect from us" />
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
                <h3 style={{ fontSize: "1.2rem" }}>Markets we serve</h3>
                <div className="rule-gold my-3"></div>
                <ul className="list-unstyled">
                  {gulfCountries.map((c) => (
                    <li key={c.code} className="d-flex justify-content-between py-2 border-bottom border-line">
                      <span className="fw-medium text-navy">{c.name}</span>
                      <span className="ar text-muted-custom small">{c.nameAr}</span>
                    </li>
                  ))}
                </ul>
                <p className="small text-muted-custom mt-3 mb-0">
                  Head office: {site.address.full}
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
              eyebrow="Start hiring"
              title="Send us your manpower requirement"
              description="Complete the form and WhatsApp opens with your request already written. Our recruitment desk normally replies the same working day."
            />
            <form onSubmit={handleSubmit} className="mt-4 bg-white border border-line p-4 p-lg-5">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="field-label">Company Name *</label>
                  <input required name="companyName" className="form-control" value={values.companyName} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">Contact Person *</label>
                  <input required name="contactPerson" className="form-control" value={values.contactPerson} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">WhatsApp Number *</label>
                  <input required name="phone" className="form-control" value={values.phone} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">Email</label>
                  <input type="email" name="email" className="form-control" value={values.email} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="field-label">Country *</label>
                  <select required name="country" className="form-select" value={values.country} onChange={handleChange}>
                    <option value="">Select country</option>
                    {gulfCountries.map((c) => (
                      <option key={c.code} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="field-label">Number of Workers</label>
                  <input name="workers" className="form-control" value={values.workers} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="field-label">Position Needed *</label>
                  <input required name="position" className="form-control" value={values.position} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="field-label">Message</label>
                  <textarea name="message" rows="4" className="form-control" value={values.message} onChange={handleChange}></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-whatsapp w-100 py-3 mt-4">
                <i className="bi bi-whatsapp me-2"></i>
                Send request on WhatsApp
              </button>
            </form>

            <div className="mt-4 border border-line bg-white p-4 text-center">
              <p className="text-muted-custom mb-3">
                Prefer to talk first? Message our recruitment desk directly.
              </p>
              <a
                href={whatsappLink(quickMessage("manpower supply for our company"))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <i className="bi bi-whatsapp me-2"></i>
                WhatsApp {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
