import rawJobs from "../data/jobs.json";

/** Turns "Pastry Chef / Bakery Chef" into "pastry-chef-bakery-chef". */
export function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const PERIOD_LABEL = {
  HOUR: "hour",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

function formatSalary(job) {
  const { salaryMin, salaryMax, currency } = job;
  if (!salaryMin && !salaryMax) return "Negotiable";

  const nf = new Intl.NumberFormat("en-US");
  const period = PERIOD_LABEL[job.salaryPeriod || "MONTH"];
  const amount =
    salaryMin && salaryMax && salaryMin !== salaryMax
      ? `${nf.format(salaryMin)} - ${nf.format(salaryMax)}`
      : nf.format(salaryMin || salaryMax);

  return `${amount} ${currency || ""}`.trim() + ` / ${period}`;
}

function normalise(raw, index, usedSlugs) {
  const baseSlug =
    (raw.slug && slugify(raw.slug)) ||
    slugify(`${raw.title} ${raw.city} ${raw.country}`);

  let slug = baseSlug;
  let counter = 2;
  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  usedSlugs.add(slug);

  const salaryLabel = formatSalary(raw);
  const locationLabel = `${raw.city}, ${raw.country}`;

  return {
    ...raw,
    id: String(raw.id ?? slug ?? index),
    slug,
    url: `/jobs/${slug}`,
    salaryLabel,
    locationLabel,
    headline: `${raw.title} - ${locationLabel}`,
    benefits: raw.benefits ?? [],
    description: raw.description ?? [],
    requirements: raw.requirements ?? [],
    salaryPeriod: raw.salaryPeriod ?? "MONTH",
    employmentType: raw.employmentType ?? "FULL_TIME",
  };
}

let cache = null;

/** Every active job, newest first. */
export function getAllJobs() {
  if (cache) return cache;

  const usedSlugs = new Set();
  const jobs = rawJobs
    .filter((job) => job && job.title && job.active !== false)
    .map((job, index) => normalise(job, index, usedSlugs));

  jobs.sort((a, b) => {
    const aDate = a.postedAt ? Date.parse(a.postedAt) : 0;
    const bDate = b.postedAt ? Date.parse(b.postedAt) : 0;
    return bDate - aDate;
  });

  cache = jobs;
  return jobs;
}

export function getJobBySlug(slug) {
  return getAllJobs().find((job) => job.slug === slug);
}

/** Jobs marked "featured": true, falling back to the newest ones. */
export function getFeaturedJobs(limit = 3) {
  const all = getAllJobs();
  const featured = all.filter((job) => job.featured);
  return (featured.length ? featured : all).slice(0, limit);
}

/** Other jobs in the same country, used at the bottom of a job page. */
export function getRelatedJobs(job, limit = 3) {
  const all = getAllJobs().filter((other) => other.slug !== job.slug);
  const sameCountry = all.filter((other) => other.country === job.country);
  const rest = all.filter((other) => other.country !== job.country);
  return [...sameCountry, ...rest].slice(0, limit);
}

export function getCountries() {
  return Array.from(new Set(getAllJobs().map((job) => job.country))).sort();
}

export function getCategories() {
  return Array.from(
    new Set(getAllJobs().map((job) => job.category).filter(Boolean))
  ).sort();
}
