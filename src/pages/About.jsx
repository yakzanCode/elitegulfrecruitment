import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import { gulfCountries, site } from "../lib/site";
import { quickMessage, whatsappLink } from "../lib/whatsapp";

const values = [
  {
    title: "Ethical recruitment",
    text: "We never charge candidates for placement, visas or travel. Employers carry the recruitment cost, exactly as international standards require.",
  },
  {
    title: "Honest job information",
    text: "Salary, working hours, accommodation and transport are published as the employer confirmed them. No surprises after arrival.",
  },
  {
    title: "Proper documentation",
    text: "Every deployment goes out on a legal employment contract with a sponsored work visa and valid medical clearance.",
  },
  {
    title: "One point of contact",
    text: "Employers and candidates deal with the same coordinator from first contact to arrival, reachable on WhatsApp.",
  },
];

const facts = [
  "Head office in Nouaceur, Casablanca, Morocco",
  "Candidate sourcing across Morocco and international markets",
  "Employers served throughout the six GCC countries",
  "Skilled trades, hospitality, logistics, retail and general labour",
  "In-house documentation, medical and visa processing",
  "Communication in Arabic, French and English",
];

export default function About() {
  return (
    <>
      <section className="navy-panel">
        <div className="container py-5">
          <nav className="small text-white-50 mb-3">
            <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
            <span className="mx-2">/</span>
            <span>About</span>
          </nav>
          <p className="eyebrow eyebrow-light mb-2">About the company</p>
          <h1 className="text-white display-6 mb-2">{site.name}</h1>
          <p className="ar text-gold mb-3">{site.nameAr}</p>
          <div className="rule-gold mb-4"></div>
          <p className="text-white-50" style={{ maxWidth: 640 }}>
            A recruitment and manpower agency based in Casablanca, Morocco, working with
            employers across the Gulf. We connect Gulf companies with candidates who are
            screened, documented and ready to work.
          </p>
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <SectionHeading eyebrow="Who we are" title="Recruitment built on trust" />
              <div className="mt-4">
                <p>
                  Elite Gulf Recruitment was created to solve a problem on both sides of the
                  Gulf labour market. Employers struggle to find reliable workers who arrive on
                  time, with the right skills and complete papers. Candidates struggle to find
                  honest agencies that publish real salaries and never ask them for money.
                </p>
                <p>
                  We work between the two. Gulf companies send us their requirement, we source
                  and screen candidates from Morocco and international markets, and we manage
                  the entire process through to arrival: interviews, trade tests, contracts,
                  medical examinations, police clearance, visa stamping, tickets and
                  pre-departure briefing.
                </p>
                <p>
                  Our office is in Nouaceur, Casablanca, close to Mohammed V International
                  Airport, which keeps mobilisation fast and documentation straightforward. Our
                  team communicates in Arabic, French and English, so nothing is lost between
                  the employer, the agency and the worker.
                </p>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                <Link to="/employers" className="btn btn-navy">
                  For employers <i className="bi bi-arrow-right ms-1"></i>
                </Link>
                <Link to="/jobs" className="btn btn-outline-navy">
                  Browse jobs
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="border border-line bg-sand p-4 p-lg-5">
                <h2 style={{ fontSize: "1.3rem" }}>At a glance</h2>
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
            eyebrow="How we work"
            title="Our principles"
            description="The rules we apply to every placement, for the employer and for the candidate."
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
          <SectionHeading align="center" eyebrow="Coverage" title="Employers across the six GCC countries" />
          <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-6 g-0 border border-line mt-4">
            {gulfCountries.map((country) => (
              <div key={country.code} className="col text-center py-4 border border-line">
                <p className="fw-semibold text-navy mb-1" style={{ fontFamily: "var(--font-serif)" }}>{country.name}</p>
                <p className="ar text-muted-custom small mb-0">{country.nameAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-panel py-5">
        <div className="container text-center">
          <h2 className="text-white" style={{ fontSize: "1.7rem" }}>Let us know how we can help</h2>
          <p className="text-white-50 mx-auto mt-3" style={{ maxWidth: 640 }}>
            Whether you are hiring for your company or looking for work in the Gulf, our team is
            one message away.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            <a href={whatsappLink(quickMessage())} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp px-4 py-3">
              <i className="bi bi-whatsapp me-2"></i>
              WhatsApp {site.phoneDisplay}
            </a>
            <Link to="/contact" className="btn btn-outline-light-gold px-4 py-3">
              Contact page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
