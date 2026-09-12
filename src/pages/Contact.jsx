import { useState } from "react";
import { Link } from "react-router-dom";
import { site } from "../lib/site";
import { buildContactMessage, openWhatsApp, quickMessage, whatsappLink } from "../lib/whatsapp";

export default function Contact() {
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const channels = [
    { icon: "bi-whatsapp", label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink(quickMessage()), external: true, note: "Fastest way to reach us" },
    { icon: "bi-telephone", label: "Phone", value: site.phoneDisplay, href: `tel:${site.phoneDial}`, external: false, note: site.officeHours },
    { icon: "bi-envelope", label: "Email", value: site.email, href: `mailto:${site.email}`, external: false, note: "For documents and formal enquiries" },
  ];

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = buildContactMessage(values);
    openWhatsApp(whatsappLink(message));
  }

  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">Get in touch</p>
          <h1 className="text-white display-6 mb-3">
            {site.name} <span className="text-gold">&ndash;</span> <span className="ar text-gold">{site.nameAr}</span>
          </h1>
          <div className="rule-gold mb-4"></div>
          <p className="text-white-50" style={{ maxWidth: 640 }}>
            Candidates and employers are welcome to contact us at any time. WhatsApp is the
            fastest channel - our recruitment desk normally replies the same working day.
          </p>
          <a href={whatsappLink(quickMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp px-4 py-3 mt-4">
            <i className="bi bi-whatsapp me-2"></i>
            Contact us on WhatsApp
          </a>
        </div>
      </section>

      <section className="bg-white border-bottom border-line py-4">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-3 g-0 border border-line">
            {channels.map((c) => (
              <div className="col border border-line" key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="d-block p-4 text-decoration-none card-hover"
                >
                  <span className="icon-box mb-3"><i className={`bi ${c.icon}`}></i></span>
                  <p className="text-uppercase small fw-semibold text-muted-custom mb-1" style={{ letterSpacing: "0.1em", fontSize: "0.72rem" }}>
                    {c.label}
                  </p>
                  <p className="fw-semibold text-navy mb-1">{c.value}</p>
                  <p className="small text-muted-custom mb-0">{c.note}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <form onSubmit={handleSubmit} className="bg-white border border-line p-4 p-lg-5">
                <h2 style={{ fontSize: "1.3rem" }}>Send us a message</h2>
                <div className="rule-gold my-3"></div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="field-label">Full Name *</label>
                    <input required name="fullName" className="form-control" value={values.fullName} onChange={handleChange} />
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
                    <label className="field-label">Subject</label>
                    <input name="subject" className="form-control" value={values.subject} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="field-label">Message *</label>
                    <textarea required name="message" rows="4" className="form-control" value={values.message} onChange={handleChange}></textarea>
                  </div>
                </div>
                <button type="submit" className="btn btn-whatsapp w-100 py-3 mt-4">
                  <i className="bi bi-whatsapp me-2"></i>
                  Send on WhatsApp
                </button>
              </form>
            </div>

            <div className="col-lg-5">
              <div className="border border-line bg-white p-4 p-lg-5">
                <h2 style={{ fontSize: "1.3rem" }}>Our office</h2>
                <div className="rule-gold my-3"></div>
                <ul className="list-unstyled">
                  <li className="d-flex gap-3 mb-4">
                    <i className="bi bi-geo-alt text-gold-dark mt-1"></i>
                    <div>
                      <p className="text-uppercase small fw-semibold text-muted-custom mb-1" style={{ letterSpacing: "0.08em", fontSize: "0.72rem" }}>Address</p>
                      <p className="mb-0 text-navy">
                        {site.address.line1}<br />
                        {site.address.city}, {site.address.region}<br />
                        {site.address.country}
                      </p>
                    </div>
                  </li>
                  <li className="d-flex gap-3 mb-4">
                    <i className="bi bi-whatsapp text-gold-dark mt-1"></i>
                    <div>
                      <p className="text-uppercase small fw-semibold text-muted-custom mb-1" style={{ letterSpacing: "0.08em", fontSize: "0.72rem" }}>WhatsApp</p>
                      <a href={whatsappLink(quickMessage())} target="_blank" rel="noopener noreferrer" className="text-navy fw-semibold">
                        {site.phoneDisplay}
                      </a>
                    </div>
                  </li>
                  <li className="d-flex gap-3 mb-4">
                    <i className="bi bi-envelope text-gold-dark mt-1"></i>
                    <div>
                      <p className="text-uppercase small fw-semibold text-muted-custom mb-1" style={{ letterSpacing: "0.08em", fontSize: "0.72rem" }}>Email</p>
                      <a href={`mailto:${site.email}`} className="text-navy fw-semibold">{site.email}</a>
                    </div>
                  </li>
                  <li className="d-flex gap-3">
                    <i className="bi bi-clock text-gold-dark mt-1"></i>
                    <div>
                      <p className="text-uppercase small fw-semibold text-muted-custom mb-1" style={{ letterSpacing: "0.08em", fontSize: "0.72rem" }}>Office hours</p>
                      <p className="mb-0 text-navy">{site.officeHours}</p>
                    </div>
                  </li>
                </ul>
                <hr className="border-line" />
                <p className="small text-muted-custom mb-0">
                  Looking for a specific vacancy? Browse our{" "}
                  <Link to="/jobs" className="fw-semibold text-gold-dark">current job openings</Link>{" "}
                  and apply directly from the job page.
                </p>
              </div>

              <div className="mt-3 bg-white p-4" style={{ borderLeft: "2px solid var(--gold)" }}>
                <h3 style={{ fontSize: "1.05rem" }}>A note for candidates</h3>
                <p className="text-muted-custom small mb-0 mt-2">
                  {site.name} never charges candidates any fee for job placement, visa
                  processing or travel. Report anyone asking for payment in our name.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
