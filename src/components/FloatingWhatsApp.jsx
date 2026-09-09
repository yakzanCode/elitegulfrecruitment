import { quickMessage, whatsappLink } from "../lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(quickMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat on WhatsApp"
    >
      <i className="bi bi-whatsapp"></i>
    </a>
  );
}
