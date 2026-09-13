import { Link } from "react-router-dom";
import { useLanguage } from "../lib/i18n/LanguageContext.jsx";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-5">
      <div className="container text-center py-5">
        <p className="eyebrow mb-2">404</p>
        <h1 style={{ fontSize: "2rem" }}>{t("notFound.title")}</h1>
        <p className="text-muted-custom mx-auto mt-3" style={{ maxWidth: 480 }}>{t("notFound.text")}</p>
        <Link to="/" className="btn btn-navy mt-3">{t("notFound.backHome")}</Link>
      </div>
    </section>
  );
}
