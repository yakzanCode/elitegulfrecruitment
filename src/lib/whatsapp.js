import { site } from "./site";

/**
 * Builds a wa.me link with a pre-written message.
 *
 * wa.me is the format WhatsApp recommends and it behaves correctly everywhere:
 *  - iPhone / Android  -> opens the WhatsApp app with the chat and the text ready
 *  - Desktop           -> opens WhatsApp Web or the WhatsApp desktop app
 * The number must be digits only, with the country code and no "+".
 */
export function whatsappLink(message, number = site.whatsappNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Opens WhatsApp. Must be called directly inside a click / submit handler so
 * that the browser treats it as a user action and does not block it.
 * Falls back to same-tab navigation when a pop-up blocker gets in the way.
 */
export function openWhatsApp(url) {
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = url;
}

/** One "Label:\nvalue" block, skipped completely when the value is empty. */
function block(label, value) {
  const clean = (value || "").trim();
  if (!clean) return "";
  return `${label}:\n${clean}\n\n`;
}

/** The candidate application message, in the exact layout requested. */
export function buildApplicationMessage(job, values) {
  let text = `Job Application - ${site.name}\n\n`;
  text += block("Job", job.title);
  text += block("Country", job.country);
  text += block("City", job.city);
  text += block("Full Name", values.fullName);
  text += block("WhatsApp", values.phone);
  text += block("Email", values.email);
  text += block("Nationality", values.nationality);
  text += block("Age", values.age);
  text += block("Experience", values.experience);
  text += block("Current Location", values.location);
  text += block("Message", values.message);
  return text.trimEnd();
}

/** The employer manpower request message. */
export function buildEmployerMessage(values) {
  let text = `Manpower Request - ${site.name}\n\n`;
  text += block("Company Name", values.companyName);
  text += block("Contact Person", values.contactPerson);
  text += block("WhatsApp", values.phone);
  text += block("Email", values.email);
  text += block("Country", values.country);
  text += block("Position Needed", values.position);
  text += block("Number of Workers", values.workers);
  text += block("Message", values.message);
  return text.trimEnd();
}

/** The general contact message. */
export function buildContactMessage(values) {
  let text = `Website Enquiry - ${site.name}\n\n`;
  text += block("Full Name", values.fullName);
  text += block("WhatsApp", values.phone);
  text += block("Email", values.email);
  text += block("Subject", values.subject);
  text += block("Message", values.message);
  return text.trimEnd();
}

/** Plain "Hello" opener used by the standalone WhatsApp buttons. */
export function quickMessage(context) {
  return context
    ? `Hello ${site.name}, I would like to ask about ${context}.`
    : `Hello ${site.name}, I would like to ask about your services.`;
}
