import { NavLink } from "react-router-dom";
import { mainNav, site } from "../lib/site";

export default function Header() {
  return (
    <header className="sticky-top bg-white border-bottom border-line">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
            <span
              className="d-inline-flex align-items-center justify-content-center bg-navy"
              style={{ width: 40, height: 40, border: "1px solid var(--gold)" }}
            >
              <span className="text-gold fw-bold" style={{ fontFamily: "var(--font-serif)" }}>
                EG
              </span>
            </span>
            <span className="navbar-brand-text fs-5">{site.name}</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4 mt-3 mt-lg-0">
              {mainNav.map((item) => (
                <li className="nav-item" key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) =>
                      "nav-link nav-link-custom" + (isActive ? " active" : "")
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item mt-2 mt-lg-0">
                <NavLink to="/employers" className="btn btn-gold btn-sm px-3 py-2">
                  Request Workers
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
