import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import JobCard from "../components/JobCard.jsx";
import { getAllJobs, getFeaturedJobs } from "../lib/jobs";
import { gulfCountries, site } from "../lib/site";
import { quickMessage, whatsappLink } from "../lib/whatsapp";

const services = [
  {
    icon: "bi-people",
    title: "Bulk & Skilled Manpower",
    text: "Chefs, drivers, welders, electricians, housekeeping, retail and general labour supplied in the numbers your operation needs.",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Documentation & Visa Processing",
    text: "Contracts, medical examinations, police clearance, attestation and visa stamping handled end to end by our office.",
  },
  {
    icon: "bi-shield-check",
    title: "Screening & Trade Testing",
    text: "Every candidate is interviewed and, where the role requires it, trade tested before we present the profile to you.",
  },
  {
    icon: "bi-airplane",
    title: "Mobilisation & Travel",
    text: "Ticketing, pre-departure briefing and arrival coordination so your workers land ready to start.",
  },
];

const steps = [
  {
    number: "01",
    title: "You send your requirement",
    text: "Positions, quantity, salary range and target mobilisation date - by WhatsApp or through the employer form.",
  },
  {
    number: "02",
    title: "We source and screen",
    text: "We shortlist from our candidate pool in Morocco and international markets, then interview and trade test.",
  },
  {
    number: "03",
    title: "You select the candidates",
    text: "You receive profiles and test results, and confirm the workers you want to hire.",
  },
  {
    number: "04",
    title: "We handle deployment",
    text: "Contracts, medicals, visas, tickets and pre-departure briefing until the worker reports to your site.",
  },
];

export default function Home() {
  const featured = getFeaturedJobs(3);
  const totalJobs = getAllJobs().length;

  const stats = [
    { value: "6", label: "Gulf markets served" },
    { value: `${totalJobs}`, label: "Live vacancies" },
    { value: "20+", label: "Trades & job categories" },
    { value: "100%", label: "Legal contracts & visas" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="navy-panel">
        <div className="container py-5 py-lg-6">
          <div style={{ maxWidth: 720 }}>
            <p className="eyebrow eyebrow-light mb-3">
              {site.name} <span className="ar ms-2">نخبة الخليج</span>
            </p>
            <h1 className="display-5 fw-semibold text-white mb-3" style={{ lineHeight: 1.15 }}>
              Recruitment &amp; Manpower Solutions for the Gulf
            </h1>
            <div className="rule-gold mb-4"></div>
            <p className="text-white-50 fs-5 mb-4">
              Elite Gulf Recruitment connects Gulf companies with qualified, work-ready
              candidates from Morocco and international markets. From a single specialist to
              a full crew, we handle sourcing, screening, documentation and deployment.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/employers" className="btn btn-gold btn-lg px-4">
                Request Workers
              </Link>
              <Link to="/jobs" className="btn btn-outline-light-gold btn-lg px-4">
                View Jobs <i className="bi bi-arrow-right ms-1"></i>
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
            eyebrow="Where we place workers"
            title="Serving employers across the Gulf"
            description="We recruit for hospitality, construction, industrial, logistics, retail and facilities management companies throughout the GCC."
          />
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-6 g-0 border border-line mt-4">
            {gulfCountries.map((country) => (
              <div key={country.code} className="col text-center py-4 border border-line">
                <p className="fw-semibold text-navy mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  {country.name}
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
            eyebrow="For employers"
            title="A complete recruitment service"
            description="One agency for the whole process, from your first requirement to the day your workers arrive on site."
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
              See our employer services <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-5">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="From requirement to arrival"
            description="A clear, four-step process with one point of contact throughout."
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
                eyebrow="For job seekers"
                title="Current vacancies"
                description="Open positions with salary, accommodation, transport and insurance details. Apply in one click on WhatsApp."
              />
              <Link to="/jobs" className="btn btn-outline-navy flex-shrink-0">
                All jobs <i className="bi bi-arrow-right ms-1"></i>
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
                eyebrow="Hiring in the Gulf?"
                title="Tell us what you need and we will start sourcing today"
                description="Send your requirement on WhatsApp or through our employer form. We reply with candidate profiles, terms and a realistic mobilisation timeline."
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
                WhatsApp our team
              </a>
              <Link to="/employers" className="btn btn-gold px-4 py-3">
                <i className="bi bi-briefcase me-2"></i>
                Request Workers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
