/**
 * Central company / site configuration.
 * Change the values here and they update everywhere on the website.
 */

export const site = {
  name: "Elite Gulf Recruitment",
  nameAr: "نخبة الخليج",
  tagline: "Recruitment & Manpower Solutions for the Gulf",
  legalName: "Elite Gulf Recruitment",

  email: "elitegulfrecruitment@gmail.com",

  /** Human readable phone number, shown on the website. */
  phoneDisplay: "+212 656-515453",
  /** Same number in international dial format, used in tel: links. */
  phoneDial: "+212656515453",
  /** Digits only, no plus sign and no spaces. Required by the wa.me link format. */
  whatsappNumber: "212656515453",

  address: {
    line1: "Diars Al Andalous - GH1, Building 02, Apartment 07",
    city: "Nouaceur",
    region: "Casablanca",
    country: "Morocco",
    countryCode: "MA",
    full: "Diars Al Andalous - GH1, Building 02, Apartment 07, Nouaceur, Casablanca, Morocco",
  },

  officeHours: "Monday to Saturday, 09:00 - 18:00 (GMT+1)",
};

/** Gulf markets served, shown on the homepage and the employers page. */
export const gulfCountries = [
  { name: "Saudi Arabia", nameAr: "السعودية", code: "SA" },
  { name: "United Arab Emirates", nameAr: "الإمارات", code: "AE" },
  { name: "Qatar", nameAr: "قطر", code: "QA" },
  { name: "Kuwait", nameAr: "الكويت", code: "KW" },
  { name: "Bahrain", nameAr: "البحرين", code: "BH" },
  { name: "Oman", nameAr: "عُمان", code: "OM" },
];

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/employers", label: "For Employers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
